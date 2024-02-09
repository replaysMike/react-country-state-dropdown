import { data_countries } from "./data/countries";
import { data_states } from "./data/states";
import { data_cities } from "./data/cities";
import { data_languages } from "./data/languages";
import { parsePhoneNumber as parsePhoneNumberExt, isValidPhoneNumber as isValidPhoneNumberExt, AsYouType } from 'libphonenumber-js';
import _ from 'underscore';

/**
 * Get all of the countries
 */
export const getCountries = () => {
  return data_countries;
};

/**
 * Get all of the state/provinces
 */
export const getStates = () => {
  return data_states;
};

/**
 * Get all of the cities
 */
export const getCities = () => {
  return data_cities;
};

/**
 * Get all of the languages
 */
export const getLanguages = () => {
  return data_languages;
};

/**
 * Get a country by name, ISO code, numerical id or object
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getCountry = (country) => {
  let selectedCountry = null;
  if (typeof country === 'number') {
    // find by id
    selectedCountry = _.find(getCountries(), i => i.id === country);
  } else if (typeof country === 'string') {
    // find by iso/name
    const countryUpper = country.toUpperCase();
    selectedCountry = _.find(getCountries(), i => i.iso2 === countryUpper)
      || _.find(getCountries(), i => i.iso3 === countryUpper)
      || _.find(getCountries(), i => i.name.toUpperCase() === countryUpper);
  } else if (typeof country === 'object' && country !== null) {
    // find by object
    selectedCountry = _.find(getCountries(), i => i.id === country.id);
  }
  return selectedCountry;
};

/**
 * Get a state/province by name, ISO code, numerical id or object
 * @param {string} state State name, ISO code, numerical id or object
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getState = (state, country) => {
  let selectedCountry = getCountry(country);
  let selectedState = null;
  if (selectedCountry) {
    let matchingStates = _.find(getStates(), i => i.id === selectedCountry.id)?.states;
    if(typeof state === 'number') {
      // find by id
      selectedState = _.find(matchingStates, i => i.id === state);
    } else if (typeof state === 'string') {
      // find by code/name
      const stateUpper = state.toUpperCase();
      selectedState = _.find(matchingStates, i => i.code === stateUpper)
        || _.find(matchingStates, i => i.name === stateUpper);
    } else if (typeof state === 'object' && state !== null) {
      // find by object
      selectedState = _.find(matchingStates, i => i.id === state.id);
    }
  }
  return selectedState;
};

/**
 * Get a list of states/provinces for a specified country
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getStatesForCountry = (country) => {
  let selectedCountry = getCountry(country);
  if (selectedCountry) {
    return _.find(getStates(), i => i.id === selectedCountry.id)?.states;
  }
  return [];
};

/**
 * Get a city by name, numerical id or object
 * @param {string} city City name, numerical id or object
 * @param {string} state State name, ISO code, numerical id or object
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getCity = (city, state, country) => {
  let selectedCountry = getCountry(country);
  let selectedState = getState(state, country);
  let selectedCity = null;
  if (selectedCountry && selectedState) {
    let countryCities = _.find(getCities(), i => i.id === selectedCountry.id)?.states;
    let stateCities = _.find(countryCities, i => i.id === selectedState.id)?.cities;
    if (stateCities) {
      if (typeof city === 'number') {
        // find by id
        selectedCity = _.find(stateCities, i => i.id === city);
      } else if (typeof city === 'string') {
        // find by name
        const cityLower = city.toLowerCase();
        selectedCity = _.find(stateCities, i => i.name.toLowerCase() === cityLower);
      } else if (typeof city === 'object' && city !== null) {
        // find by object
        selectedCity = _.find(stateCities, i => i.id === city.id);
      }
    }
  }
  return selectedCity;
};

/**
 * Get all of the cities for a state/province
 * @param {string} state State name, ISO code or numerical id
 * @param {string} country Country name, ISO code or numerical id
 */
export const getCitiesForState = (state, country) => {
  let selectedCountry = getCountry(country);
  let selectedState = getState(state, country);
  let selectedCities = null;
  if (selectedCountry && selectedState) {
    let countryCities = _.find(data_cities, i => i.id === selectedCountry.id)?.states;
    selectedCities = _.find(countryCities, i => i.id === selectedState.id)?.cities;
  }
  return selectedCities;
};

/**
 * Get a language by name, native name or ISO code
 * @param {string} language Language name, native name or ISO code
 */
export const getLanguage = (language) => {
  let selectedLanguage = null;
  if (typeof language === 'string') {
    // find by iso/name
    const languageLower = language.toLowerCase();
    selectedLanguage = _.find(getLanguages(), i => i.code === languageLower)
      || _.find(getLanguages(), i => i.name === languageLower)
      || _.find(getLanguages(), i => i.native === languageLower);
  } else if (typeof language === 'object' && language !== null) {
    // find by object
    const languageLower = language.code.toLowerCase();
    selectedLanguage = _.find(getLanguages(), i => i.code === languageLower);
  }
  return selectedLanguage;
};

/**
 * Parse a partial phone number
 * @param {string} phoneNumber Phone number to format
 * @param {string} phoneNumber Country code (ISO2, ex. 'US') to use for phone number, if available
 */
export const parsePartialNumber = (phoneNumber, countryCode = '') => {
  if (!phoneNumber || phoneNumber.length === 0) return '';
  if ((!countryCode || countryCode.length === 0) && !phoneNumber.startsWith('+'))
    phoneNumber = '+' + phoneNumber;

  return new AsYouType(countryCode).input(phoneNumber);
};

/**
 * Parse a phone number
 * @param {string} phoneNumber Phone number to format
 * @param {string} phoneNumber Country code (ISO2, ex. 'US') to use for phone number, if available
 */
export const parsePhoneNumber = (phoneNumber, countryCode = '') => {
  if (!phoneNumber || phoneNumber.length === 0) return '';
  if ((!countryCode) && !phoneNumber.startsWith('+'))
    phoneNumber = '+' + phoneNumber;
  let parsed = parsePhoneNumberExt(phoneNumber, countryCode);
  if (parsed.country === undefined && !countryCode && isValidPhoneNumber(phoneNumber, countryCode))
    parsed = parsePhoneNumberExt('1' + phoneNumber, countryCode);
  return parsed;
};

/**
 * Format a phone number
 * @param {string} phoneNumber Phone number to format
 * @param {string} phoneNumber Country code (ISO2, ex. 'US') to use for phone number, if available
 */
export const formatPhoneNumber = (phoneNumber, countryCode = '') => {
  if (!phoneNumber || phoneNumber.length === 0) return '';
  const parsed = parsePhoneNumber(phoneNumber, countryCode);
  return (parsed && parsed.formatNational()) || phoneNumber;
};

/**
 * Format a phone number as the international E.164 format
 * @param {string} phoneNumber Phone number to format
 * @param {string} phoneNumber Country code (ISO2, ex. 'US') to use for phone number, if available
 */
export const formatInternational = (phoneNumber, countryCode = '') => {
  if (!phoneNumber || phoneNumber.length === 0) return '';
  const parsed = parsePhoneNumber(phoneNumber, countryCode);
  return (parsed && parsed.formatInternational()) || phoneNumber;
};

/**
 * Check if a phone number is of valid format
 * @param {string} phoneNumber Phone number to format
 * @param {string} phoneNumber Country code (ISO2, ex. 'US') to use for phone number, if available
 */
export const isValidPhoneNumber = (phoneNumber, countryCode = '') => {
  if (!phoneNumber || phoneNumber.length === 0) return '';
  const isValid = isValidPhoneNumberExt(phoneNumber, countryCode);
  return isValid;
};

/**
 * Get the countries for a E.164 format phone number
 * @param {string} phoneNumber Phone number to format
 */
export const getCountriesForPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length === 0) return '';

  const len = phoneNumber.length;
  const areaCode = phoneNumber.substring(len - 4 - 3 - 3, len - 4 - 3);
  const local = phoneNumber.substring(len - 4 - 3, len - 4);
  const address = phoneNumber.substring(len - 4, len);
  switch (len) {
    case 10:
      // 5555551212
      // no country available
      return null;
    default:
      // full phone number with country code
      const countryCode = phoneNumber.substring(0, len - 4 - 3 - 3).replace('+','');      
      console.log('countryCode', countryCode)
      if (countryCode && countryCode.length > 0) {
        const countryCodeInt = parseInt(countryCode);
        const countries = _.filter(data_countries, i => i.phone_code === countryCodeInt);
        return countries;
      }
      return null;
  }
};