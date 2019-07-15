/**
 * Fly to map position
 *
 * @param  {Array} currentFeature
 * @return {Function}
 */
import removeClasses from './utils/ClassRemove.js';
import addClasses from './utils/ClassAdd.js';
import {constMaps} from './Constants.js';

export default function(currentFeature, map) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}
