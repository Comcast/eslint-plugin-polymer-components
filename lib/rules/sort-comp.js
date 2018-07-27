/**
 * Copyright 2018 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * @fileoverview Rule to require object keys inside of Polymer components
 * to be sorted and Polymer-specific keys to be sorted according to their standard ordering
 */
"use strict";

/**
 * Gets the property name of a given node.
 * The node can be a MemberExpression, a Property, or a MethodDefinition.
 *
 * If the name is dynamic, this returns `null`.
 *
 * For examples:
 *
 *     a.b           // => "b"
 *     a["b"]        // => "b"
 *     a['b']        // => "b"
 *     a[`b`]        // => "b"
 *     a[100]        // => "100"
 *     a[b]          // => null
 *     a["a" + "b"]  // => null
 *     a[tag`b`]     // => null
 *     a[`${b}`]     // => null
 *
 *     let a = {b: 1}            // => "b"
 *     let a = {["b"]: 1}        // => "b"
 *     let a = {['b']: 1}        // => "b"
 *     let a = {[`b`]: 1}        // => "b"
 *     let a = {[100]: 1}        // => "100"
 *     let a = {[b]: 1}          // => null
 *     let a = {["a" + "b"]: 1}  // => null
 *     let a = {[tag`b`]: 1}     // => null
 *     let a = {[`${b}`]: 1}     // => null
 *
 * @param {ASTNode} node - The node to get.
 * @returns {string|null} The property name if static. Otherwise, null.
 * @private
 */
function getStaticPropertyName(node) {
    let prop;

    switch (node && node.type) {
        case "Property":
        case "MethodDefinition":
            prop = node.key;
            break;

        case "MemberExpression":
            prop = node.property;
            break;

        // no default
    }

    switch (prop && prop.type) {
        case "Literal":
            return String(prop.value);

        case "TemplateLiteral":
            if (prop.expressions.length === 0 && prop.quasis.length === 1) {
                return prop.quasis[0].value.cooked;
            }
            break;

        case "Identifier":
            if (!node.computed) {
                return prop.name;
            }
            break;

        // no default
    }

    return null;
}


/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name
 *   whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns null.
 *
 * @param {ASTNode} node - The `Property` node to get.
 * @returns {string|null} The property name or null.
 * @private
 */
function getPropertyName(node) {
  return getStaticPropertyName(node) || node.key.name || null;
}

var polymerKeys = new Map();
polymerKeys.set('is', '0');
polymerKeys.set('type', '0');
polymerKeys.set('behaviors', '1');
polymerKeys.set('properties', '2');
polymerKeys.set('observers', '3');
polymerKeys.set('listeners', '4');
polymerKeys.set('created', '5');
polymerKeys.set('ready', '6');
polymerKeys.set('attached', '7');
polymerKeys.set('detached', '8');
polymerKeys.set('attributeChanged', '9');

function isValidOrder(keyA, keyB) {
  keyA = polymerKeys.get(keyA) || keyA;
  keyB = polymerKeys.get(keyB) || keyB;

  return keyA <= keyB;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "require object keys inside of Polymer components to be sorted and Polymer-specific keys to be sorted according to their standard ordering",
      category: "Stylistic Issues",
      recommended: false,
      url: "https://github.com/Comcast/eslint-plugin-polymer-components/blob/master/docs/rules/sort-comp.md"
    },
    fixable: "code"
  },

  /**
   * Returns an object with methods that ESLint calls to “visit”
   * nodes while traversing the abstract syntax tree.
   * See ESLint's {@link https://eslint.org/docs/developer-guide/working-with-rules#rule-basics Rule Basics} for further information.
   *
   * @param  {Object} context - contains information and functionality
   *   relevant to the context of the rule (including the meta object
   *   defined above). See ESLint's {@link https://eslint.org/docs/developer-guide/working-with-rules#the-context-object The Context Object} for more information.
   *
   * @return {Object} - Object with methods that are called when a node
   *   that matches the selector is encountered
   */
  create(context) {

    // The stack to save the previous property's name for each object literals.
    let stack = null;
    const sourceCode = context.getSourceCode();

    return {
      // method called when ESLint encounters an ObjectExpression
      // node while traversing down the AST
      ObjectExpression() {
        stack = {
          upper: stack,
          prevName: null,
          prevPropertyNode: null
        };
      },
      // called while traversing up the AST
      "ObjectExpression:exit"() {
        stack = stack.upper;
      },

      Property(node) {
        if (node.parent.type === "ObjectPattern") {
          return;
        }

        const prevName = stack.prevName;
        const prevPropertyNode = stack.prevPropertyNode;
        const currName = getPropertyName(node);

        stack.prevName = currName || prevName;
        stack.prevPropertyNode = node || prevPropertyNode;

        if (!prevName || !currName) {
          return;
        }

        if (!isValidOrder(prevName, currName)) {
          context.report({
            node,
            loc: node.key.loc,
            message: "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. '{{currName}}' should be before '{{prevName}}'.",
            data: {
              currName,
              prevName
            },
            fix(fixer) {
              const sourceCodeText = sourceCode.getText();

              // Previous Property data
              const prevPropertyKeyStart = prevPropertyNode.key.start;
              const prevPropertyValueEnd = prevPropertyNode.value.end;
              const prevPropertyText = sourceCode.getText(prevPropertyNode);

              // Current Property data
              const currPropertyKeyStart = node.key.start;
              const currPropertyValueEnd = node.value.end;
              const currPropertyText = sourceCode.getText(node);

              // Text between the two properties
              const textBetweenProps = sourceCodeText.slice(prevPropertyValueEnd, currPropertyKeyStart);

              const rangeToReplace = [prevPropertyKeyStart, currPropertyValueEnd];
              const textToReplace = currPropertyText + textBetweenProps + prevPropertyText;

              return fixer.replaceTextRange(rangeToReplace, textToReplace);
            }
          });
        }
      }
    };
  }
};
