import React, { useEffect, useState, useRef } from 'react';
import Dropdown from "./Dropdown";
import { defaultOptions, parsePhoneNumber, formatPhoneNumber, formatInternational, getCountry, getCountries } from "./Utils";
import _ from 'underscore';

/**
 * Phone input component
 */
const PhoneInput = ({
  name,
  value,
  /** source for geographic data. Can be served from local, or CDN */
  src = 'https://replaysmike.github.io/react-country-state-dropdown/data/',
  /** preselect the default country using a country object, name or ISO2 country code */
  country,
  /** onChange handler, fired when an item is selected */
  onChange,
  /** onSearchInputChange handler, fired when text search is input */
  onSearchInputChange,
  /** Placeholder to show if no input is selected */
  placeHolder = 'Enter phone number',
  /** An array of ISO2 country codes (ex. 'US') to show at the top of the list */
  priority = ['US', 'CA', 'MX'],
  /** True to remove prioritized countries from the main list */
  removePrioritized,
  /** True to show flags */
  showFlags = true,
  /** true to enable clearable button */
  clearable,
  /** true to disable the control */
  disabled,
  /** add classes to the phone-input */
  className = '',
  /** add classes to the rcsd-input */
  inputContainerClassName = '',
  /** add classes to the input element */
  inputClassName = '',
  /** add classes to the dropdown input element */
  dropdownInputClassName = '',
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
  const [countries, setCountries] = useState([]);
  const [prioritizedCountries, setPrioritizedCountries] = useState([]);
  const [internalCountryIso2, setInternalCountry] = useState(getCountry(country, { ...defaultOptions, src }));
  const [internalValue, setInternalValue] = useState(null);
  const inputRef = useRef(null);

  const updateDataCountries = async () => {
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
    const dataCountries = await getCountries({ ...defaultOptions, src });
    let orderedCountries = dataCountries.map(c => ({ ...c, value: c.iso2 }));
    if (priority && priority.length > 0) {
      if (removePrioritized)
        orderedCountries = _.filter(orderedCountries, i => !priority.includes(i.iso2));
      orderedCountries.sort(sortByCaseInsensitive);

      const prioritizedCountries = [];
      for (let i = 0; i < priority.length; i++) {
        const item = _.find(dataCountries, x => x.iso2 === priority[i]);
        prioritizedCountries.push({ ...item, value: item.name });
      }
      setPrioritizedCountries(prioritizedCountries);
    }
    setCountries(orderedCountries);
  };

  useEffect(() => {
    updateDataCountries();
  }, []);

  useEffect(() => {
    getCountry(country, { ...defaultOptions, src }).then((internalCountry) => {
      setInternalCountry(internalCountry?.iso2);
    });
  }, [country]);

  const handleTextInputChange = (e) => {
    setInternalValue(e.target.value);
  };

  const handleBlur = (e) => {
    // format number
    const parsed = parsePhoneNumber(internalValue, internalCountryIso2);
    getCountry(parsed.country, { ...defaultOptions, src }).then((phoneCountry) => {
      const formatted = formatPhoneNumber(internalValue, phoneCountry?.iso2);

      // select the country if found
      if (phoneCountry && phoneCountry.iso2 !== internalCountryIso2) {
        setInternalCountry(phoneCountry.iso2);
      }
      // set the phone number as the formatted value
      setInternalValue(formatted);
    });
  };

  const handleFocus = (e) => {

  };

  const handleMenuKeyUp = (e) => {
    switch (e.keyCode) {
      case 13:
        handleBlur(e);
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.keyCode) {
      case 13:
        handleBlur(e);
        break;
    }
  };

  return (
    <div className={`phone-input ${className}`}>
      <Dropdown
        placeHolder=''
        options={countries}
        onChange={(e, value) => {
          if (value) setInternalCountry(value.iso2);
          if (onChange) onChange(e, value);
        }
        }
        onSearchInputChange={(e, value) => {
          if (onSearchInputChange) onSearchInputChange(e, value);
        }
        }
        value={internalCountryIso2}
        clearable={false}
        allowFreeFormText={false}
        searchable={false}
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
          return (<>{showFlags && option && <i className={`${option.iso2.toLowerCase()} flag`} />}<input
            className={`dropdown ${dropdownInputClassName}`}
            aria-autocomplete="list"
            autoComplete="new-password"
            onChange={onChangeHandler}
            value={option && option.phone_code && `+${option.phone_code}` || ''}
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={handleMenuKeyUp}
            {...(placeHolder ? { placeholder: placeHolder } : {})}
            {...(disabled ? { disabled } : {})}
            {...(tabIndex && tabIndex > 0 ? { tabIndex } : {})}
            {...(title && title?.length > 0 ? { title } : {})}
          /></>)
        }}
        onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
          return <div className={`menu ${menuClassName}`}>
            <div className={`items${striped ? ' striped' : ''} ${itemsClassName}`}>
              {!isFiltered && prioritizedCountries && prioritizedCountries.length > 0 && <div className='prioritized'>
                {prioritizedCountries.map((option, key) => (
                  <div
                    key={key}
                    className={`item${option === selected ? ' selected' : ''} ${itemClassName}`}
                    data-id={option.id}
                    data-iso2={option.iso2}
                    data-iso3={option.iso3}
                    data-phone-code={option.phone_code}
                    onClick={(e) => handleItemSelect(e, option)}
                  >{showFlags && <i className={`${option.iso2.toLowerCase()} flag`} />}{option.iso2}</div>
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
            data-phone-code={option.phone_code}
            onClick={(e) => handleItemSelect(e, option)}
          >{showFlags && <i className={`${option.iso2.toLowerCase()} flag`} />}{option.iso2}</div>);
          return output;
        }}
      />
      <input
        className={`input ${inputClassName}`}
        aria-autocomplete="phone"
        autoComplete="phone"
        onChange={handleTextInputChange}
        value={internalValue || ''}
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyUp={handleKeyUp}
        {...(placeHolder ? { placeholder: placeHolder } : {})}
        {...(disabled ? { disabled } : {})}
        {...(tabIndex && tabIndex > 0 ? { tabIndex } : {})}
      />
    </div>
  );
};

export default PhoneInput;