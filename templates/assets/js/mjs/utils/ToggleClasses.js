/**
 * Toggle CSS classes of element
 *
 * @param  {Object} $element  [target element]
 * @param  {String} className [CSS class name, without '.']
 * @return {Function} toggle classes
 */
export default function($element, className) {
  if ($element.classList) {
    $element.classList.toggle(className);
  } else {
    const classes = $element.className.split(' ');
    const existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
      $element.className = classes.join(' ');
    }
  }
}
