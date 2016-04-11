(function () {
  'use strict';

  var FEEDS = [
    'http://peninsularfloridalcc.org/profiles/blog/feed?xn_auth=no',
    'http://gulfcoastprairielcc.org/rss',
    'http://gcpolcc.org/profiles/blogs/feed/all',
    'http://northatlanticlcc.org/feeds/news/RSS',
    'http://applcc.org/news/news-aggregator/RSS'
  ];

  var FeedParser = require('feedparser');
  var request = require('request');

  var feedparser = new FeedParser();

  var template = require('./templates/nalcc.jade');

  var output = document.querySelector('.rss-list');
  var loader = document.querySelector('.loading');

  var req = request('https://crossorigin.me/http://northatlanticlcc.org/feeds/latest/RSS');

  req.on('error', function (error) {
    // The request failed... Show feedback in the DOM
    showError('Could not download the latest data from the RSS feed. :(');
    console.error(error);
  });

  req.on('response', function (res) {
    var stream = this;
    remove(loader);
    if (res.statusCode != 200)
      showError('Could not download the latest data from the RSS feed. Status Code: ' + res.statusCode );
    stream.pipe(feedparser);
  });

  feedparser.on('error', function (error) {
    // Failed to parse the response... Show feedback in the DOM
    showError('Could not parse the RSS feed. :(');
    console.log(error);
  });

  feedparser.on('readable', function () {
    var stream = this,
        meta = this.meta,
        item;

    while ( item = stream.read() ) {
      appendItem(item);
    }
  });

  function appendItem(item) {
    output.innerHTML += template({ article: item });
  }

  function remove(el) {
    el.parentNode.removeChild(el);
  }

  function showError(message) {
    var li = document.createElement('li');
    li.innerHTML = message;
    output.appendChild(li);
  }

})();
