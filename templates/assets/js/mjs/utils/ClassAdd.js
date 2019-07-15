/**
 * Add classes to an element
 *
 * @param {Object} $element
 * @param {String} className
 * @return {Function}
 */
export default function($element, className) {
  $element.classList ? $element.classList.add(className) : $element.className += ' ' + className;
}
