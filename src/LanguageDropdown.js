import React, { useEffect, useState, useCallback } from 'react';
import Dropdown from "./Dropdown";
import { defaultOptions, getLanguage, getLanguages } from './Utils';
import _ from 'underscore';

/**
 * Language dropdown component
 */
const LanguageDropdown = ({
  name,
  value,
  /** source for geographic data. Can be served from local, or CDN */
  src = 'https://replaysmike.github.io/react-country-state-dropdown/data/',
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
  /** true to show native language */
  showNative = true,
  /** true to use native language */
  useNative = false,
  tabIndex,
  title,
  width,
  ...rest
}) => {

  const formatName = useCallback((language) => {
    if (!language || typeof language !== 'object')
      return language;
    if (showNative)
      return `${language.name} (${language.native})`;
    else if (useNative)
      return language.native;

    return language.name;
  }, [showNative, useNative]);

  const translateValue = async (val) => {
    const valueObject = await getLanguage(val, { ...defaultOptions, src });
    const value = valueObject?.name ?? (allowFreeFormText ? val : null);
    return value;
  };

  const [languages, setLanguages] = useState([]);
  const [internalValue, setInternalValue] = useState(value);
  const [prioritizedLanguages, setPrioritizedLanguages] = useState([]);

  const updateDataLanguages = async () => {
    // load languages data
    const dataLanguages = await getLanguages({ ...defaultOptions, src });
    
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
    let orderedLanguages = dataLanguages.map(language => ({ ...language, value: language.name }));
    if (priority && priority.length > 0) {
      if (removePrioritized)
        orderedLanguages = _.filter(orderedLanguages, i => !priority.includes(i.code));
      orderedLanguages.sort(sortByCaseInsensitive);

      const prioritizedLanguages = [];
      for (let i = priority.length - 1; i >= 0; i--) {
        const item = _.find(dataLanguages, x => x.code === priority[i]);
        prioritizedLanguages.push({ ...item, value: item.name });
      }
      setPrioritizedLanguages(prioritizedLanguages);
    }

    const displayLanguages = orderedLanguages.map(i => ({...i, name: i.name}));
    setLanguages(displayLanguages);
  };

  useEffect(() => {
    updateDataLanguages();
  }, []);

  useEffect(() => {
    translateValue(value).then(newValue => setInternalValue(newValue));
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
      disabled={disabled}
      inputContainerClassName={inputContainerClassName}
      inputClassName={inputClassName}
      menuClassName={menuClassName}
      itemsClassName={itemsClassName}
      itemClassName={itemClassName}
      tabIndex={tabIndex}
      title={title}
      width={width}
      // supply a custom formatter for formatting the native value
      formatter={formatName}
      {...rest}
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className={`menu ${menuClassName}`}>
          <div className={`items${striped ? ' striped' : ''} ${itemsClassName}`}>
            {!isFiltered && prioritizedLanguages && prioritizedLanguages.length > 0 && <div className={`prioritized ${prioritizedClassName}`}>
              {prioritizedLanguages.map((option, key) => (
                <div
                  key={key}
                  className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
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
          className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
          role="option"
          aria-checked={selected ? 'true' : 'false'}
          aria-selected={selected ? 'true' : 'false'}
          data-id={option.id}
          data-code={option.code}
          onClick={(e) => handleItemSelect(e, option)}
        >{formatName(option)}</div>);
        return output;
      }}
    />
  );
};

export default LanguageDropdown;