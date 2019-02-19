import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';
import invariant from 'invariant';

function createModifierClassNames(baseClassName, modifierConfig) {
  return reduce(modifierConfig, (classNames, booleanValue, modifierName) => {
    if (booleanValue) classNames.push(`${baseClassName}--${modifierName}`);
    return classNames;
  }, []);
}

function createClassNames(baseClassName, ...args) {
  return reduce(args, (classNames, arg) => {
    if (isEmpty(arg)) return classNames;
    if (isPlainObject(arg)) return classNames.concat(createModifierClassNames(baseClassName, arg));
    if (isString(arg)) classNames.push(arg);
    return classNames;
  }, [baseClassName]).join(' ');
}

/**
 * A simple JavaScript utility for conditionally creating BEM class names.
 *
 * Usage:
 *
 * Create an instance of `BemHelper` with the base class for your block element.
 *
 * ```javascript
 * const bem = new BemHelper('block');
 * ```
 *
 * Use the `block` or `element` method on the `BemHelper` instance to create block or element level
 * class names, respectively. Both methods take any number of arguments which can be a string or
 * object.
 *
 * A string argument is simply appended to the result.
 *
 * ```javascript
 * bem.block('other'); // "block other"
 * bem.element('element', 'other'); // "block block__element other"
 * ```
 *
 * An object is used to conditionally render block or element modifiers.
 *
 * ```javascript
 * bem.block({ disabled: true, primary: false }); // "block block--disabled"
 * bem.element('element', { small: false, large: true }); // "block_element block_element--large"
 * ```
 */
export default class BemHelper {
  static block(block, ...args) {
    const instance = new BemHelper(block);
    return instance.block(...args);
  }

  static element(block, element, ...args) {
    const instance = new BemHelper(block);
    return instance.element(element, ...args);
  }

  constructor(block) {
    this.base = block;

    if (process.env.NODE_ENV !== 'production') {
      invariant(isString(block), 'A block class name of type string must be specified.');
    }
  }

  block(...args) {
    return createClassNames(this.base, ...args);
  }

  element(element, ...args) {
    return createClassNames(`${this.base}__${element}`, ...args);
  }
}
