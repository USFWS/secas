const _ = require('./util');
const images = require('./images');

const baseurl = document.body.getAttribute('data-root');

function init() {
  const caption = document.querySelector('.hero-image-caption');
  const header = document.querySelector('.main-header');
  const hero = document.querySelector('.hero-image');
  const img = _.random(images);
  caption.innerHTML = img.caption;
  hero.setAttribute('style', `background-image: url(${baseurl + img.src});`);
  header.classList.add(img.headerClass);
}

module.exports.init = init;
