const Parallax = require('parallax-scroll');

const nav = require('./nav');
const hero = require('./hero');

const parallax = new Parallax('.parallax', { speed: 0.4 });
parallax.animate();

hero.init();

nav.init({
  searchButton: document.querySelector('.search-button'),
  form: document.querySelector('.search-form'),
  searchInput: document.getElementById('search-input'),
  results: document.querySelector('.search-results'),
});
