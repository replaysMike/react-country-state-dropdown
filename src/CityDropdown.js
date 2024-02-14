import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";
import { getCity, getCountry, getState } from './Utils';
import _ from 'underscore';

/**
 * City dropdown component
 */
const CityDropdown = ({
  name,
  /** source for geographic data. Can be served from local, or CDN */
  src = 'https://replaysmike.github.io/react-country-state-dropdown/data/',
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
  /** add classes to the rcsd-dropdown */
  className = '',
  /** add classes to the rcsd-input */
  inputContainerClassName = '',
  /** add classes to the input element */
  inputClassName = '',
  /** add classes to the menu */
  menuClassName = '',
  /** add classes to the items container */
  itemsClassName = '',
  /** add classes to the item */
  itemClassName = '',
  /** add classes to the prioritized items container */
  prioritizedClassName = '',
  tabIndex,
  title,
  width,
  ...rest
}) => {

  const translateValue = (val, state, country) => {
    const valueObject = getCity(val, state, country);
    return valueObject?.name ?? (allowFreeFormText ? val : null);
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
    const selectedCountry = getCountry(country);
    if (!selectedCountry) console.error(`Could not find a country matching the value`, country);

    setSelectedCountry(selectedCountry);
  }, [country]);

  useEffect(() => {
    let selectedState = null;
    if (selectedCountry && state) {
      // first find by the country
      selectedState = getState(state, selectedCountry);
      if (selectedState === undefined){
        console.error(`There were no states found for specified country.`, selectedCountry);
        return;
      }
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
      disabled={disabled}
      inputContainerClassName={inputContainerClassName}
      inputClassName={inputClassName}
      menuClassName={menuClassName}
      itemsClassName={itemsClassName}
      itemClassName={itemClassName}
      tabIndex={tabIndex}
      title={title}
      width={width}
      {...rest}
      onRenderEmpty={() => selectedCountry ? (selectedState ? emptyLabel : noStateLabel) : noCountryLabel }
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className={`menu ${menuClassName}`}>
          <div className={`items${striped ? ' striped' : ''} ${itemsClassName}`}>
            {!isFiltered && prioritizedCities && prioritizedCities.length > 0 && <div className={`prioritized ${prioritizedClassName}`}>
              {prioritizedCities.map((option, key) => (
                <div
                  key={key}
                  className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
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
          className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
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