import { parsePhoneNumber as parsePhoneNumberExt, isValidPhoneNumber as isValidPhoneNumberExt, AsYouType } from 'libphonenumber-js';
import _ from 'underscore';
import { settings } from './constants';
import dataManager from './dataManager';

export const defaultOptions = {
  src: settings.src,
  files: {
     countries: settings.countriesFile,
     states: settings.statesFile,
     cities: settings.citiesFile,
     languages: settings.languagesFile
  }
};

export const wrapAsObject = (value, propertyName) => {
  return typeof value === 'object' ? value : { [propertyName]: value };
};

/**
 * Get all of the countries
 */
export const getCountries = async (options = defaultOptions) => {
  return await dataManager.fetchCountries(options);
};

/**
 * Get all of the state/provinces for a specified country
 */
export const getStates = async (country, options = defaultOptions) => {
  if (!country) {
    console.error('No country specified!');
    return [];
  }
  return await dataManager.fetchStates(wrapAsObject(country, 'iso2'), options);
};

/**
 * Get all of the cities for a specified country/state
 */
export const getCities = async (country, state, options = defaultOptions) => {
  if (!country) {
    console.error('No country specified!');
    return [];
  }
  if (!state) {
    console.error('No country state!');
    return [];
  }
  return await dataManager.fetchCities(wrapAsObject(country, 'iso2'), wrapAsObject(state, 'state_code'), options);
};

/**
 * Get all of the languages
 */
export const getLanguages = async (options = defaultOptions) => {
  return await dataManager.fetchLanguages(options);
};

/**
 * Get a country by name, ISO code, numerical id or object
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getCountry = async (country, options = defaultOptions) => {
  const countries = await getCountries(options);
  let selectedCountry = null;
  if (typeof country === 'number') {
    // find by id
    selectedCountry = _.find(countries, i => i.id === country);
  } else if (typeof country === 'string') {
    // find by iso/name
    const countryUpper = country.toUpperCase();
    selectedCountry = _.find(countries, i => i.iso2 === countryUpper)
      || _.find(countries, i => i.iso3 === countryUpper)
      || _.find(countries, i => i.name.toUpperCase() === countryUpper);
  } else if (typeof country === 'object' && country !== null) {
    // find by object
    if (country.id) {
      selectedCountry = _.find(countries, i => i.id === country.id);
    } else if(country.iso2) {
      const countryUpper = country.iso2.toUpperCase();
      selectedCountry = _.find(countries, i => i.iso2 === countryUpper)
        || _.find(countries, i => i.iso3 === countryUpper)
        || _.find(countries, i => i.name.toUpperCase() === countryUpper);
    }
  }
  return selectedCountry;
};

/**
 * Get a state/province by name, ISO code, numerical id or object
 * @param {string} state State name, ISO code, numerical id or object
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getState = async (state, country, options = defaultOptions) => {
  const selectedCountry = await getCountry(country, options);
  const states = await getStates(selectedCountry, options);
  
  let selectedState = null;
  if (selectedCountry) {
    if(typeof state === 'number') {
      // find by id
      selectedState = _.find(states, i => i.id === state);
    } else if (typeof state === 'string') {
      // find by code/name
      const stateUpper = state.toUpperCase();
      selectedState = _.find(states, i => i.state_code === stateUpper)
        || _.find(states, i => i.name === stateUpper);
    } else if (typeof state === 'object' && state !== null) {
      // find by object
      if (state.id)
        selectedState = _.find(states, i => i.id === state.id);
      else if (state.state_code) {
        const stateUpper = state.state_code.toUpperCase();
        selectedState = _.find(states, i => i.state_code === stateUpper)
          || _.find(states, i => i.name === stateUpper);
      }
    }
  }
  return selectedState;
};

/**
 * Get a list of states/provinces for a specified country
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getStatesForCountry = async (country, options = defaultOptions) => {
  const selectedCountry = await getCountry(country, options);
  if (selectedCountry) {
    const states = await getStates(selectedCountry, options);
    return _.find(states, i => i.id === selectedCountry.id)?.states;
  }
  return [];
};

/**
 * Get a city by name, numerical id or object
 * @param {string} city City name, numerical id or object
 * @param {string} state State name, ISO code, numerical id or object
 * @param {string} country Country name, ISO code, numerical id or object
 */
export const getCity = async (city, state, country, options = defaultOptions) => {
  const selectedCountry = await getCountry(country, options);
  const selectedState = await getState(wrapAsObject(state, 'state_code'), selectedCountry, options);
  let selectedCity = null;
  if (selectedCountry && selectedState) {
    const cities = await getCities(wrapAsObject(selectedCountry, 'iso2'), selectedState, options);
    if (cities) {
      if (typeof city === 'number') {
        // find by id
        selectedCity = _.find(cities, i => i.id === city);
      } else if (typeof city === 'string') {
        // find by name
        const cityLower = city.toLowerCase();
        selectedCity = _.find(cities, i => i.name.toLowerCase() === cityLower);
      } else if (typeof city === 'object' && city !== null) {
        // find by object
        if (city.id) {
          selectedCity = _.find(cities, i => i.id === city.id);
        } else if(city.name) {
          const cityLower = city.toLowerCase();
          selectedCity = _.find(cities, i => i.name.toLowerCase() === cityLower);
        }
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
export const getCitiesForState = async (state, country, options = defaultOptions) => {
  const selectedCountry = await getCountry(country, options);
  const selectedState = await getState(wrapAsObject(state, 'state_code'), selectedCountry, options);
  const cities = await getCities(wrapAsObject(selectedCountry, 'iso2'), selectedState, options);
  return cities;
};

/**
 * Get a language by name, native name or ISO code
 * @param {string} language Language name, native name or ISO code
 */
export const getLanguage = async (language, options = defaultOptions) => {
  let selectedLanguage = null;
  if (typeof language === 'string') {
    // find by iso/name
    const languageLower = language.toLowerCase();
    const languages = await getLanguages(options);
    selectedLanguage = _.find(languages, i => i.code === languageLower)
      || _.find(languages, i => i.name === languageLower)
      || _.find(languages, i => i.native === languageLower);
  } else if (typeof language === 'object' && language !== null) {
    // find by object
    const languageLower = language.code.toLowerCase();
    const languages = await getLanguages(options);
    selectedLanguage = _.find(languages, i => i.code === languageLower);
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
export const getCountriesForPhoneNumber = async (phoneNumber, options = defaultOptions) => {
  if (!phoneNumber || phoneNumber.length === 0) return '';

  const len = phoneNumber.length;
  switch (len) {
    case 10:
      // 5555551212
      // no country available
      return null;
    default:
      // full phone number with country code
      const countryCode = phoneNumber.substring(0, len - 4 - 3 - 3).replace('+','');      
      if (countryCode && countryCode.length > 0) {
        const countryCodeInt = parseInt(countryCode);
        const allCountries = await getCountries(options);
        const countries = _.filter(allCountries, i => i.phone_code === countryCodeInt);
        return countries;
      }
      return null;
  }
};
