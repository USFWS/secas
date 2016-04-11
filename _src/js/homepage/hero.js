(function () {
  'use strict';

  var _ = require('./util');

  var images = [
    {
      src: './images/hero/black-rock-mountain-state-park-in-georgia-matthew-cimitile.jpg',
      headerClass: 'dark-text',
      caption: 'Black Rock Mountain State Park, Georgia. Photo: Matthew Cimitile'
    },
    {
      src: './images/hero/big-lake-national-wildlife-refuge-bottomland-hardwoods.jpg',
      headerClass: 'light-text',
      caption: 'Big Lake National Wildlife Refuge. Photo: USFWS'
    },
    {
      src: './images/hero/canoeing-alligator-river-nationa-wildlife-refuge.jpg',
      headerClass: 'light-text',
      caption: 'Alligator River National Wildlife Refuge. Photo: Steve Hillerbrand, USFWS'
    },
    {
      src: './images/hero/cascades-falls.jpg',
      headerClass: 'light-text',
      caption: 'Cascades falls, Virginia. Photo: Matthew Cimitile'
    },
    {
      src: './images/hero/gulf-side-lower-suwanee-national-wildlife-refuge.jpg',
      headerClass: 'light-text',
      caption: 'Lower Suwanee National Wildlife Refuge. Photo: George Willson'
    },
    {
      src: './images/hero/salt-marsh-st-simons-island.jpg',
      headerClass: 'light-text',
      caption: 'Salt marsh at St. Simons Island, Georgia. Photo: USFWS'
    },
    {
      src: './images/hero/slash-pine-flatwoods-saw-palmetto-osceola-national-forest.jpg',
      headerClass: 'light-text',
      caption: 'Slash pine flatwoods at Osceola National Forest. <a href="https://flic.kr/p/9LmmDb">Photo</a>: <a href="https://www.flickr.com/photos/79666107@N00/">Chris M Morris</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>'
    }
  ];

  function init () {
    var caption = document.querySelector('.hero-image-caption');
    var header =  document.querySelector('.main-header');
    var hero = document.querySelector('.hero-image');
    var img = _.random(images);
    caption.innerHTML = img.caption;
    hero.setAttribute('style', 'background-image: url(' + img.src + ');');
    _.addClass(header, img.headerClass);
  }

  module.exports.init = init;

})();
