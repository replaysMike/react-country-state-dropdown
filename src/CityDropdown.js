import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";
import { data_cities } from "./data/cities";
import { data_states } from "./data/states";
import { data_countries } from "./data/countries";
import { getCity } from './Utils';
import _ from 'underscore';

/**
 * City dropdown component
 */
const CityDropdown = ({
  name,
  /** country code, or numeric country id */
  country,
  /** state code, or numeric state id */
  state,
  value,
  /** onChange handler, fired when an item is selected */
  onChange,
  /** onSearchInputChange handler, fired when text search is input */
  onSearchInputChange,
  /** Label to display when no items are available */
  emptyLabel = 'No cities available to select.',
  /** Label to display when no country is selected */
  noCountryLabel = 'Please select a country',
  /** Label to display when no state is selected */
  noStateLabel = 'Please select a state/province',
  /** Placeholder to show if no city is selected */
  placeHolder = 'Choose a city',
  /** An array of city names (ex. 'New York') to show at the top of the list */
  priority = [],
  /** True to remove prioritized cities from the main list */
  removePrioritized,
  /** true to stripe menu items */
  striped,
  /** true to allow clearing of selection */
  clearable,
  /** true to allow text input searching */
  searchable,
  /** true to allow free form text entry that doesn't match an option */
  allowFreeFormText,
  /** true to disable the control */
  disabled,
  ...rest
}) => {

  const translateValue = (val, state, country) => {
    const valueObject = getCity(val, state, country);
    return valueObject?.name;
  };

  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedState, setSelectedState] = useState(state);
  const [internalValue, setInternalValue] = useState(translateValue(value, state, country));
  const [cities, setCities] = useState([]);
  const [prioritizedCities, setPrioritizedCities] = useState([]);

  useEffect(() => {
    const sortByCaseInsensitive = (a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    };
    if (selectedCountry && selectedState) {
      let countryCities = _.find(data_cities, i => i.id === selectedCountry.id)?.states;
      let matchingCities = _.find(countryCities, i => i.id === selectedState.id)?.cities;
        
      if (matchingCities) {
        // load cities data
        let orderedCities = matchingCities.map(state => ({ ...state, value: state.name }));
        if (priority && priority.length > 0) {
          if (removePrioritized)
            orderedCities = _.filter(orderedCities, i => !priority.includes(i.name));
          orderedCities.sort(sortByCaseInsensitive);

          const prioritizedCities = [];
          for (let i = 0; i < priority.length; i++) {
            const item = _.find(matchingCities, x => x.name === priority[i]);
            prioritizedCities.push({ ...item, value: item.name });
          }
          setPrioritizedCities(prioritizedCities);
        }
        setCities(orderedCities);
      }
    } else {
      setPrioritizedCities([]);
      setCities([]);
      setInternalValue(null);
    }
  }, [selectedCountry, selectedState]);

  useEffect(() => {
    let selectedCountry = null;
    if (country) {
      if (typeof country === 'number') {
        // find by id
        selectedCountry = _.find(data_countries, i => i.id === country);
      } else if (typeof country === 'string') {
        // find my iso/name
        selectedCountry = _.find(data_countries, i => i.iso2 === country)
          || _.find(data_countries, i => i.iso3 === country)
          || _.find(data_countries, i => i.name === country);
      } else if (typeof country === 'object' && country !== null) {
        // find by object
        selectedCountry = _.find(data_countries, i => i.id === country.id);
      }
      if (!selectedCountry) console.error(`Could not find a country matching the value`, country);
    }

    setSelectedCountry(selectedCountry);
  }, [country]);

  useEffect(() => {
    let selectedState = null;
    if (selectedCountry && state) {
      // first find by the country
      const statesForCountryData = _.find(data_states, i => i.id === selectedCountry.id);
      if (statesForCountryData === undefined){
        console.error(`There is no country selected, can not find state.`, selectedCountry);
        return;
      }
      if (typeof state === 'number') {
        // find by id
        selectedState = _.find(statesForCountryData.states, i => i.id === state);
      } else if (typeof state === 'string') {
        // find my name/code
        selectedState = _.find(statesForCountryData.states, i => i.code === state)
          || _.find(statesForCountryData.states, i => i.name === state);
      } else if (typeof state === 'object' && state !== null) {
        // find by object
        selectedState = _.find(statesForCountryData.states, i => i.id === state.id);
      }
      if (!selectedState) console.error(`Could not find a state matching the value`, state);
    }

    setSelectedState(selectedState);
  }, [state]);

  useEffect(() => {
    const newValue = translateValue(value, state, country);
    setInternalValue(newValue);
  }, [value]);

  return (
    <Dropdown
      placeHolder={placeHolder}
      options={cities}
      onChange={(e, value) => {
          if (onChange) onChange(e, value);
        }
      }
      onSearchInputChange={(e, value) => {
          if (onSearchInputChange) onSearchInputChange(e, value);
        }
      }
      value={internalValue}
      striped={striped}
      clearable={clearable}
      emptyLabel={emptyLabel}
      allowFreeFormText={allowFreeFormText}
      searchable={searchable}
      {...rest}
      onRenderEmpty={() => selectedCountry ? (selectedState ? emptyLabel : noStateLabel) : noCountryLabel }
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className='menu'>
          <div className={`items${striped ? ' striped' : ''}`}>
            {!isFiltered && prioritizedCities && prioritizedCities.length > 0 && <div className='prioritized'>
              {prioritizedCities.map((option, key) => (
                <div
                  key={key}
                  className={`item${option === selected ? ' selected' : ''}`}
                  data-id={option.id}
                  data-countryid={selectedCountry.id}
                  data-country={selectedCountry.iso2}
                  data-stateid={selectedState.id}
                  data-state={selectedState.code}
                  data-latitude={option.latitude}
                  data-longitude={option.longitude}
                  onClick={(e) => handleItemSelect(e, option)}
                >{option.name}</div>
              ))}
            </div>}
            {itemRenderer()}
          </div>
        </div>
      }}
      onRenderItem={(key, option, selected, isFiltered, handleItemSelect) => {
        const output = (<div
          key={key}
          className={`item${option === selected ? ' selected' : ''}`}
          role="option"
          aria-checked={selected ? 'true' : 'false'}
          aria-selected={selected ? 'true' : 'false'}
          data-id={option.id}
          data-countryid={selectedCountry.id}
          data-country={selectedCountry.iso2}
          data-stateid={selectedState.id}
          data-state={selectedState.code}
          data-latitude={option.latitude}
          data-longitude={option.longitude}
          onClick={(e) => handleItemSelect(e, option)}
        >{option.name}</div>);
        return output;
      }}
    />
  );
};

export default CityDropdown;