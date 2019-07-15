/**
 * Get Y position of element
 *
 * @param  {String} query [query selector]
 * @return {Number}       
 */
export default function(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top;
}
