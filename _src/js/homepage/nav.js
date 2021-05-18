
const lunr = require('lunr');
const xhr = require('xhr');

const _ = require('./util');

const results = require('./templates/result');
const noResults = require('./templates/no-results');

const templates = {
  results,
  noResults,
};

const defaults = {
  active: false,
  activeClass: 'active',
  minLength: 3,
};

let options;
let index;


function registerHandlers() {
  options.searchButton.addEventListener('click', toggleSearch);
  options.searchInput.addEventListener('keyup', searchIndex);
  options.form.addEventListener('submit', formSubmit);
  document.body.addEventListener('keyup', keyupHandler);
}

function destroy() {
  options.searchButton.removeEventListener('click', toggleSearch);
  options.searchInput.addEventListener('keyup', searchIndex);
  options.form.addEventListener('submit', formSubmit);
  document.body.removeEventListener('keyup', keyupHandler);
}

function downloadIndex() {
  xhr.get('/search.json', (err, res) => {
    if (err) console.error('Could not download search index. :( ');
    options.data = JSON.parse(res.body);
    createIndex();
  });
}

function createIndex() {
  index = lunr(function () {
    this.field('id');
    this.field('author');
    this.field('title', { boost: 10 });
    this.field('description', { boost: 3 });
  });

  _.each(options.data, (page, i) => {
    index.add({
      id: i,
      title: page.title,
      description: page.description,
      author: page.author
    });
  });
}

function searchIndex(e) {
  e.preventDefault();
  let searchResults = [];
  const term = options.searchInput.value;
  if (term.length === 0) options.results.innerHTML = '';
  if (term.length < options.minLength) return;
  _.each(index.search(term), (result) => {
    searchResults.push(options.data[result.ref]);
  });
  searchResults = searchResults.filter(result => result.title !== '');
  renderResults(searchResults);
}

function renderResults(results) {
  if (results.length === 0) { options.results.innerHTML = templates.noResults(); } else { options.results.innerHTML = templates.results(results); }
}

function formSubmit(e) {
  e.preventDefault();
  return false;
}

function toggleSearch(e) {
  e.preventDefault();
  options.active ? hide() : show(); // eslint ignore:line
}

function keyupHandler(e) {
  if (options.active && e.keyCode === 27) hide();
}

function show() {
  options.form.classList.add(options.activeClass);
  options.searchInput.focus();
  options.active = true;
}

function hide() {
  options.form.classList.remove(options.activeClass);
  options.active = false;
}

function init(opts) {
  options = _.defaults({}, opts, defaults);
  registerHandlers();
  downloadIndex();
}

module.exports.init = init;
module.exports.destroy = destroy;
