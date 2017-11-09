const fs = require('fs');
const Parser = require('babyparse');

const input = './data/bloggable.csv';
const output = input.replace('csv', 'js');

const parsed = Parser.parseFiles(input, { header: true });
const data = JSON.stringify(parsed);

const errorHandler = err => {
  if (err) throw err;
};

const writeFile = (filepath, data) => {
  fs.writeFile(filepath, data, 'utf8', errorHandler);
};

writeFile(output, data);
