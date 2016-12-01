(function () {
  'use strict';

  var lunr = require('lunr');
  var xhr = require('xhr');

  var _ = require('./util');
  var templates = {
    results: require('./templates/result.jade'),
    noResults: require('./templates/no-results.jade')
  };

  var defaults = {
    active: false,
    activeClass: 'active',
    minLength: 3
  };

  var options, index;

  function init (opts) {
    options = _.defaults({}, opts, defaults);
    registerHandlers();
    downloadIndex();
  }

  function registerHandlers () {
    options.searchButton.addEventListener('click', toggleSearch);
    options.searchInput.addEventListener('keyup', searchIndex);
    options.form.addEventListener('submit', formSubmit);
    document.body.addEventListener('keyup', keyupHandler);
  }

  function destroy () {
    options.searchButton.removeEventListener('click', toggleSearch);
    options.searchInput.addEventListener('keyup', searchIndex);
    options.form.addEventListener('submit', formSubmit);
    document.body.removeEventListener('keyup', keyupHandler);
  }

  function downloadIndex() {
    xhr.get('/search.json', function (err, res) {
      if (err) console.error('Could not download search index. :( ');
      options.data = JSON.parse(res.body);
      createIndex();
    });
  }

  function createIndex () {
    index = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('description', { boost: 3 });
    });

    _.each(options.data, function (page, i) {
      index.add({
        id: i,
        title: page.title,
        description: page.description,
        tags: page.tags
      });
    });
  }

  function searchIndex (e) {
    e.preventDefault();
    var searchResults = [];
    var term = options.searchInput.value;
    if (term.length === 0 ) options.results.innerHTML = '';
    if (term.length < options.minLength) return;
    _.each(index.search(term), function (result) {
      searchResults.push(options.data[result.ref]);
    });
    searchResults = _.filter(searchResults, function(result) {
      return result.title !== '';
    });
    renderResults(searchResults);
  }

  function renderResults (results) {
    if (results.length === 0)
      options.results.innerHTML = templates.noResults();
    else
      options.results.innerHTML = templates.results({ results: results });
  }

  function formSubmit (e) {
    e.preventDefault();
    return false;
  }

  function toggleSearch (e) {
    e.preventDefault();
    options.active ? hide() : show(); // jshint ignore:line
  }

  function keyupHandler (e) {
    if (options.active && e.keyCode === 27) hide();
  }

  function show () {
    _.addClass(options.form, options.activeClass);
    options.searchInput.focus();
    options.active = true;

  }

  function hide () {
    _.removeClass(options.form, options.activeClass);
    options.active = false;
  }

  module.exports.init = init;
  module.exports.destroy = destroy;
})();
