/**
 * Find closest element (by class) of given element
 *
 * @param {Object} el – given element | required
 * @param {String} selector – closest selector to finde | required
 * @return {Object}
 */
export default function(el, selector) {
  let matchesFn;

  // find vendor prefix
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
    if (typeof document.body[fn] === 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  });

  let parent;

  // traverse parents
  while (el) {
    parent = el.parentElement;

    if (parent && parent[matchesFn](selector)) {
      return parent;
    }

    el = parent;
  }

  return null;
}
