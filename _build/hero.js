(function () {
  'use strict';
  var sharp = require('sharp');
  var mkdirp = require('mkdirp');
  var fs = require('fs');

  var input = '_src/images/hero/';
  var output = 'images/hero/';
  var images = fs.readdirSync(input);

  // If there's a DS Store item, remove it
  var i = images.indexOf('.DS_Store');
  if (i > -1) images.splice(i,1);

  // Ensure the output dir exists
  mkdirp(output, function(err) {
    if (err) console.error(err);

    images.forEach(function (name) {
      var img = sharp(input + name);
      img
        .resize(1400)
        .toFile(output + name);
    });
  });

  function jpegmin(buffer, name) {
    new Imagemin()
      .src(buffer)
      .dest(output)
      .use(Imagemin.jpegtran({ progressive: true }))
      .use(rename(name))
      .run();
  }

})();
