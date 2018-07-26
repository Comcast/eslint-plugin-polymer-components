# Enforce component methods order (polymer-components/sort-comp)

When creating Polymer components, it's more convenient to always follow the same organisation for method order to help you easily find lifecycle methods, event handlers, etc.


## Rule Details

This rule ensures that the following order must be followed inside Polymer components:

  1. `is`,
  2. `behaviors`,
  3. `properties`,
  4. `observers`,
  5. `listeners`,
  6. lifecycle methods: `created`, `ready`, `attached`, `detached`, `attributeChanged` (in this order)
  7. custom private methods (prefixed with `_`),
  8. custom public methods

It also ensures that the configuration objects for Polymer properties begin with the property `type`

Examples of **incorrect** code for this rule:

```js
Polymer({

  attached: function() {...},

  attributeChanged: function() {...},

  behaviors: [...],

  created: function() {...},

  detached: function() {...},

  is: "incorrectly-sorted",

  listeners: {...},

  observers: [...],

  properties: {...},

  ready: function() {...},

});

```

Examples of **correct** code for this rule:

```js
Polymer({

  is: "correctly-sorted",

  behaviors: [...],

  properties: {...},

  observers: [...],

  listeners: {...},

  created: function() {...},

  ready: function() {...},

  attached: function() {...},

  detached: function() {...},

  attributeChanged: function() {...},

  _aSomePrivateMethod: function() {...},

  _bSomePrivateMethod: function() {...},

  aSomePublicMethod: function() {...},

  bSomePublicMethod: function() {...},

});

```

## When Not To Use It

You should disable this rule if...
* you're using ES6 classes to define Polymer components
* you don't want to notify about Polymer-specific property order
* you're not defining a Polymer component (but you already knew that)
