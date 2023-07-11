# Southeast Conservation Adaptation Strategy (SECAS)

This repository houses the source code for [secassoutheast.org](https://secassoutheast.org). [Roy Hewitt](mailto:roy_hewitt@fws.gov?subject=SECAS+website) is the web master.

## About SECAS

The dramatic changes sweeping the Southeastern United States — such as urbanization, competition for water resources, extreme weather events, sea-level rise, and climate change — pose unprecedented challenges for sustaining our natural and cultural resources. However, they also offer a clear opportunity to unite the conservation community around a shared, long-term vision for the future. The Southeast Conservation Adaptation Strategy (SECAS) is that vision. Through SECAS, diverse partners are working together to design and achieve a connected network of lands and waters that supports thriving fish and wildlife populations and improved quality of life for people across the southeastern United States and Caribbean. Together, federal, state, non-profit and private organizations are coordinating their conservation actions and investments to focus on common goals.

Learn more at [secassoutheast.org/about](https://secassoutheast.org/about).

## Installing Dependencies

This project uses [Ruby](https://www.ruby-lang.org/en/) and [NodeJS](https://nodejs.org/en/).  You must first install both before you can get started.  The website itself is build with [Jekyll](https://jekyllrb.com) version 3.2.1, a static site generator written in Ruby and is hosted on [GitHub Pages](https://pages.github.com/).  You can install `Jekyll` and it's dependencies once you have Ruby installed with `gem install Jekyll`.

We use NodeJS to resize and optimize hero images, and to bundle the JavaScript used on the site into a single file.  Once you have Node installed and are in the root directory of the project run `npm install`, or `npm i`.  To process hero images run `npm run hero` from the root directory. If you would like to add additional hero images they should be stored in `_src/images/hero`, and an object describing the hero image should be added to `_src/js/homepage/images.js` so it can be randomly chosen and injected into a page each time a new page is loaded.

The JavaScript that runs on every page injects a random hero image, and handles site-wide search.  This project-within-a-project is stored in `_src/js/homepage`.  Move into that directory from the project root with `cd _src/js/homepage` then install dependencies with `npm i`.  To work on the site-wide JavaScript in development mode you can run `npm run watch`.  To create a production-ready build of the JavaScript run `npm run build`.  See `_src/js/homepage/package.json` for more details.

## Run a Development Server

To run a local development server open up a terminal and run either `npm start` or `jekyll serve --config _config.yml,_config-dev.yml -w`.

## License

With the exception of photos on this website all source code and content is available under a CCO 1.0 license.  Please see individual photo credits for licensing information.

### CC0 1.0 Universal Summary

This is a human-readable summary of the [Legal Code (read the full text)](https://creativecommons.org/publicdomain/zero/1.0/legalcode).

### No Copyright

The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.

### Other Information

In no way are the patent or trademark rights of any person affected by CC0, nor are the rights that other persons may have in the work or in how the work is used, such as publicity or privacy rights.

Unless expressly stated otherwise, the person who associated a work with this deed makes no warranties about the work, and disclaims liability for all uses of the work, to the fullest extent permitted by applicable law. When using or citing the work, you should not imply endorsement by the author or the affirmer.
