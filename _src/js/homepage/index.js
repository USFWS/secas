(function () {
  'use strict';

  var nav = require('./nav');
  var hero = require('./hero');
  var Parallax = require('parallax-scroll');

  var parallax = new Parallax('.parallax', {
    speed: 0.4
  });
  parallax.animate();

  hero.init();

  nav.init({
    searchButton: document.getElementById('search-button'),
    form: document.querySelector('.search-form'),
    searchInput: document.getElementById('search-input'),
    results: document.querySelector('.search-results')
  });

})();
