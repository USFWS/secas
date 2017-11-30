require('es6-promise').polyfill();
const axios = require('axios');
const parallel = require('async/parallel');
const includes = require('array-includes');
const formatDate = require('format-date');

const url =
  'https://cors-anywhere.herokuapp.com/https://www.fws.gov/southeast/articles/index.js';
const list = document.querySelector('.newsroom-list');

const filterSecasContent = res =>
  res.data.filter(
    article =>
      article.tags &&
      includes(article.tags, 'Southeast Conservation Adaptation Strategy')
  );

const normalizeDate = date => {
  if (date.length < 9) date.replace('T00:00:00Z', '');
  return formatDate('{month}/{day}/{year}', new Date(date));
};

const displaySecasContent = articles => {
  list.innerHTML = articles
    .map(article => {
      const date = normalizeDate(article.date);
      return `<li>${date}: <a href="${article.uri}" target="_blank">${
        article.title
      }</a></li>`;
    })
    .join('');
};

const displayError = err => {
  console.error(err);
  // if (err.response) {
  //   list.innerHTML = `<li>We're sorry but an error occurred. <a href="https://www.fws.gov/southeast/tags/secas" target="_blank">You can check out SECAS related stories on fws.gov/southeast</a>.<br><br> Error code: <em>${err
  //     .response.status} ${err.response.statusText}</em>.</li>`;
  // } else {
  //   list.innerHTML = `<li>We're sorry but an error occurred. <a href="https://www.fws.gov/southeast/tags/secas" target="_blank">You can check out SECAS related stories on fws.gov/southeast</a>.</li>`;
  // }
};

const normalizeStories = stories => {
  return stories.data.map(s => {
    return {
      date: s.date,
      summary: s.teaser,
      title: s.title,
      uri: s.uri,
      img: s.photo
    };
  });
};

const sortChronologically = (a, b) => new Date(b.date) - new Date(a.date);

// Download SECAS stories from fws.gov/southeast AND from spreadsheet in parallel
parallel(
  [
    cb => {
      axios
        .get(url)
        .then(filterSecasContent)
        .then(articles => cb(null, articles))
        .catch(displayError);
    },
    cb => {
      axios
        .get('./data/bloggable.js')
        .then(res => res.data)
        .then(normalizeStories)
        .then(articles => cb(null, articles))
        .catch(displayError);
    }
  ],
  function(err, results) {
    if (err) console.error(err);
    const stories = [].concat.apply([], results);
    displaySecasContent(stories.sort(sortChronologically));
  }
);
