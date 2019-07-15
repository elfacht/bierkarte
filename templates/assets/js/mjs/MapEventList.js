/**
 * Events for list items
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

export default function(el, data, i, map) {
  el.addEventListener('click', function(e){
    e.preventDefault();


    /**
     * Update the currentFeature to the store associated with the clicked link
     */
    let clickedListing = data.features[this.getAttribute('data-position')];
    flyToVenue(clickedListing, map);
    createPopUp(clickedListing, map);


    /**
     * Highlight listing item in sidebar
     */
    let activeItem = document.getElementsByClassName(constMaps.itemActiveClass);
    activeItem[0] ? activeItem[0].classList.remove(constMaps.itemActiveClass) : null;
    this.parentNode.classList.add(constMaps.itemActiveClass);


    /**
     * Remove active class from all markers
     */
    let markers = document.querySelectorAll(constMaps.marker);
    for (let i = 0; i < markers.length; i++) {
      removeClasses(markers[i], constMaps.markerActiveClass);
    }


    /**
     * Add active class to marker
     */
    let activeMarker = document.getElementById(`marker-${i}`);
    addClasses(activeMarker, constMaps.markerActiveClass);
  });
}
