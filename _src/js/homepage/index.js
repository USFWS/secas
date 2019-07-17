const Parallax = require('parallax-scroll');

const nav = require('./nav');
const hero = require('./hero');
const granicus = require('./granicus');

const form = document.querySelector('.subscriber-form');
const email = document.querySelector('#email');
const error = document.querySelector('.error-message');

const parallax = new Parallax('.parallax', { speed: 0.4 });
parallax.animate();

hero.init();

nav.init({
  searchButton: document.querySelector('.search-button'),
  form: document.querySelector('.search-form'),
  searchInput: document.getElementById('search-input'),
  results: document.querySelector('.search-results'),
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.setAttribute('disabled', true);

  if (granicus.validate(email.value)) {
    granicus.subscribe(email.value)
      .then((res) => {
        console.log(res);
        form.removeAttribute('disabled');
        form.classList.add('success');
      });
  } else {
    granicus.displayMessage('You must enter a valid email address', error);
  }
});
