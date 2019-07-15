/**
 * Get JSON daa by Craft Element API
 * and create Mapbox data array.
 *
 */
import {mapConfig} from '../config.js';
import createMap from './MapBuild.js';

export default function($el) {

  /**
   * Make AJAX call
   * @type {XMLHttpRequest}
   */
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = ajaxDone;
  httpRequest.open('GET', mapConfig.apiUrl);
  httpRequest.send();


  /**
   * TEMPORARY STATIC!
   *
   */
  let currentCity = 'hamburg';


  /**
   * Create Mapbox marker array
   * @type {Object}
   */
  let geoData = {
    'type': 'Feature',
    'city': {
      'slug': currentCity,
      'name': 'Hamburg'
    },
    'features': []
  };


  /**
   * Ajax call is done
   * @return {Callback}
   */
  function ajaxDone() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        /**
         * Define JSON data format
         * @type {Object}
         */
        let response = JSON.parse(httpRequest.responseText);
        let items = response.data;


        /**
         * Loop through response
         */
        for (let i = 0; i < items.length; i++) {
          if (items[i].city.slug === currentCity) {
            const street = items[i].googlePlace.route || '';
            const streetNo = items[i].googlePlace.street_number || '';
            const zipCode = items[i].googlePlace.postcode || '';
            const city = items[i].googlePlace.city || '';


            /**
             * Push data to array
             */
            geoData.features.push({
              'geometry': {
                'type': 'Point',
                'coordinates': [
                  parseFloat(items[i].lng),
                  parseFloat(items[i].lat)
                ]
              },
              'properties': {
                'title': items[i].title,
                'address': street + ' ' + streetNo + ', ' + zipCode + ' ' + city,
                'googleAddress': items[i].googlePlaceAddress,
                'beersBottle': items[i].beersBottle || '',
                'beersTap': items[i].beersTap || '',
                'category': items[i].category || '',
                'website': items[i].website || '',
              }
            });
          }
        }


        /**
         * Call build function
         * @param  {Array} geoData
         */
        createMap(geoData);
      }
    }
  }
}
