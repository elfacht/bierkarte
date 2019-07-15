/**
 * Check if checkbox is checked
 * 
 * @param  {Object} $checkbox [checkbox object]
 * @return {Boolean}
 */
export default function($checkbox) {
  return $checkbox.checked ? true : false;
}
