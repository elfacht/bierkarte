/**
 * Create list
 *
 * @param  {Array} data
 * @return {Function}
 */
const Mustache = require('../vendor/mustache.js');

import removeClasses from './utils/ClassRemove.js';
import addClasses from './utils/ClassAdd.js';
import {constMaps} from './Constants.js';
import flyToVenue from './MapFlyToVenue.js';
import createPopUp from './MapCreatePopUp.js';
import eventList from './MapEventList.js';

export default function(data, map) {

  /**
   * Display current city in title bar
   */
  // let title = document.querySelector('[data-map-city]');
  // title.innerHTML = data.city.name;

  /**
   * Remove loading spinner
   */
  let spinner = document.querySelector('[data-loader]');
  if (spinner) {
    spinner.parentNode.removeChild(spinner);
  }



  /**
   * Loop through the data
   */
  for (let i = 0; i < data.features.length; i++) {
    let currentFeature = data.features[i];
    let prop = currentFeature.properties;
    let listings = document.getElementById('listings');

    /**
     * Build data structure for Mustach template
     * @type {Object}
     */
    let tmplData = {
      'id': `listing-${i}`,
      'linkPosition': i,
      'title': prop.title,
      'address': prop.address,
      'icon': prop.category ? prop.category.slug : null,
      'iconTitle': prop.category ? prop.category.title : null,
      'beersTap': prop.beersTap || '',
      'beersBottle': prop.beersBottle || '',
      'googleAddress': `https://maps.google.com/?q=${prop.googleAddress}`,
      'websiteUrl': prop.website,
      'websiteNiceUrl': prop.website.replace(/(^\w+:|^)\/\//, '')
    };


    /**
     * Append Mustache template to list
     */
    let template = document.getElementById('tmpl_map_list').innerHTML;
    let content = Mustache.to_html(template, tmplData);
    listings.insertAdjacentHTML('beforeend', content);


    /**
     * Link event listener
     */
    let link = listings.querySelector(`[data-position="${i}"]`);
    eventList(link, data, i, map);

    let links = listings.querySelectorAll('a');
    for (let k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }

}
