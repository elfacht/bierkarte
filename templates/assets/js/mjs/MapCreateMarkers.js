/**
 * Create Mapbox map
 * @param  {Array} data
 * @return {Function}
 */
// const mapboxgl = require('../vendor/mapbox-gl.js');

import removeClasses from './utils/ClassRemove.js';
import addClasses from './utils/ClassAdd.js';
import {constMaps} from './Constants.js';
// import {map} from './Map.js';
import flyToVenue from './MapFlyToVenue.js';
import createPopUp from './MapCreatePopUp.js';
import eventMarker from './MapEventMarker.js';

export default function(data, map) {
  /**
   * Create markers of JSON data
   */
  let geojson = data;
  geojson.features.forEach((marker, i) => {

    /**
     * Create a HTML element for each feature
     */
    let el = document.createElement('div');
    el.id = `marker-${i}`;
    el.className = 'm-marker';

    el.addEventListener('click', () => {
      let markers = document.querySelectorAll(constMaps.marker);

      for (let k = 0; k < markers.length; k++) {
        removeClasses(markers[k], constMaps.markerActiveClass);
      }

      addClasses(el, constMaps.markerActiveClass);
    });


    /**
     * Make a marker for each feature and add to the map
     */
    new mapboxgl.Marker(el, {offset: [0, 16]})
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    eventMarker(el, marker, i, map);
  });

}
