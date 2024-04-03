export class DataManager {
  _log = false;
  _countries = [];
  _states = {};
  _cities = {};
  _languages = [];

  constructor() {
    
  };

  log(message, ...optionalParams) {
    if (this._log) console.debug(`dataManager: ${message}`, ...optionalParams);
  };

  async fetchCountries (options) {
    if (this._countries.length === 0) {
      this.log('dataManager: fetching countries', options);
      this._countries = await this.getData(options.src, options.files.countries);
      return this._countries;
    } else {
      this.log('dataManager: cached countries', options);
      return this._countries;
    }
  };

  async fetchStates(country, options) {
    if (typeof country !== 'object') {
      console.error('fetchStates: error - Country value must be an object.');
      return [];
    }
    if (!(country.iso2 in this._states) || this._states[country.iso2].length === 0) {
      this.log('dataManager: fetching states', country, options.files.states.replace('{country}', country.iso2), options);
      this._states[country.iso2] = await this.getData(options.src, options.files.states.replace('{country}', country.iso2));
      return this._states[country.iso2];
    } else {
      this.log('dataManager: cached states', country, options);
      return this._states[country.iso2];
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
    if (!(country.iso2 in this._cities) || !(state.state_code in this._cities[country.iso2]) || this._cities[country.iso2].length === 0) {
      this.log('dataManager: fetching cities', country, state, options);
      this._cities[country.iso2] = { [state.state_code]: await this.getData(options.src, options.files.cities.replace('{country}', country.iso2).replace('{state}', state.state_code)) };
      return this._cities[country.iso2][state.state_code];
    } else {
      this.log('dataManager: cached cities', country, state, options);
      return this._cities[country.iso2][state.state_code];
    }
  };

  async fetchLanguages(options) {
    if (this._languages.length === 0) {
      this.log('dataManager: fetching languages', options);
      this._languages = await this.getData(options.src, options.files.languages);
      return this._languages;
    } else {
      this.log('dataManager: cached languages', options);
      return this._languages;
    }
  };

  async getData (src, filename) {
    const data = await fetch(`${src}${filename}`).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Failed to fetch geo data file '${filename}'`, response);
      }
    });
    return data;
  };

};

const dataManager = new DataManager();
export default dataManager;