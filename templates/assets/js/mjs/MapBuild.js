/**
 * Create Mapbox map
 * @param  {Array} data
 * @return {Function}
 */
import {mapConfig} from '../config.js';
import removeClasses from './utils/ClassRemove.js';
import addClasses from './utils/ClassAdd.js';
import {constMaps} from './Constants.js';
import createList from './MapCreateList.js';
import createMarkers from './MapCreateMarkers.js';

export default function(data) {

  mapboxgl.accessToken = mapConfig.mapboxToken;

  let map = new mapboxgl.Map({
    container: 'map',
    style: mapConfig.mapboxStyleUrl || null,
    center: [10.000000, 53.550000],
    zoom: 12,
    scrollZoom: false,
    pitch: 80, // pitch in degrees
  });

  map.addControl(new mapboxgl.NavigationControl());

  /**
   * Load map
   */
  createList(data, map);


  /**
   * Build markers
   */
  createMarkers(data, map);
}
