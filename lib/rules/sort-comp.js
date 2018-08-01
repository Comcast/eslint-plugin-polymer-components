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
polymerKeys.set('is', 0);
polymerKeys.set('type', 0);
polymerKeys.set('extends', 1);
polymerKeys.set('behaviors', 2);
polymerKeys.set('properties', 3);
polymerKeys.set('observers', 4);
polymerKeys.set('listeners', 5);
polymerKeys.set('created', 6);
polymerKeys.set('ready', 7);
polymerKeys.set('attached', 8);
polymerKeys.set('detached', 9);
polymerKeys.set('attributeChanged', 10);

function isValidOrder(keyA, keyB) {
  if (polymerKeys.has(keyA) && polymerKeys.has(keyB)) {
    return polymerKeys.get(keyA) <= polymerKeys.get(keyB);
  }
  if (polymerKeys.has(keyA)) {
    return true;
  }
  if (polymerKeys.has(keyB)) {
    return false;
  }

  return keyA <= keyB;
}

/**
 * Retrieves the source code text for a property. Captured
 * text includes immediately after the token preceeding the property
 * up until the end of the property's value.
 *
 * @param  {Node}   prop            Property Node
 * @param  {Node}   tokenBeforeProp The token immediately before the property node
 * @param  {String} sourceCodeText  The JS source code
 * @return {String}                 The property's source code
 */
function getPropertyText(prop, tokenBeforeProp, sourceCodeText) {
  return sourceCodeText.slice(
    tokenBeforeProp.end + 1,
    prop.value.end
  );
}

/**
 * Returns the range which we'll be replacing in the source code.
 * The range is represented as an array with two location indexes. The first
 * index is immediately after the token before the previous property.
 * The second index is the end of the current property.
 * @example
 * // Given this source code
 * { prevProp: 'a', currProp: 'b' }
 *
 * The token before prevProp is '{' at index 0
 * currProp ends at 29
 * The range returned is [1, 29]
 *
 * @param  {Node} tokenBeforePrevProp   The token before the Property node previously visited
 * @param  {Node} currProp              The property node currently visiting
 * @return {Array}                      The index for key start and index for value end
 */
function getRangeToReplace(tokenBeforePrevProp, currProp) {
  return [tokenBeforePrevProp.end + 1, currProp.value.end];
}

/**
 * Get the text between the value of the previous property
 * and the key of the current property.
 *
 * @param  {Node}   prevProp          The Property node previously visited
 * @param  {Node}   currProp          The Property node currently visiting
 * @param  {String} sourceCodeText    The JS source code
 * @return {String}                   The text between two properties
 */
function getTextBetweenProperties(prevProp, currProp, sourceCodeText) {
  if (currProp.leadingComments) {
    return sourceCodeText.slice(
      prevProp.value.end,
      currProp.leadingComments[0].start
    );
  }

  return sourceCodeText.slice(prevProp.value.end, currProp.key.start);
}
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      category: "Stylistic Issues",
      description: "require object keys inside of Polymer components to be sorted and Polymer-specific keys to be sorted according to their standard ordering",
      recommended: false,
      url: "https://github.com/Comcast/eslint-plugin-polymer-components/blob/master/docs/rules/sort-comp.md",
    },
    fixable: "code",
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
          prevName: null,
          prevProp: null,
          upper: stack,
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
        const prevProp = stack.prevProp;
        const currName = getPropertyName(node);

        stack.prevName = currName || prevName;
        stack.prevProp = node || prevProp;

        if (!prevName || !currName) {
          return;
        }

        if (!isValidOrder(prevName, currName)) {
          context.report({
            data: {
              currName,
              prevName,
            },
            loc: node.key.loc,
            message: "Expected Polymer component keys to be in standard order and all other keys to be in ascending order. '{{currName}}' should be before '{{prevName}}'.",
            node,
            fix(fixer) {
              const sourceCodeText = sourceCode.getText();

              // Tokens before the current property and the previously visited property
              const tokenBeforePrevProp = sourceCode.getTokenBefore(prevProp);
              const tokenBeforeCurrProp = sourceCode.getTokenBefore(node);

              // Area of the code we'll be replacing
              const rangeToReplace = getRangeToReplace(tokenBeforePrevProp, node);

              // Text we'll be replacing it with
              const prevPropText = getPropertyText(
                prevProp,
                tokenBeforePrevProp,
                sourceCodeText
              );
              const currPropText = getPropertyText(
                node,
                tokenBeforeCurrProp,
                sourceCodeText
              );
              const textBetweenProps = getTextBetweenProperties(
                prevProp,
                node,
                sourceCodeText
              );

              const textToReplace = currPropText + textBetweenProps + prevPropText.trimStart();

              return fixer.replaceTextRange(rangeToReplace, textToReplace);
            },
          });
        }
      },
    };
  },
};
