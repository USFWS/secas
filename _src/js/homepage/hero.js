(function () {
  'use strict';

  var _ = require('./util');
  var images = require('./images');
  var baseurl = document.body.getAttribute('data-root');

  function init () {
    var caption = document.querySelector('.hero-image-caption');
    var header =  document.querySelector('.main-header');
    var hero = document.querySelector('.hero-image');
    var img = _.random(images);
    caption.innerHTML = img.caption;
    hero.setAttribute('style', 'background-image: url(' + baseurl + img.src + ');');
    _.addClass(header, img.headerClass);
  }

  module.exports.init = init;

})();
