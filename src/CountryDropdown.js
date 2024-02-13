import React, { useEffect, useState } from 'react';
import Dropdown from "./Dropdown";
import { data_countries } from "./data/countries";
import { getCountry } from "./Utils";
import _ from 'underscore';

/**
 * Country dropdown component
 */
const CountryDropdown = ({
  name,
  value,
  /** onChange handler, fired when an item is selected */
  onChange,
  /** onSearchInputChange handler, fired when text search is input */
  onSearchInputChange,
  /** Label to display when no items are available */
  emptyLabel = 'No items.',
  /** Placeholder to show if no country is selected */
  placeHolder = 'Choose a country',
  /** An array of ISO2 country codes (ex. 'US') to show at the top of the list */
  priority = ['US', 'CA', 'MX'],
  /** True to remove prioritized countries from the main list */
  removePrioritized,
  /** True to show flags */
  showFlags = true,
  /** True to show native name instead of English name */
  native,
  /** True to include alternate name (native name if native=false, English name if native=true) */
  includeAlternate,
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
  className,
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

  const translateValue = (val) => {
    const valueObject = getCountry(val);
    return valueObject?.name ?? (allowFreeFormText ? val : null);
  };

  const [countries, setCountries] = useState([]);
  const [internalValue, setInternalValue] = useState(translateValue(value));
  const [prioritizedCountries, setPrioritizedCountries] = useState([]);

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
    // load countries data
    let orderedCountries = data_countries.map(country => ({ ...country, value: country.name }));
    if (priority && priority.length > 0) {
      if (removePrioritized)
        orderedCountries = _.filter(orderedCountries, i => !priority.includes(i.iso2));
      orderedCountries.sort(sortByCaseInsensitive);

      const prioritizedCountries = [];
      for (let i = 0; i < priority.length; i++) {
        const item = _.find(data_countries, x => x.iso2 === priority[i]);
        prioritizedCountries.push({ ...item, value: item.name });
      }
      setPrioritizedCountries(prioritizedCountries);
    }
    setCountries(orderedCountries);
  }, []);

  useEffect(() => {
    const newValue = translateValue(value);
    setInternalValue(newValue);
  }, [value]);

  return (
    <Dropdown
      placeHolder={placeHolder}
      options={countries}
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
      className={className}
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
      onRenderInput={(option, ref, value, placeHolder, onChangeHandler, onFocus, onBlur) => {
        return (<div className='wrapped-input'>{showFlags && option && <i className={`${option.iso2.toLowerCase()} flag`} />}<input
          className={`dropdown ${inputClassName}`}
          aria-autocomplete="list"
          autoComplete="new-password"
          onChange={onChangeHandler}
          value={value || ''}
          ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
          {...(placeHolder ? { placeholder: placeHolder } : {})}
          {...(disabled ? { disabled } : {})}
          {...(tabIndex && tabIndex > 0 ? { tabIndex } : {})}
          {...(title && title?.length > 0 ? { title } : {})}
        /></div>)
      }}
      onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
        return <div className={`menu ${menuClassName}`}>
          <div className={`items${striped ? ' striped' : ''} ${itemsClassName}`}>
            {!isFiltered && prioritizedCountries && prioritizedCountries.length > 0 && <div className={`prioritized ${prioritizedClassName}`}>
              {prioritizedCountries.map((option, key) => (
                <div
                  key={key}
                  className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
                  data-id={option.id}
                  data-iso2={option.iso2}
                  data-iso3={option.iso3}
                  data-currency={option.currency}
                  data-currency-symbol={option.currency_symbol}
                  data-phone-code={option.phone_code}
                  data-emoji={option.emoji}
                  onClick={(e) => handleItemSelect(e, option)}
                >{showFlags && <i className={`${option.iso2.toLowerCase()} flag`} />}{native ? option.native : option.name}{includeAlternate && <span className="description">({native ? option.name : option.native})</span>}</div>
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
          data-iso2={option.iso2}
          data-iso3={option.iso3}
          data-currency={option.currency}
          data-currency-symbol={option.currency_symbol}
          data-phone-code={option.phone_code}
          data-emoji={option.emoji}
          onClick={(e) => handleItemSelect(e, option)}
        >{showFlags && <i className={`${option.iso2.toLowerCase()} flag`} />}{native ? option.native : option.name}{includeAlternate && <span className="description">({native ? option.name : option.native})</span>}</div>);
        return output;
      }}
    />
  );
};

export default CountryDropdown;