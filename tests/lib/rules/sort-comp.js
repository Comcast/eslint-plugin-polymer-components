/**
 * @fileoverview Tests for sort-comp rule
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/sort-comp");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("sort-comp", rule, {
  valid: [
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  extends: 'li',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      type: Boolean,\n" +
        "      readOnly: true\n" +
        "    }\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
    },
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  extends: 'li',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      type: Boolean,\n" +
        "      readOnly: true\n" +
        "    }\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
    },
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  extends: 'li',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      type: Boolean,\n" +
        "      readOnly: true\n" +
        "    }\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
    },
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  extends: 'li',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      type: Boolean,\n" +
        "      readOnly: true\n" +
        "    }\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        " });",
    },
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  extends: 'li',\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {}\n" +
        "});",
    },
  ],
  invalid: [
    // Polymer-specific keys not in standard order
    {
      code:
        "Polymer({\n" +
        "  extends: 'li',\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {}\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  extends: 'li',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {}\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'is' should be before 'extends'.",
      ],
    },
    // Polymer-specific keys not in standard order
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  properties: {},\n" +
        "  behaviors: [],\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {}\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {}\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'behaviors' should be before 'properties'.",
      ],
    },
    // Private keys before public keys
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  a: function() {},\n" +
        "  _a: function() {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  a: function() {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. '_a' should be before 'a'.",
      ],
    },
    // Non-Polymer-specific keys not alphabetized
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  b: function() {},\n" +
        "  a: function() {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    // Polymer lifecycle callbacks not in the order in which they're called
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  attached: function() {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  attached: function() {},\n" +
        "  ready: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'created' should be before 'attached'.",
      ],
    },
    // Polymer property configurations should have "type" as their first key
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      readOnly: true,\n" +
        "      type: Boolean,\n" +
        "    },\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      type: Boolean,\n" +
        "      readOnly: true,\n" +
        "    },\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'type' should be before 'readOnly'.",
      ],
    },
    // Correctly sorts complex property keys
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      notify: true,\n" +
        "      value: false,\n" +
        "      readOnly: true,\n" +
        "      type: Boolean,\n" +
        "      reflectToAttribute: true,\n" +
        "    },\n" +
        "    c: {\n" +
        "      type: Boolean,\n" +
        "      computed: '_computeC(b)',\n" +
        "      value: false,\n" +
        "      readOnly: true,\n" +
        "      reflectToAttribute: true,\n" +
        "      notify: true,\n" +
        "    },\n" +
        "    b: {\n" +
        "      computed: '_computeB(a)',\n" +
        "      notify: true,\n" +
        "      readOnly: true,\n" +
        "      reflectToAttribute: true,\n" +
        "      value: false,\n" +
        "      type: Boolean,\n" +
        "    },\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {\n" +
        "    a: {\n" +
        "      type: Boolean,\n" +
        "      notify: true,\n" +
        "      readOnly: true,\n" +
        "      reflectToAttribute: true,\n" +
        "      value: false,\n" +
        "    },\n" +
        "    b: {\n" +
        "      type: Boolean,\n" +
        "      computed: '_computeB(a)',\n" +
        "      notify: true,\n" +
        "      readOnly: true,\n" +
        "      reflectToAttribute: true,\n" +
        "      value: false,\n" +
        "    },\n" +
        "    c: {\n" +
        "      type: Boolean,\n" +
        "      computed: '_computeC(b)',\n" +
        "      notify: true,\n" +
        "      readOnly: true,\n" +
        "      reflectToAttribute: true,\n" +
        "      value: false,\n" +
        "    },\n" +
        "  },\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  _a: function() {},\n" +
        "  _b: function() {},\n" +
        "  a: function() {},\n" +
        "  b: function() {}\n" +
        "});",
      errors: 6,
    },
    // Comments should be moved along with their corresponding properties when both have comments
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  // Comments for b\n" +
        "  b: function(bArg) {},\n" +
        "  // Comments for a\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  // Comments for a\n" +
        "  a: function(aArg) {},\n" +
        "  // Comments for b\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    // Comments should be moved along with their corresponding properties when one has JSDoc and the other has a standard comment
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  /**\n" +
        "    * Describe method b\n" +
        "    * @param {String} bArg method b arg\n" +
        "    * @return {String} method b return val\n" +
        "    */\n" +
        "  b: function(bArg) {},\n" +
        "  // Comments for a\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  // Comments for a\n" +
        "  a: function(aArg) {},\n" +
        "  /**\n" +
        "    * Describe method b\n" +
        "    * @param {String} bArg method b arg\n" +
        "    * @return {String} method b return val\n" +
        "    */\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    // JSDocs should be moved along with their corresponding properties when both have JSDocs
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  /**\n" +
        "    * Describe method b\n" +
        "    * @param {String} bArg method b arg\n" +
        "    * @return {String} method b return val\n" +
        "    */\n" +
        "  b: function(bArg) {},\n" +
        "  /**\n" +
        "    * Describe method a\n" +
        "    * @param {String} aArg method a arg\n" +
        "    * @return {String} method a return val\n" +
        "    */\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  /**\n" +
        "    * Describe method a\n" +
        "    * @param {String} aArg method a arg\n" +
        "    * @return {String} method a return val\n" +
        "    */\n" +
        "  a: function(aArg) {},\n" +
        "  /**\n" +
        "    * Describe method b\n" +
        "    * @param {String} bArg method b arg\n" +
        "    * @return {String} method b return val\n" +
        "    */\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    // Comments should be moved along with their corresponding properties when only one has comments
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  // Comments for b\n" +
        "  b: function(bArg) {},\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  a: function(aArg) {},\n" +
        "  // Comments for b\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  b: function(bArg) {},\n" +
        "  // Comments for a\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  // Comments for a\n" +
        "  a: function(aArg) {},\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    // JSDocs should be moved along with their corresponding properties when only one has JSDocs
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  /**\n" +
        "    * Describe method b\n" +
        "    * @param {String} bArg method b arg\n" +
        "    * @return {String} method b return val\n" +
        "    */\n" +
        "  b: function(bArg) {},\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  a: function(aArg) {},\n" +
        "  /**\n" +
        "    * Describe method b\n" +
        "    * @param {String} bArg method b arg\n" +
        "    * @return {String} method b return val\n" +
        "    */\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
    {
      code:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  b: function(bArg) {},\n" +
        "  /**\n" +
        "    * Describe method a\n" +
        "    * @param {String} aArg method a arg\n" +
        "    * @return {String} method a return val\n" +
        "    */\n" +
        "  a: function(aArg) {},\n" +
        "});",
      output:
        "Polymer({\n" +
        "  is: '',\n" +
        "  behaviors: [],\n" +
        "  properties: {},\n" +
        "  observers: [],\n" +
        "  listeners: {},\n" +
        "  created: function() {},\n" +
        "  ready: function() {},\n" +
        "  attached: function() {},\n" +
        "  detached: function() {},\n" +
        "  attributeChanged: function() {},\n" +
        "  /**\n" +
        "    * Describe method a\n" +
        "    * @param {String} aArg method a arg\n" +
        "    * @return {String} method a return val\n" +
        "    */\n" +
        "  a: function(aArg) {},\n" +
        "  b: function(bArg) {},\n" +
        "});",
      errors: [
        "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'.",
      ],
    },
  ],
});
