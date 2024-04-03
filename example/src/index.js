import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from "react";
//import { CountryDropdown, StateDropdown, CityDropdown, LanguageDropdown, PhoneInput, formatPhoneNumber, formatInternational, getCountriesForPhoneNumber, getCountry, getState, getCitiesForState } from "react-country-state-dropdown";
import { getCountries, defaultOptions, Dropdown } from "react-country-state-dropdown";
import "./style.css";

const App = () => {
  const [country, setCountry] = useState('CA');
  const handleSetCountry = (e, value) => { setCountry(value); setState(null); }

  const loadCountries = async () => {
    const countries = await getCountries({ ...defaultOptions, src: '/' });
    console.log('countries', countries);
    // LEFT OFF: Dropdown itself seems to have an issue, invalid hooks call
  };

  useEffect(() => {
    //console.log('loaded');
    //loadCountries();
  }, []);
  /*const [state, setState] = useState('BC');
  const [city, setCity] = useState('NotVancouver');
  const [language, setLanguage] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleSetCountry = (e, value) => { setCountry(value); setState(null); }
  const handleSetState = (e, value) => { setState(value); setCity(null); }
  const handleSetCity = (e, value) => setCity(value);
  const handleSetLanguage = (e, value) => setLanguage(value);
  const handleSetPhone = (e, value) => setPhone(value);*/

  return (
    <div>
      <h1>Example</h1>
      
      {/*<CountryDropdown clearable value={country} onChange={handleSetCountry} title="Select a country" />
      <StateDropdown clearable country={country} value={state} onChange={handleSetState} />
      <CityDropdown clearable searchable allowFreeFormText country={country} state={state} value={city} onChange={handleSetCity} />
      <LanguageDropdown searchable value={language} onChange={handleSetLanguage} />
  <PhoneInput clearable value={phone} onChange={handleSetPhone} />*/}
    </div>);
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(<App />);
//ReactDOM.render(<App />, document.getElementById('app'));