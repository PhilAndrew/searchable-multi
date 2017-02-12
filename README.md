# &lt;searchable-multi&gt;

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/matthewp/searchable-multi)
[![npm version](https://img.shields.io/npm/v/searchable-multi.svg?style=flat-square)](https://www.npmjs.com/package/searchable-multi)

A component that provides a more user-friendly method of doing multi selects.

multi.js is a user-friendly replacement for select boxes with the multiple attribute. It is mobile-friendly, easy to use, and provides search functionality. multi.js is also easy to customize and style with CSS.

## Install

Yarn:

```shell
yarn add searchable-multi
```

Bower:

```shell
bower install matthewp/searchable-multi --save
```

## Usage

Simply nest a `<select multiple>` inside of the searchable-multi tag:

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="./multi.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<searchable-multi placeholder="Search fruits...">
  <select multiple>
    <option>Apple</option>
    <option>Banana</option>
    <option>Blueberry</option>
    <option>Cherry</option>
    <option>Coconut</option>
    <option>Grapefruit</option>
    <option>Kiwi</option>
    <option>Lemon</option>
    <option>Lime</option>
    <option>Mango</option>
    <option>Orange</option>
    <option>Papaya</option>
  </select>
</searchable-multi>
```

### placeholder

Set the `placeholder` attribute or property to set the placeholder text used in the search input:

```html
<searchable-multi placeholder="Add items...">
   ...
</searchable-multi>
```

### value

The `value` property is an array of all of the selected values:

```js
let multi = document.querySeletor('searchable-multi');

console.log(multi.value); // ["Orange", "Kiwi", "Lemon"]
```

### change

The `change` **event** fires any time the `value` changes, such as when an item is selected or unselected.

```js
let multi = document.querySeletor('searchable-multi');

multi.addEventListener('change', e => {
  console.log(multi.value); // ["Cherry"]
});
```

## License

MIT, see the LICENSE file.
