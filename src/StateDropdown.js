import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";
import _ from 'underscore';
import { defaultOptions, getCountry, getState, getStates } from './Utils';

/**
 * State/province dropdown component
 */
const StateDropdown = ({
  name,
  value,
  /** source for geographic data. Can be served from local, or CDN */
  src = 'https://replaysmike.github.io/react-country-state-dropdown/data/',
  /** the country using a country object, name or ISO2 country code */
  country,
  /** onChange handler, fired when an item is selected */
  onChange,
  /** onSearchInputChange handler, fired when text search is input */
  onSearchInputChange,
  /** Label to display when no items are available */
  emptyLabel = 'No states available to select.',
  /** Label to display when no country is selected */
  noCountryLabel = 'Please select a country',
  /** Placeholder to show if no state is selected */
  placeHolder = 'Choose a state/province',
  /** An array of ISO2 state codes (ex. 'US') to show at the top of the list */
  priority = [],
  /** True to remove prioritized states from the main list */
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

  const translateValue = async (val, country) => {
    const valueObject = await getState(val, country, { ...defaultOptions, src });
    const value = valueObject?.name ?? (allowFreeFormText ? val : null);
    return value;
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [internalValue, setInternalValue] = useState(null);
  const [states, setStates] = useState([]);
  const [prioritizedStates, setPrioritizedStates] = useState([]);

  const updateDataStates = async (selectedCountry) => {
    const sortByCaseInsensitive = (a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    };

    if (selectedCountry) {
      // fetch states data
      // selectedCountry may be an object, or string value
      const loadedStates = await getStates(selectedCountry, { ...defaultOptions, src });
      if (loadedStates) {
        // order and prioritize
        let orderedStates = loadedStates.map(state => ({ ...state, value: state.name }));
        if (priority && priority.length > 0) {
          if (removePrioritized)
            orderedStates = _.filter(orderedStates, i => !priority.includes(i.state_code));
          orderedStates.sort(sortByCaseInsensitive);

          const prioritizedStates = [];
          for (let i = 0; i < priority.length; i++) {
            const item = _.find(loadedStates, x => x.state_code === priority[i]);
            prioritizedStates.push({ ...item, value: item.name });
          }
          setPrioritizedStates(prioritizedStates);
        }
        setStates(orderedStates);
        return orderedStates;
      }
    } else {
      setPrioritizedStates([]);
      setStates([]);
      setInternalValue(null);
    }
    return [];
  };

  useEffect(() => {
    if (selectedCountry) updateDataStates(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    if (country) getCountry(country, { ...defaultOptions, src }).then((selectedCountry) => setSelectedCountry(selectedCountry));
  }, [country]);

  useEffect(() => {
    updateDataStates(country);
    if (value) 
      translateValue(value, country).then(newValue => setInternalValue(newValue));
    else
      setInternalValue(null);
  }, [value]);

  return (
    <Dropdown
      placeHolder={placeHolder}
      options={states}
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
      onRenderEmpty={() => selectedCountry ? emptyLabel : noCountryLabel}
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className={`menu ${menuClassName}`}>
          <div className={`items${striped ? ' striped' : ''} ${itemsClassName}`}>
            {!isFiltered && prioritizedStates && prioritizedStates.length > 0 && <div className={`prioritized ${prioritizedClassName}`}>
              {prioritizedStates.map((option, key) => (
                <div
                  key={key}
                  className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
                  data-id={option.id}
                  data-code={option.state_code}
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
          data-code={option.state_code}
          onClick={(e) => handleItemSelect(e, option)}
        >{option.name}</div>);
        return output;
      }}
    />
  );
};

export default StateDropdown;