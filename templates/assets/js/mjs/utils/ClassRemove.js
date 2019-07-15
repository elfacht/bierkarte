/**
 * Remove classes from an element
 * @param {Object} $element
 * @param {String} className
 * @return {Function}
 */
export default function($element, className) {
  if ($element.classList) {
      $element.classList.remove(className);
  } else {
      $element.className = $element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
