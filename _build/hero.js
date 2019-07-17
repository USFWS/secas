
const sharp = require('sharp');
const mkdirp = require('mkdirp');
const fs = require('fs');

const input = '_src/images/hero/';
const output = 'images/hero/';
const images = fs.readdirSync(input);

// If there's a DS Store item, remove it
const i = images.indexOf('.DS_Store');
if (i > -1) images.splice(i, 1);

// Ensure the output dir exists
mkdirp(output, (err) => {
  if (err) console.error(err);

  images.forEach((name) => {
    const img = sharp(input + name);
    img
      .resize(1400)
      .toFile(output + name);
  });
});
