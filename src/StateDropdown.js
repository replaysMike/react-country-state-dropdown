import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";
import { data_states } from "./data/states";
import _ from 'underscore';
import { getCountry, getState } from './Utils';

/**
 * State/province dropdown component
 */
const StateDropdown = ({
  name,
  value,
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
  ...rest
}) => {

  const translateValue = (val, country) => {
    const valueObject = getState(val, country);
    return valueObject?.name;
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [internalValue, setInternalValue] = useState(translateValue(value, country));
  const [states, setStates] = useState([]);
  const [prioritizedStates, setPrioritizedStates] = useState([]);

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
    if (selectedCountry) {
      let matchingStates = _.find(data_states, i => i.id === selectedCountry?.id)?.states;
      if (matchingStates) {
        // load states data
        let orderedStates = matchingStates.map(state => ({ ...state, value: state.name }));
        if (priority && priority.length > 0) {
          if (removePrioritized)
            orderedStates = _.filter(orderedStates, i => !priority.includes(i.code));
          orderedStates.sort(sortByCaseInsensitive);

          const prioritizedStates = [];
          for (let i = 0; i < priority.length; i++) {
            const item = _.find(matchingStates, x => x.code === priority[i]);
            prioritizedStates.push({ ...item, value: item.name });
          }
          setPrioritizedStates(prioritizedStates);
        }
        setStates(orderedStates);
      }
    } else {
      setPrioritizedStates([]);
      setStates([]);
      setInternalValue(null);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const selectedCountry = getCountry(country);
    setSelectedCountry(selectedCountry);
  }, [country]);

  useEffect(() => {
    const newValue = translateValue(value, country);
    setInternalValue(newValue);
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
      {...rest}
      onRenderEmpty={() => selectedCountry ? emptyLabel : noCountryLabel}
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className='menu'>
          <div className={`items${striped ? ' striped' : ''}`}>
            {!isFiltered && prioritizedStates && prioritizedStates.length > 0 && <div className='prioritized'>
              {prioritizedStates.map((option, key) => (
                <div
                  key={key}
                  className={`item${option === selected ? ' selected' : ''}`}
                  data-id={option.id}
                  data-code={option.code}
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
          data-code={option.code}
          onClick={(e) => handleItemSelect(e, option)}
        >{option.name}</div>);
        return output;
      }}
    />
  );
};

export default StateDropdown;