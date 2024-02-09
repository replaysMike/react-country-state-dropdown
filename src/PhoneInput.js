import React, { useEffect, useState, useRef } from 'react';
import Dropdown from "./Dropdown";
import { data_countries } from "./data/countries";
import { parsePhoneNumber, formatPhoneNumber, formatInternational, getCountry } from "./Utils";
import _ from 'underscore';
import "./flags.css";

/**
 * Phone input component
 */
const PhoneInput = ({
  name,
  value,
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
  ...rest
}) => {
  const [countries, setCountries] = useState([]);
  const [prioritizedCountries, setPrioritizedCountries] = useState([]);
  const [internalCountryIso2, setInternalCountry] = useState(getCountry(country));
  const [internalValue, setInternalValue] = useState(null);
  const inputRef = useRef(null);

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
    let orderedCountries = data_countries.map(c => ({ ...c, value: c.iso2 }));
    console.log('orderedCountries', orderedCountries);
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
    const internalCountry = getCountry(country);
    setInternalCountry(internalCountry?.iso2);
  }, [country]);

  const handleTextInputChange = (e) => {
    setInternalValue(e.target.value);
  };

  const handleBlur = (e) => {
    // format number
    const parsed = parsePhoneNumber(internalValue, internalCountryIso2);
    const phoneCountry = getCountry(parsed.country);
    const formatted = formatPhoneNumber(internalValue, phoneCountry?.iso2);

    // select the country if found
    if (phoneCountry && phoneCountry.iso2 !== internalCountryIso2) {
      setInternalCountry(phoneCountry.iso2);
    }
    // set the phone number as the formatted value
    setInternalValue(formatted);
  };

  const handleFocus = (e) => {

  };

  console.log('countries', countries);

  return (
    <div className='phone-input'>
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
        {...rest}
        onRenderInput={(option, ref, value, placeHolder, onChangeHandler) => {
          return (<>{showFlags && option && <i className={`${option.iso2.toLowerCase()} flag`} />}<input
            className={`dropdown`}
            aria-autocomplete="list"
            autoComplete="new-password"
            onChange={onChangeHandler}
            value={option && option.phone_code && `+${option.phone_code}` || ''}
            placeholder={placeHolder}
            ref={ref}
          /></>)
        }}
        onRenderMenu={(itemRenderer, selected, isFiltered, striped, handleItemSelect) => {
          return <div className='menu'>
            <div className={`items${striped ? ' striped' : ''}`}>
              {!isFiltered && prioritizedCountries && prioritizedCountries.length > 0 && <div className='prioritized'>
                {prioritizedCountries.map((option, key) => (
                  <div
                    key={key}
                    className={`item${option === selected ? ' selected' : ''}`}
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
            className={`item${option === selected ? ' selected' : ''}`}
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
        className={`input`}
        aria-autocomplete="phone"
        autoComplete="phone"
        onChange={handleTextInputChange}
        value={internalValue || ''}
        placeholder={placeHolder}
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneInput;