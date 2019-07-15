/**
 * Create Mapbox marker popup
 *
 * @param  {Array} currentFeature
 * @return {Function}
 */
// const mapboxgl = require('../vendor/mapbox-gl.js');

import removeClasses from './utils/ClassRemove.js';
import addClasses from './utils/ClassAdd.js';
import {constMaps} from './Constants.js';

export default function(currentFeature, map) {
  let popUps = document.getElementsByClassName('mapboxgl-popup');
  popUps[0] ? popUps[0].remove() : null;


  /**
   * Tap list
   */
  let contentTap = currentFeature.properties.beersTap ?
    `<div class="m-mapitem__content" title="Bier vom Fass">
      <svg class="c-icon"><use xlink:href="#svg_icon-taps"></svg>
      ${currentFeature.properties.beersTap}
    </div>`
    : '';


  /**
   * Botle list
   * @type {[type]}
   */
  let contentBottles = currentFeature.properties.beersBottle ?
    `<div class="m-mapitem__content" title="Flaschenbiere">
      <svg class="c-icon"><use xlink:href="#svg_icon-bottles"></svg>
      ${currentFeature.properties.beersBottle}
    </div>`
    : '';


  /**
   * Build the poptup
   */
  let popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
          `<h3 class="m-marker__heading">${currentFeature.properties.title}</h3>
          <div class="m-marker__meta">${currentFeature.properties.address}</div>
          ${contentTap}
          ${contentBottles}`
        )
        .addTo(map);
}
