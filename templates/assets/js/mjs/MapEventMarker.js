/**
 * Events for markers
 *
 * @param  {Object} el
 * @param  {Array} data
 * @return {Function}
 */
import removeClasses from './utils/ClassRemove.js';
import addClasses from './utils/ClassAdd.js';
import {constMaps} from './Constants.js';
import flyToVenue from './MapFlyToVenue.js';
import createPopUp from './MapCreatePopUp.js';

export default function(el, marker, i, map) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    flyToVenue(marker, map);
    createPopUp(marker, map);


    /**
     * Highlight listing in sidebar
     */
    let activeItem = document.getElementsByClassName(constMaps.itemActiveClass);
    activeItem[0] ? activeItem[0].classList.remove(constMaps.itemActiveClass) : null;

    let listing = document.getElementById(`listing-${i}`);
    listing.classList.add(constMaps.itemActiveClass);

    /**
     * Scroll to list item
     * @type {[type]}
     */
    var topPos = listing.offsetTop;
    document.querySelector('[data-map-list]').scrollTop = topPos;

 });
}
