# react-country-state-dropdown
A responsive country, state, city, and language dropdown for React (and now a phone input too!)

## Installation

```npm
npm install --save react-country-state-dropdown
```

or using yarn:
```npm
yarn add react-country-state-dropdown
```

## Usage

It's very simple to use. The state can be managed in a controlled or uncontrolled manner. Here we are showing an example of controlled usage by assigning an initial value and an onChange handler. Note that the `<StateDropdown />` requires a `country` input in order to display states for the selected country. `<CityDropdown />` requires both a `country` and a `state`, and it's generally a good idea to use the option `allowFreeFormText` to allow city entries that aren't prepopulated in the dropdown.

```javascript
import React, { useState } from 'react';
import { CountryDropdown, StateDropdown, CityDropdown, LanguagesDropdown, PhoneInput } from "react-country-state-dropdown";

const Example = () => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [language, setLanguage] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);
  const handleSetCity = (e, value) => setCity(value);
  const handleSetLanguage = (e, value) => setLanguage(value);
  const handleSetPhone = (e, value) => setPhone(value);

  return (
    <div>
      <CountryDropdown clearable value={country} onChange={handleSetCountry} />
      <StateDropdown clearable country={country} value={state} onChange={handleSetState} />
      <CityDropdown clearable allowFreeFormText country={country} state={state} value={city} onChange={handleSetCity} />
      <LanguageDropdown searchable value={language} onChange={handleSetLanguage} />
      <PhoneInput clearable country={country} value={phone} onChange={handleSetPhone} />
    </div>);
};

```

## Options

```<Dropdown />```

These attributes are common to all dropdowns. Rendering of the component is controllable for full customization.

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| value | No | `""` | `string` | The currently selected value.
| options | No | `[]` | `array` | An array of options available to the dropdown. These are populated automatically for the `<CountryDropdown />, <StateDropdown />, <CityDropdown />, <LanguageDropdown />` controls. |
| name | No | `""` | `string` | The name attribute of the generated select box. |
| id | No | `""` | `string` | The ID of the generated select box. Not added by default. |
| classes | No | `""` | `string` | Any additional space-separated classes you want to add. |
| placeHolder | No | `""` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| emptyLabel | No | `"No items."` | `string` | Message displayed when no items are available for selection in the menu. |
| striped | No | `false` | `boolean` | True to show the items in the list box with faint striping. |
| clearable | No | `false` | `boolean` | True to show an [X] button to clear the selected value. | 
| searchable | No | `false` | `boolean` | True to allow text entry and filter the list by the searched value. | 
| allowFreeFormText | No | `false` | `boolean` | True to allow entry of text that does not match any value in the options list. |
| disabled | No | `false` | `boolean` | Disables the control. |
| onChange | No | `-` | `function` | Callback that gets called when the user selects a value. |
| onSearchInputChange | No | `-` | `function` | Callback that gets called when the text input is changed. |
| onRenderMenu | No | `-` | `function` | Override the rendering of the menu container. |
| onRenderItem | No | `-` | `function` | Override the rendering of the options item. |
| onRenderInput | No | `-` | `function` | Override the rendering of the input control. |
| onRenderEmpty | No | `-` | `function` | Override the rendering of the menu containers empty contents message. |

---

```<CountryDropdown />```

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| placeHolder | No | `"Choose a country"` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| priority | No | `['US', 'CA', 'MX']` | `array` | An array of ISO2 country codes (ex. 'US') to show at the top of the list. |
| removePrioritized | No | `false` | `boolean` | True to remove prioritized countries from the main list when searching. | 
| showFlags | No | `true` | `boolean` | True to show the country's flag. | 
| native | No | `true` | `boolean` | True to show the country's native name instead of English name. | 
| includeAlternate | No | `false` | `boolean` | True to include alternate name (native name if native=false, English name if native=true). | 

---

```<StateDropdown />```

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| country | Yes | `""` | `string/id/object` | The country using a country object, name or ISO2 country code.
| placeHolder | No | `"Choose a state/province"` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| emptyLabel | No | `"No states available to select."` | `string` | Label to display when no items are available. |
| noCountryLabel | No | `"Please select a country"` | `string` | Label to display when no country is selected. |
| priority | No | `[]` | `array` | An array of ISO2 state codes (ex. 'US') to show at the top of the list. |
| removePrioritized | No | `false` | `boolean` | True to remove prioritized countries from the main list when searching. | 

---

```<CityDropdown />```

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| country | Yes | `""` | `string/id/object` | The country using a country object, name or ISO2 country code.
| state | Yes | `""` | `string/id/object` | The state using a state object, name or state code.
| placeHolder | No | `"Choose a city"` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| emptyLabel | No | `"No cities available to select."` | `string` | Label to display when no items are available. |
| noCountryLabel | No | `"Please select a country"` | `string` | Label to display when no country is selected. |
| noStateLabel | No | `"Please select a state/province"` | `string` | Label to display when no state is selected. |
| priority | No | `[]` | `array` | An array of ISO2 state codes (ex. 'US') to show at the top of the list. |
| removePrioritized | No | `false` | `boolean` | True to remove prioritized countries from the main list when searching. | 

---

```<LanguageDropdown />```

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| placeHolder | No | `"Choose a language"` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| emptyLabel | No | `"No items."` | `string` | Label to display when no items are available. |
| priority | No | `['en']` | `array` | An array of ISO2 language codes (ex. 'en') to show at the top of the list. |
| removePrioritized | No | `false` | `boolean` | True to remove prioritized countries from the main list when searching. | 

---

```<PhoneInput />```

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| value | No | `""` | `string` | The currently selected value.
| name | No | `""` | `string` | The name attribute of the generated select box. |
| id | No | `""` | `string` | The ID of the generated select box. Not added by default. |
| classes | No | `""` | `string` | Any additional space-separated classes you want to add. |
| placeHolder | No | `"Enter a phone number"` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| priority | No | `['US','CA','MX']` | `array` | An array of ISO2 country codes (ex. 'US') to show at the top of the list. |
| clearable | No | `false` | `boolean` | True to show an [X] button to clear the selected value. | 
| disabled | No | `false` | `boolean` | Disables the control. |
| onChange | No | `-` | `function` | Callback that gets called when the user selects a value. |
| onSearchInputChange | No | `-` | `function` | Callback that gets called when the text input is changed. |

## Examples

Here's an example of all the typical options being used.

```javascript
import React, { useState } from 'react';
import { CountryDropdown, StateDropdown, CityDropdown, LanguagesDropdown, PhoneInput } from "react-country-state-dropdown";

const Example = () => {
  const [country, setCountry] = useState('US'); // can set a default value using the ISO2 code instead of the full country object
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [language, setLanguage] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleSetCountry = (e, value) => setCountry(value);
  const handleSetState = (e, value) => setState(value);
  const handleSetCity = (e, value) => setCity(value);
  const handleSetLanguage = (e, value) => setLanguage(value);
  const handleSetPhone = (e, value) => setPhone(value);

  return (
    <div>
      <CountryDropdown clearable searchable striped value={country} onChange={handleSetCountry} />
      <StateDropdown clearable searchable striped country={country} value={state} onChange={handleSetState} />
      <CityDropdown clearable searchable striped allowFreeFormText country={country} state={state} value={city} onChange={handleSetCity} />
      <LanguageDropdown clearable searchable striped value={language} onChange={handleSetLanguage} />
      <PhoneInput clearable country={country} value={phone} onChange={handleSetPhone} />
    </div>);
};
```

How to output the full country information.

```javascript
import React, { useState } from 'react';
import { CountryDropdown } from "react-country-state-dropdown";

const Example = () => {
  const [country, setCountry] = useState(null);

  const handleSetCountry = (e, value) => {
    setCountry(value);
    console.log(value);
  };

  return (
    <div>
      <CountryDropdown clearable searchable striped value={country} onChange={handleSetCountry} />
    </div>);
};
```

Produces the output:
```json
{
    "id": 233,
    "name": "United States",
    "iso3": "USA",
    "iso2": "US",
    "numeric_code": "840",
    "phone_code": 1,
    "capital": "Washington",
    "currency": "USD",
    "currency_name": "United States dollar",
    "currency_symbol": "$",
    "tld": ".us",
    "native": "United States",
    "region": "Americas",
    "subregion": "Northern America",
    "latitude": "38.00000000",
    "longitude": "-97.00000000",
    "emoji": "🇺🇸",
    "value": "United States"
}
```

How to output the full state information.

```javascript
import React, { useState } from 'react';
import { StateDropdown } from "react-country-state-dropdown";

const Example = () => {
  const [state, setState] = useState(null);

  const handleSetState = (e, value) => {
    setState(value);
    console.log(value);
  };

  return (
    <div>
      <StateDropdown country='CA' clearable searchable striped value={state} onChange={handleSetState} />
    </div>);
};
```

Produces the output:
```json
{
    "id": 875,
    "name": "British Columbia",
    "code": "BC",
    "value": "British Columbia"
}
```

## Utility Functions

There are many functions that can be called to retrieve data, or format phone numbers.

`getCountries()`: Get an array of all countries.

`getStates()`: Get an array of all state/provinces.

`getCities()`: Get an array of all cities (very large list, see `getCitiesForState()`).

`getLanguages()`: Get an array of all languages.

`getCountry(country)`: Get a country by name, ISO code, numerical id or object

`getState(state, country)`: Get a state by name, ISO code, numerical id or object, country must be specified.

`getStatesForCountry(country)`: Get an array of all state/provinces for a specified country.

`getCity(city, state, country)`: Get a city by name, numerical id, or object, state and country must also be specified.

`getCitiesForState(state, country)`: List all cities by state and country

`getLanguage(language)`: Get a language by name, native name or ISO code

`parsePartialNumber(phoneNumber, countryCode)`: Parse a partial phone number

`parsePhoneNumber(phoneNumber, countryCode)`: Parse a phone number

`formatPhoneNumber(phoneNumber, countryCode)`: Format a phone number

`formatInternational(phoneNumber, countryCode)`: Format a phone number as the international E.164 format

`isValidPhoneNumber(phoneNumber, countryCode)`: Check if a phone number is of valid format

`getCountriesForPhoneNumber(phoneNumber)`: Get the countries for a E.164 format phone number

