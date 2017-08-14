const fs = require('fs');
const Parser = require('babyparse');

const input = './data/bloggable.csv';
const output = input.replace('csv', 'js');

const parsed = Parser.parseFiles(input, { header: true });

fs.writeFile(output, JSON.stringify(parsed.data), 'utf8', (err) => {
  if (err) throw err;
});
