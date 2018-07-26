# eslint-plugin-polymer-components

Polymer specific linting rules for ESLint

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-polymer-components`:

```
$ npm install eslint-plugin-polymer-components --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-polymer-components` globally.

## Usage

Add `polymer-components` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "polymer-components"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "polymer-components/sort-comp": "error"
    }
}
```

## Supported Rules

* [polymer-components/sort-comp](docs/rules/sort-comp.md): Enforce component methods order





