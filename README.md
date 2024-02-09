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

## Demo

View the [live demo](https://codesandbox.io/p/sandbox/currying-cherry-8f9vt3?file=%2Fsrc%2FApp.js%3A42%2C18&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clse0ychi0006356h36uv4wc5%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clse0ychi0002356hpw6u1u8n%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clse0ychi0003356hdqnpctcl%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clse0ychi0005356hlq5qjjah%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clse0ychi0002356hpw6u1u8n%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clse0ychi0001356hli4p2b45%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Findex.js%2522%252C%2522state%2522%253A%2522IDLE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A4%252C%2522startColumn%2522%253A25%252C%2522endLineNumber%2522%253A4%252C%2522endColumn%2522%253A25%257D%255D%257D%252C%257B%2522id%2522%253A%2522clsf596dr0002356h7450kk96%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A11%252C%2522startColumn%2522%253A43%252C%2522endLineNumber%2522%253A11%252C%2522endColumn%2522%253A43%257D%255D%252C%2522filepath%2522%253A%2522%252Fpackage.json%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clsf8c73k0002356ixpp7798v%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A42%252C%2522startColumn%2522%253A18%252C%2522endLineNumber%2522%253A42%252C%2522endColumn%2522%253A18%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.js%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clse0ychi0002356hpw6u1u8n%2522%252C%2522activeTabId%2522%253A%2522clsf8c73k0002356ixpp7798v%2522%257D%252C%2522clse0ychi0005356hlq5qjjah%2522%253A%257B%2522id%2522%253A%2522clse0ychi0005356hlq5qjjah%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clse0ychi0004356h4t59weia%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clse0ychi0004356h4t59weia%2522%257D%252C%2522clse0ychi0003356hdqnpctcl%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clse0ychi0003356hdqnpctcl%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D).

## Screenshot

![image](https://github.com/replaysMike/react-country-state-dropdown/assets/2531058/33b1b0ec-fc65-48f1-b4cf-7003b9a9f86b)

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
| className | No | `""` | `string` | Add classes to the rcsd-dropdown |
| inputContainerClassName | No | `""` | `string` | Add classes to the rcsd-input |
| inputClassName | No | `""` | `string` | Add classes to the input element |
| menuClassName | No | `""` | `string` | Add classes to the menu |
| itemsClassName | No | `""` | `string` | Add classes to the items container|
| itemClassName | No | `""` | `string` | Add classes to the item |

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
| prioritizedClassName | No | `""` | `string` | Add classes to the prioritized items container |

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
| prioritizedClassName | No | `""` | `string` | Add classes to the prioritized items container |

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
| prioritizedClassName | No | `""` | `string` | Add classes to the prioritized items container |

---

```<LanguageDropdown />```

| Parameter | Required? | Default | Type | Description |
|:---|:---:|:---|:---|:---|
| placeHolder | No | `"Choose a language"` | `string` | Message displayed on the input/dropdown control when no input is selected. |
| emptyLabel | No | `"No items."` | `string` | Label to display when no items are available. |
| priority | No | `['en']` | `array` | An array of ISO2 language codes (ex. 'en') to show at the top of the list. |
| removePrioritized | No | `false` | `boolean` | True to remove prioritized countries from the main list when searching. | 
| prioritizedClassName | No | `""` | `string` | Add classes to the prioritized items container |

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
| prioritizedClassName | No | `""` | `string` | Add classes to the prioritized items container |
| dropdownInputClassName | No | `""` | `string` | Add classes to the dropdown input element |

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

