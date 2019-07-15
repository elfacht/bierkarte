/**
 * Check if element has a certain class
 *
 * @param {Object} $target – the target element
 * @param {String} className – the class name to check
 * @return {Boolean}
 */
export default function($target, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test($target.className);
}
