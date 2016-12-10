# Ko Dropdown
A knockout js dropdown component. Allows full css customizability to dropdowns using knockout js

[Demo and API Docs](https://matthewnitschke.github.io/ko-dropdown/)

# Installation
```html
<link rel="stylesheet" href="/path/to/ko-dropdown.css"/>

<script src="/path/to/knockout.js"></script>
<script src="/path/to/ko-dropdown.js"></script>
```

# Usage
Ko-dropdown attempts to emulate the ko options binding

```html
<ko-dropdown params="{options: options}></ko-dropdown>
```

# Options

| Name | Type | Required | Explanation |
|------|------|----------|-------------|
| options | Array\<string\> or Array\<object\> | true | options in the dropdown |
| value | observable | true | the value of the selected option |
| caption | string |  | text initally displayed on the dropdown |

## Object Options
If you want your value to be different than your text use the following

```javascript
self.options = ko.observableArray([
  { text: 'a', value:0 },
  { text: 'b', value: 1 },
  { text: 'c', value: 2 }
]);
```
when a is selected in the dropdown, the value observable will be set to 0

# Running the Docs
The docs file uses a [ko-component-page](https://github.com/matthewnitschke/ko-component-page) component to api information. To run, first install dependencies
```
npm install
```
then open the demo file in chrome
