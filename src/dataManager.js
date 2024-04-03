import _ from 'underscore';

/**
 * Manages data fetching, caching and controls parallel execution
 */
export class DataManager {
  _log = false;
  _operationQueue = [];
  _countries = [];
  _states = [];
  _cities = [];
  _languages = [];

  constructor() {
    
  };

  log(message, ...optionalParams) {
    if (this._log) console.debug(`dataManager: ${message}`, ...optionalParams);
  };

  async fetchCountries (options) {
    const cachedData = this._countries;
    if (!cachedData || !(cachedData?.length > 0)) {
      this.log('dataManager: fetching countries', options);
      const countries = await this.getData('countries', options.src, options.files.countries);
      this._countries = countries;
      return countries;
    } else {
      this.log('dataManager: cached countries', options);
      return cachedData;
    }
  };

  async fetchStates(country, options) {
    if (typeof country !== 'object') {
      console.error('fetchStates: error - Country value must be an object.');
      return [];
    }
    const cachedData = _.find(this._states, i => i.country === country.iso2);
    if (!cachedData || !(cachedData?.states?.length > 0)) {
      this.log('dataManager: fetching states', country, options.files.states.replace('{country}', country.iso2), options);
      const states = await this.getData(`states-${country.iso2}`, options.src, options.files.states.replace('{country}', country.iso2));
      this._states.push({ country: country.iso2, states });
      return states;
    } else {
      this.log('dataManager: cached states', country, options);
      return cachedData.states;
    }
  };

  async fetchCities(country, state, options) {
    if (typeof country !== 'object') {
      console.error('fetchCities: error - Country value must be an object.');
      return [];
    }
    if (typeof state !== 'object') {
      console.error('fetchCities: error - State value must be an object.');
      return [];
    }
    const cachedData = _.find(this._cities, i => i.country === country.iso2 && i.state === state.state_code);
    if (!cachedData || !(cachedData?.cities?.length > 0)) {
      this.log('dataManager: fetching cities', country, state, options);
      const cities = await this.getData(`cities-${country.iso2}-${state.state_code}`, options.src, options.files.cities.replace('{country}', country.iso2).replace('{state}', state.state_code));
      this._cities.push({ country: country.iso2, state: state.state_code, cities });
      return cities;
    } else {
      this.log('dataManager: cached cities', country, state, options);
      return cachedData.cities;
    }
  };

  async fetchLanguages(options) {
    const cachedData = this._languages;
    if (!cachedData || !(cachedData?.length > 0)) {
      this.log('dataManager: fetching languages', options);
      const languages = await this.getData('languages', options.src, options.files.languages);
      this._languages = languages;
      return languages;
    } else {
      this.log('dataManager: cached languages', options);
      return cachedData;
    }
  };

  /**
   * Fetch data from data file in a queue, to prevent concurrent executions for the same resource.
   * @param {string} name A unique key for the type of operation being executed
   * @param {string} src the base path of the fetch request
   * @param {string} filename the name of the data file to fetch
   * @returns 
   */
  async getData (name, src, filename) {
    if (!src.endsWith('/')) src += '/';

    let queueItem = _.find(this._operationQueue, i => i.key === name);
    if (queueItem) {
      // wait for operation to complete
      const data = await queueItem.operation;
      return data;
    } else {
      queueItem = { key: name, operation: null };
      this._operationQueue.push(queueItem);
      queueItem.operation = fetch(`${src}${filename}`).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Failed to fetch geo data file '${filename}'`, response);
          return [];
        }
      });

      // return the promise
      const data = await queueItem.operation;
      // remove from queue
      this._operationQueue = _.filter(this._operationQueue, i => i.key === name);
      return data;
    }
  };

};

const dataManager = new DataManager();
export default dataManager;