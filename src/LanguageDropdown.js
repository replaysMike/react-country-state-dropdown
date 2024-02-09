import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";
import { data_languages } from "./data/languages";
import { getLanguage } from './Utils';
import _ from 'underscore';

/**
 * Language dropdown component
 */
const LanguageDropdown = ({
  name,
  value,
  /** onChange handler, fired when an item is selected */
  onChange,
  /** onSearchInputChange handler, fired when text search is input */
  onSearchInputChange,
  /** Label to display when no items are available */
  emptyLabel = 'No items.',
  /** Placeholder to show if no language is selected */
  placeHolder = 'Choose a language',
  /** An array of language codes (ex. 'en') to show at the top of the list */
  priority = ['en'],
  /** True to remove prioritized countries from the main list */
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

  const translateValue = (val) => {
    const valueObject = getLanguage(val);
    return valueObject?.name;
  };

  const [languages, setLanguages] = useState([]);
  const [internalValue, setInternalValue] = useState(translateValue(value));
  const [prioritizedLanguages, setPrioritizedLanguages] = useState([]);

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
    // load languages data
    let orderedLanguages = data_languages.map(language => ({ ...language, value: language.name }));
    if (priority && priority.length > 0) {
      if (removePrioritized)
        orderedLanguages = _.filter(orderedLanguages, i => !priority.includes(i.code));
      orderedLanguages.sort(sortByCaseInsensitive);

      const prioritizedLanguages = [];
      for (let i = priority.length - 1; i >= 0; i--) {
        const item = _.find(data_languages, x => x.code === priority[i]);
        prioritizedLanguages.push({ ...item, value: item.name });
      }
      setPrioritizedLanguages(prioritizedLanguages);
    }
    setLanguages(orderedLanguages);
  }, []);

  useEffect(() => {
    const newValue = translateValue(value);
    setInternalValue(newValue);
  }, [value]);

  return (
    <Dropdown
      placeHolder={placeHolder}
      options={languages}
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
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className='menu'>
          <div className={`items${striped ? ' striped' : ''}`}>
            {!isFiltered && prioritizedLanguages && prioritizedLanguages.length > 0 && <div className='prioritized'>
              {prioritizedLanguages.map((option, key) => (
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

export default LanguageDropdown;