(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _ = require('./util');

var images = require('./images');

var baseurl = document.body.getAttribute('data-root');

function init() {
  var caption = document.querySelector('.hero-image-caption');
  var header = document.querySelector('.main-header');
  var hero = document.querySelector('.hero-image');

  var img = _.random(images);

  caption.innerHTML = img.caption;
  hero.setAttribute('style', "background-image: url(".concat(baseurl + img.src, ");"));
  header.classList.add(img.headerClass);
}

module.exports.init = init;

},{"./images":2,"./util":70}],2:[function(require,module,exports){
"use strict";

module.exports = [{
  src: '/images/hero/great-smokies-mountain-skyline.jpg',
  headerClass: 'dark-text',
  caption: '<a href="https://flic.kr/p/RfZUfE" target="_blank">Great Smoky Mountains National Park</a>, Tennessee. Photo by <a href="https://www.flickr.com/photos/25171569@N02/">jjjj56cp</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/">CC BY-NC-SA 2.0</a>.'
}, {
  src: '/images/hero/big-lake-national-wildlife-refuge-bottomland-hardwoods.jpg',
  headerClass: 'light-text',
  caption: 'Cypress trees at <a href="http://www.fws.gov/biglake/" target="_blank">Big Lake National Wildlife Refuge</a>. Photo by Jeremy Bennett, USFWS.'
}, {
  src: '/images/hero/canoeing-alligator-river-nationa-wildlife-refuge.jpg',
  headerClass: 'light-text',
  caption: '<a href="http://www.fws.gov/refuge/alligator_river/" target="_blank">Alligator River National Wildlife Refuge</a>. Photo by Steve Hillebrand, USFWS.'
}, {
  src: '/images/hero/big-laurel-branch-falls-nantahala-national-forest-north-carolina.jpg',
  headerClass: 'light-text',
  caption: '<a href="https://flic.kr/p/r1Wk6B" target="_blank">Big Laurel Branch Falls, Nantahala National Forest</a>, North Carolina. Photo by Jeff Moore, <a href="https://creativecommons.org/licenses/by-nc/2.0/">CC BY-NC 2.0</a>.'
}, {
  src: '/images/hero/gulf-side-lower-suwanee-national-wildlife-refuge.jpg',
  headerClass: 'light-text',
  caption: '<a href="http://www.fws.gov/refuge/lower_suwannee/" target="_blank">Lower Suwanee National Wildlife Refuge</a>. Photo by George Willson.'
}, {
  src: '/images/hero/salt-marsh-st-simons-island.jpg',
  headerClass: 'light-text',
  caption: 'Salt marsh in a tidal river estuary at Ebo Landing on St. Simons Island, Georgia. Photo by George Gentry, USFWS.'
}, {
  src: '/images/hero/longleaf-pine-at-carolina-sandhills-national-wildlife-refuge.jpg',
  headerClass: 'light-text',
  caption: 'Longleaf pine at <a href="https://www.fws.gov/refuge/Carolina_Sandhills/">Carolina Sandhills National Wildlife Refuge</a>, South Carolina. <a href="https://flic.kr/p/c4cwFj">Photo</a> by Jack Culpepper, USFWS.'
}, {
  src: '/images/hero/cherokee-prairie.jpg',
  headerClass: 'light-text',
  caption: 'Cherokee Prairie Natural Area, Arkansas River Valley. <a href="https://www.segrasslands.org/arkansas-valley-grasslands">Photo</a> by William Dark Photography, used by permission of Southeastern Grasslands Initiative.'
}, {
  src: '/images/hero/laguna-cartagena.jpg',
  headerClass: 'light-text',
  caption: '<a href="https://flic.kr/p/CemsUh" target="_blank">Laguna Cartagena National Wildlife Refuge</a>, Puerto Rico. Photo by M. Morel, UFSWS.'
}, {
  src: '/images/hero/virginia-creeper-trail.jpg',
  headerClass: 'light-text',
  caption: 'Virginia Creeper Trail, Virginia. <a href="https://flic.kr/p/ha1wb5">Photo</a> by <a href="https://flickr.com/photos/27864969@N00/">Stephen Taylor</a>, <a href="https://creativecommons.org/licenses/by-nc/2.0/">CC BY-NC 2.0</a>'
}, {
  src: '/images/hero/cape-lookout-lighthouse.jpg',
  headerClass: 'dark-text',
  caption: '<a href="https://flic.kr/p/aiCPu1" target="_blank">Cape Lookout lighthouse and sea oats</a>, North Carolina. Photo by Zach Frailey, <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">CC BY-NC-ND 2.0</a>.'
}, {
  src: '/images/hero/grays-reef.jpg',
  headerClass: 'light-text',
  caption: 'Diving at Gray’s Reef National Marine Sanctuary, Savannah, Georgia. <a href="https://flic.kr/p/HqZMnT">Photo</a> by Greg McFall, NOAA.'
}];

},{}],3:[function(require,module,exports){
"use strict";

var Parallax = require('parallax-scroll');

var nav = require('./nav');

var hero = require('./hero');

var parallax = new Parallax('.parallax', {
  speed: 0.4
});
parallax.animate();
hero.init();
nav.init({
  searchButton: document.querySelector('.search-button'),
  form: document.querySelector('.search-form'),
  searchInput: document.getElementById('search-input'),
  results: document.querySelector('.search-results')
});

},{"./hero":1,"./nav":4,"parallax-scroll":29}],4:[function(require,module,exports){
"use strict";

var lunr = require('lunr');

var xhr = require('xhr');

var _ = require('./util');

var results = require('./templates/result');

var noResults = require('./templates/no-results');

var templates = {
  results: results,
  noResults: noResults
};
var defaults = {
  active: false,
  activeClass: 'active',
  minLength: 3
};
var options;
var index;

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
  xhr.get('/search.json', function (err, res) {
    if (err) console.error('Could not download search index. :( ');
    options.data = JSON.parse(res.body);
    createIndex();
  });
}

function createIndex() {
  index = lunr(function () {
    this.field('id');
    this.field('author');
    this.field('title', {
      boost: 10
    });
    this.field('description', {
      boost: 3
    });
  });

  _.each(options.data, function (page, i) {
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
  var searchResults = [];
  var term = options.searchInput.value;
  if (term.length === 0) options.results.innerHTML = '';
  if (term.length < options.minLength) return;

  _.each(index.search(term), function (result) {
    searchResults.push(options.data[result.ref]);
  });

  searchResults = searchResults.filter(function (result) {
    return result.title !== '';
  });
  renderResults(searchResults);
}

function renderResults(results) {
  if (results.length === 0) {
    options.results.innerHTML = templates.noResults();
  } else {
    options.results.innerHTML = templates.results(results);
  }
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

},{"./templates/no-results":68,"./templates/result":69,"./util":70,"lunr":25,"xhr":66}],5:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":27}],6:[function(require,module,exports){
'use strict';

/* globals
	Set,
	Map,
	WeakSet,
	WeakMap,

	Promise,

	Symbol,
	Proxy,

	Atomics,
	SharedArrayBuffer,

	ArrayBuffer,
	DataView,
	Uint8Array,
	Float32Array,
	Float64Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8ClampedArray,
	Uint16Array,
	Uint32Array,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new TypeError(); };

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': TypeError,
	'$ %TypeErrorPrototype%': TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}
	return INTRINSICS[key];
};

},{}],7:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');

var assertRecord = require('./helpers/assertRecord');
var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

},{"./GetIntrinsic":6,"./helpers/assertRecord":8,"./helpers/isFinite":9,"./helpers/isNaN":10,"./helpers/mod":11,"./helpers/sign":12,"es-to-primitive/es5":13,"has":19,"is-callable":20}],8:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
  // https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
  'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
    if (ES.Type(Desc) !== 'Object') {
      return false;
    }
    var allowed = {
      '[[Configurable]]': true,
      '[[Enumerable]]': true,
      '[[Get]]': true,
      '[[Set]]': true,
      '[[Value]]': true,
      '[[Writable]]': true
    };

    for (var key in Desc) { // eslint-disable-line
      if (has(Desc, key) && !allowed[key]) {
        return false;
      }
    }

    var isData = has(Desc, '[[Value]]');
    var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
    if (isData && IsAccessor) {
      throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
    }
    return true;
  }
};

module.exports = function assertRecord(ES, recordType, argumentName, value) {
  var predicate = predicates[recordType];
  if (typeof predicate !== 'function') {
    throw new $SyntaxError('unknown record type: ' + recordType);
  }
  if (!predicate(ES, value)) {
    throw new $TypeError(argumentName + ' must be a ' + recordType);
  }
  console.log(predicate(ES, value), value);
};

},{"../GetIntrinsic":6,"has":19}],9:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],10:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],11:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],12:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],13:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":14,"is-callable":20}],14:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],15:[function(require,module,exports){
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":20}],16:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],17:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":16}],18:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":17}],20:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],21:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],22:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, assignInDefaults);
  return apply(assignInWith, undefined, args);
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = defaults;

},{}],23:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, typeof iteratee == 'function' ? iteratee : identity);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = forEach;

},{}],24:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeKeys = overArg(Object.keys, Object),
    nativeRandom = Math.random;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(lower, upper) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Gets a random element from `collection`.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(collection) {
  var array = isArrayLike(collection) ? collection : values(collection),
      length = array.length;

  return length > 0 ? array[baseRandom(0, length - 1)] : undefined;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = sample;

},{}],25:[function(require,module,exports){
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.2
 * Copyright (C) 2016 Oliver Nightingale
 * @license MIT
 */

;(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "0.7.2"
/*!
 * lunr.utils
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf Utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
}
/*!
 * lunr.EventEmitter
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} fn The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} fn The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @see lunr.tokenizer.separator
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return lunr.utils.asString(t).toLowerCase() })

  // TODO: This exists so that the deprecated property lunr.tokenizer.seperator can still be used. By
  // default it is set to false and so the correctly spelt lunr.tokenizer.separator is used unless
  // the user is using the old property to customise the tokenizer.
  //
  // This should be removed when version 1.0.0 is released.
  var separator = lunr.tokenizer.seperator || lunr.tokenizer.separator

  return obj.toString().trim().toLowerCase().split(separator)
}

/**
 * This property is legacy alias for lunr.tokenizer.separator to maintain backwards compatability.
 * When introduced the token was spelt incorrectly. It will remain until 1.0.0 when it will be removed,
 * all code should use the correctly spelt lunr.tokenizer.separator property instead.
 *
 * @static
 * @see lunr.tokenizer.separator
 * @deprecated since 0.7.2 will be removed in 1.0.0
 * @private
 * @see lunr.tokenizer
 */
lunr.tokenizer.seperator = false

/**
 * The sperator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/

/**
 * Loads a previously serialised tokenizer.
 *
 * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
 * If the serialised tokenizer has not been registered then an error will be thrown.
 *
 * @param {String} label The label of the serialised tokenizer.
 * @returns {Function}
 * @memberOf tokenizer
 */
lunr.tokenizer.load = function (label) {
  var fn = this.registeredFunctions[label]

  if (!fn) {
    throw new Error('Cannot load un-registered function: ' + label)
  }

  return fn
}

lunr.tokenizer.label = 'default'

lunr.tokenizer.registeredFunctions = {
  'default': lunr.tokenizer
}

/**
 * Register a tokenizer function.
 *
 * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
 *
 * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
 *
 * @param {Function} fn The function to register.
 * @param {String} label The label to register this function with
 * @memberOf tokenizer
 */
lunr.tokenizer.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing tokenizer: ' + label)
  }

  fn.label = label
  this.registeredFunctions[label] = fn
}
/*!
 * lunr.Pipeline
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0 || token === '') break
    };

    if (token !== void 0 && token !== '') out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  this._magnitude = undefined;
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  if (idx < list.idx) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  var i, element

  for (i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (~this.indexOf(element)) continue
    this.elements.splice(this.locationFor(element), 0, element)
  }

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem === elem) return pivot

    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem === elem) return pivot

  return -1
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem > elem) return pivot
  if (pivotElem < elem) return pivot + 1
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  for(var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++){
    unionSet.add(shortSetElements[i])
  }

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter
  this.tokenizerFn = lunr.tokenizer

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer))
  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * The value of ref can be of any type but it _must_ be stably comparable and
 * orderable.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Sets the tokenizer used for this index.
 *
 * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
 * should only be changed before adding documents to the index. Changing the tokenizer
 * without re-building the index can lead to unexpected results.
 *
 * @param {Function} fn The function to use as a tokenizer.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.tokenizer = function (fn) {
  var isRegistered = fn.label && (fn.label in lunr.tokenizer.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index')
  }

  this.tokenizerFn = fn
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]))

    docTokens[field.name] = fieldTokens

    for (var i = 0; i < fieldTokens.length; i++) {
      var token = fieldTokens[i]
      allDocumentTokens.add(token)
      this.corpusTokens.add(token)
    }
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = 0;

    for (var j = 0; j < this._fields.length; j++){
      var field = this._fields[j]
      var fieldTokens = docTokens[field.name]
      var fieldLength = fieldTokens.length

      if (!fieldLength) continue

      var tokenCount = 0
      for (var k = 0; k < fieldLength; k++){
        if (fieldTokens[k] === token){
          tokenCount++
        }
      }

      tf += (tokenCount / fieldLength * field.boost)
    }

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        // ensuring that the type of key is preserved
        var matchingDocuments = self.tokenStore.get(key),
            refs = Object.keys(matchingDocuments),
            refsLen = refs.length

        for (var i = 0; i < refsLen; i++) {
          set.add(matchingDocuments[refs[i]].ref)
        }

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    tokenizer: this.tokenizerFn.label,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  if (!this.has(id)) this.length++
  this.store[id] = tokens
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2016 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return porterStemmer;
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @module
 * @param {Array} token The token to pass through the filter
 * @returns {Function}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord
    return memo
  }, {})

  return function (token) {
    if (token && words[token] !== token) return token
  }
}

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
])

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.replace(/^\W+/, '').replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2016 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token.charAt(0),
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return false

    node = node[token.charAt(i)]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return {}

    node = node[token.charAt(i)]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token.charAt(i) in node)) return
    node = node[token.charAt(i)]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();

},{}],26:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":28}],27:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":26,"./isArguments":28}],28:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('core-js/modules/es6.object.assign');

require('core-js/modules/es6.array.from');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parallax = function () {
  function Parallax(selector, options) {
    _classCallCheck(this, Parallax);

    this.lastPosition = -1;

    // Establish default settings
    this.settings = Object.assign({
      speed: 0.2
    }, options);

    if (typeof selector === 'string') {
      this.elems = Array.from(document.querySelectorAll(selector));
    } else if (Array.isArray(selector)) {
      this.elems = selector;
    } else {
      this.elems = [selector];
    }
  }

  _createClass(Parallax, [{
    key: 'updatePosition',
    value: function updatePosition() {
      var _this = this;

      this.elems.forEach(function (elem) {
        var offset = elem.getBoundingClientRect().top + _this.lastPosition;
        var yPosition = Math.round((offset - _this.lastPosition) * _this.settings.speed);

        // Apply the y-axis transform
        elem.style.transform = 'translate3d(0, ' + yPosition * -1 + 'px, 0)'; // eslint-disable-line
      });
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this2 = this;

      // If the offset position hasn't changed, skip this frame
      if (this.lastPosition === window.pageYOffset) {
        window.requestAnimationFrame(function () {
          _this2.animate();
        });

        return false;
      }

      // Save the new offset position
      this.lastPosition = window.pageYOffset;

      this.updatePosition();

      return window.requestAnimationFrame(function () {
        _this2.animate();
      });
    }
  }]);

  return Parallax;
}();

exports.default = Parallax;
module.exports = exports['default'];

},{"core-js/modules/es6.array.from":59,"core-js/modules/es6.object.assign":60}],30:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],31:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":44}],32:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":33,"./$.wks":57}],33:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],34:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],35:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":30}],36:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],37:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":39}],38:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , hide      = require('./$.hide')
  , redefine  = require('./$.redefine')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)redefine(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":34,"./$.ctx":35,"./$.global":40,"./$.hide":41,"./$.redefine":51}],39:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],40:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],41:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":48,"./$.descriptors":37,"./$.property-desc":50}],42:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":33}],43:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":47,"./$.wks":57}],44:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],45:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":31}],46:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":57}],47:[function(require,module,exports){
module.exports = {};
},{}],48:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],49:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":48,"./$.fails":39,"./$.iobject":42,"./$.to-object":55}],50:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],51:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":34,"./$.global":40,"./$.hide":41,"./$.uid":56}],52:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":40}],53:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],54:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":53}],55:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":36}],56:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],57:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":40,"./$.shared":52,"./$.uid":56}],58:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":32,"./$.core":34,"./$.iterators":47,"./$.wks":57}],59:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":35,"./$.export":38,"./$.is-array-iter":43,"./$.iter-call":45,"./$.iter-detect":46,"./$.to-length":54,"./$.to-object":55,"./core.get-iterator-method":58}],60:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":38,"./$.object-assign":49}],61:[function(require,module,exports){
var trim = require('string.prototype.trim')
  , forEach = require('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}

},{"for-each":15,"string.prototype.trim":63}],62:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":7,"function-bind":17}],63:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":62,"./polyfill":64,"./shim":65,"define-properties":5,"function-bind":17}],64:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":62}],65:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":64,"define-properties":5}],66:[function(require,module,exports){
"use strict";
var window = require("global/window")
var isFunction = require("is-function")
var parseHeaders = require("parse-headers")
var xtend = require("xtend")

module.exports = createXHR
// Allow use of default import syntax in TypeScript
module.exports.default = createXHR;
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}

},{"global/window":18,"is-function":21,"parse-headers":61,"xtend":67}],67:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],68:[function(require,module,exports){
"use strict";

var noResults = function noResults() {
  return "<li class=\"search-result no-results\">No results found.</li>";
};

module.exports = noResults;

},{}],69:[function(require,module,exports){
"use strict";

var createListItem = function createListItem(result) {
  var permalink = result.url.replace('.html', '').trim();
  return "\n    <li class=\"search\">\n      <a href=\"".concat(permalink, "\">\n        <h2>").concat(result.title, "</h2>\n      </a>\n      <p>").concat(result.description, "</p>\n    </li>\n  ");
};

var result = function result(results) {
  return results.map(createListItem).join('');
};

module.exports = result;

},{}],70:[function(require,module,exports){
"use strict";

module.exports = {
  defaults: require('lodash.defaults'),
  random: require('lodash.sample'),
  each: require('lodash.foreach')
};

},{"lodash.defaults":22,"lodash.foreach":23,"lodash.sample":24}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJoZXJvLmpzIiwiaW1hZ2VzLmpzIiwiaW5kZXguanMiLCJuYXYuanMiLCJub2RlX21vZHVsZXMvZGVmaW5lLXByb3BlcnRpZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvR2V0SW50cmluc2ljLmpzIiwibm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2VzNS5qcyIsIm5vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2Fzc2VydFJlY29yZC5qcyIsIm5vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2lzRmluaXRlLmpzIiwibm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvaXNOYU4uanMiLCJub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvaGVscGVycy9tb2QuanMiLCJub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvaGVscGVycy9zaWduLmpzIiwibm9kZV9tb2R1bGVzL2VzLXRvLXByaW1pdGl2ZS9lczUuanMiLCJub2RlX21vZHVsZXMvZXMtdG8tcHJpbWl0aXZlL2hlbHBlcnMvaXNQcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbXBsZW1lbnRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dsb2JhbC93aW5kb3cuanMiLCJub2RlX21vZHVsZXMvaGFzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pcy1jYWxsYWJsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pcy1mdW5jdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnNhbXBsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sdW5yL2x1bnIuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW1wbGVtZW50YXRpb24uanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmFuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb2YuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb3JlLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY3R4LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmRlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZmFpbHMuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5oaWRlLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQub2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxheC1zY3JvbGwvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnRvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC51aWQuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC53a3MuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsYXgtc2Nyb2xsL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGF4LXNjcm9sbC9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL3BhcnNlLWhlYWRlcnMvcGFyc2UtaGVhZGVycy5qcyIsIm5vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vaW1wbGVtZW50YXRpb24uanMiLCJub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS50cmltL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vc2hpbS5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwidGVtcGxhdGVzL25vLXJlc3VsdHMuanMiLCJ0ZW1wbGF0ZXMvcmVzdWx0LmpzIiwidXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQUQsQ0FBakI7O0FBQ0EsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBRUEsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQVQsQ0FBYyxZQUFkLENBQTJCLFdBQTNCLENBQWhCOztBQUVBLFNBQVMsSUFBVCxHQUFnQjtBQUNkLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixDQUFoQjtBQUNBLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQWY7QUFDQSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixDQUFiOztBQUNBLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsTUFBVCxDQUFaOztBQUNBLEVBQUEsT0FBTyxDQUFDLFNBQVIsR0FBb0IsR0FBRyxDQUFDLE9BQXhCO0FBQ0EsRUFBQSxJQUFJLENBQUMsWUFBTCxDQUFrQixPQUFsQixrQ0FBb0QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFsRTtBQUNBLEVBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsR0FBRyxDQUFDLFdBQXpCO0FBQ0Q7O0FBRUQsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLElBQXRCOzs7OztBQ2RBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLENBQ2Y7QUFDRSxFQUFBLEdBQUcsRUFDRCxpREFGSjtBQUdFLEVBQUEsV0FBVyxFQUFFLFdBSGY7QUFJRSxFQUFBLE9BQU8sRUFDTDtBQUxKLENBRGUsRUFRZjtBQUNFLEVBQUEsR0FBRyxFQUNELHlFQUZKO0FBR0UsRUFBQSxXQUFXLEVBQUUsWUFIZjtBQUlFLEVBQUEsT0FBTyxFQUNMO0FBTEosQ0FSZSxFQWVmO0FBQ0UsRUFBQSxHQUFHLEVBQUUsbUVBRFA7QUFFRSxFQUFBLFdBQVcsRUFBRSxZQUZmO0FBR0UsRUFBQSxPQUFPLEVBQ0w7QUFKSixDQWZlLEVBcUJmO0FBQ0UsRUFBQSxHQUFHLEVBQUUsbUZBRFA7QUFFRSxFQUFBLFdBQVcsRUFBRSxZQUZmO0FBR0UsRUFBQSxPQUFPLEVBQ0w7QUFKSixDQXJCZSxFQTJCZjtBQUNFLEVBQUEsR0FBRyxFQUFFLG1FQURQO0FBRUUsRUFBQSxXQUFXLEVBQUUsWUFGZjtBQUdFLEVBQUEsT0FBTyxFQUNMO0FBSkosQ0EzQmUsRUFpQ2Y7QUFDRSxFQUFBLEdBQUcsRUFBRSw4Q0FEUDtBQUVFLEVBQUEsV0FBVyxFQUFFLFlBRmY7QUFHRSxFQUFBLE9BQU8sRUFBRTtBQUhYLENBakNlLEVBc0NmO0FBQ0UsRUFBQSxHQUFHLEVBQ0QsK0VBRko7QUFHRSxFQUFBLFdBQVcsRUFBRSxZQUhmO0FBSUUsRUFBQSxPQUFPLEVBQ0w7QUFMSixDQXRDZSxFQTZDZjtBQUNFLEVBQUEsR0FBRyxFQUFFLG1DQURQO0FBRUUsRUFBQSxXQUFXLEVBQUUsWUFGZjtBQUdFLEVBQUEsT0FBTyxFQUNMO0FBSkosQ0E3Q2UsRUFtRGY7QUFDRSxFQUFBLEdBQUcsRUFBRSxtQ0FEUDtBQUVFLEVBQUEsV0FBVyxFQUFFLFlBRmY7QUFHRSxFQUFBLE9BQU8sRUFDTDtBQUpKLENBbkRlLEVBeURmO0FBQ0UsRUFBQSxHQUFHLEVBQUUseUNBRFA7QUFFRSxFQUFBLFdBQVcsRUFBRSxZQUZmO0FBR0UsRUFBQSxPQUFPLEVBQ0w7QUFKSixDQXpEZSxFQStEZjtBQUNFLEVBQUEsR0FBRyxFQUFFLDBDQURQO0FBRUUsRUFBQSxXQUFXLEVBQUUsV0FGZjtBQUdFLEVBQUEsT0FBTyxFQUNMO0FBSkosQ0EvRGUsRUFxRWY7QUFDRSxFQUFBLEdBQUcsRUFBRSw2QkFEUDtBQUVFLEVBQUEsV0FBVyxFQUFFLFlBRmY7QUFHRSxFQUFBLE9BQU8sRUFDTDtBQUpKLENBckVlLENBQWpCOzs7OztBQ0RBLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBRCxDQUF4Qjs7QUFFQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQSxJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQUosQ0FBYSxXQUFiLEVBQTBCO0FBQUUsRUFBQSxLQUFLLEVBQUU7QUFBVCxDQUExQixDQUFqQjtBQUNBLFFBQVEsQ0FBQyxPQUFUO0FBRUEsSUFBSSxDQUFDLElBQUw7QUFFQSxHQUFHLENBQUMsSUFBSixDQUFTO0FBQ1AsRUFBQSxZQUFZLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBRFA7QUFFUCxFQUFBLElBQUksRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUZDO0FBR1AsRUFBQSxXQUFXLEVBQUUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FITjtBQUlQLEVBQUEsT0FBTyxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QjtBQUpGLENBQVQ7Ozs7O0FDVEEsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUQsQ0FBbkI7O0FBRUEsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQUQsQ0FBakI7O0FBRUEsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLG9CQUFELENBQXZCOztBQUNBLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyx3QkFBRCxDQUF6Qjs7QUFFQSxJQUFNLFNBQVMsR0FBRztBQUNoQixFQUFBLE9BQU8sRUFBUCxPQURnQjtBQUVoQixFQUFBLFNBQVMsRUFBVDtBQUZnQixDQUFsQjtBQUtBLElBQU0sUUFBUSxHQUFHO0FBQ2YsRUFBQSxNQUFNLEVBQUUsS0FETztBQUVmLEVBQUEsV0FBVyxFQUFFLFFBRkU7QUFHZixFQUFBLFNBQVMsRUFBRTtBQUhJLENBQWpCO0FBTUEsSUFBSSxPQUFKO0FBQ0EsSUFBSSxLQUFKOztBQUdBLFNBQVMsZ0JBQVQsR0FBNEI7QUFDMUIsRUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixnQkFBckIsQ0FBc0MsT0FBdEMsRUFBK0MsWUFBL0M7QUFDQSxFQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFxQyxPQUFyQyxFQUE4QyxXQUE5QztBQUNBLEVBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxnQkFBYixDQUE4QixRQUE5QixFQUF3QyxVQUF4QztBQUNBLEVBQUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxZQUF4QztBQUNEOztBQUVELFNBQVMsT0FBVCxHQUFtQjtBQUNqQixFQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLG1CQUFyQixDQUF5QyxPQUF6QyxFQUFrRCxZQUFsRDtBQUNBLEVBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBQXFDLE9BQXJDLEVBQThDLFdBQTlDO0FBQ0EsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLGdCQUFiLENBQThCLFFBQTlCLEVBQXdDLFVBQXhDO0FBQ0EsRUFBQSxRQUFRLENBQUMsSUFBVCxDQUFjLG1CQUFkLENBQWtDLE9BQWxDLEVBQTJDLFlBQTNDO0FBQ0Q7O0FBRUQsU0FBUyxhQUFULEdBQXlCO0FBQ3ZCLEVBQUEsR0FBRyxDQUFDLEdBQUosQ0FBUSxjQUFSLEVBQXdCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUNwQyxRQUFJLEdBQUosRUFBUyxPQUFPLENBQUMsS0FBUixDQUFjLHNDQUFkO0FBQ1QsSUFBQSxPQUFPLENBQUMsSUFBUixHQUFlLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBRyxDQUFDLElBQWYsQ0FBZjtBQUNBLElBQUEsV0FBVztBQUNaLEdBSkQ7QUFLRDs7QUFFRCxTQUFTLFdBQVQsR0FBdUI7QUFDckIsRUFBQSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVk7QUFDdkIsU0FBSyxLQUFMLENBQVcsSUFBWDtBQUNBLFNBQUssS0FBTCxDQUFXLFFBQVg7QUFDQSxTQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CO0FBQUUsTUFBQSxLQUFLLEVBQUU7QUFBVCxLQUFwQjtBQUNBLFNBQUssS0FBTCxDQUFXLGFBQVgsRUFBMEI7QUFBRSxNQUFBLEtBQUssRUFBRTtBQUFULEtBQTFCO0FBQ0QsR0FMVyxDQUFaOztBQU9BLEVBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFPLENBQUMsSUFBZixFQUFxQixVQUFDLElBQUQsRUFBTyxDQUFQLEVBQWE7QUFDaEMsSUFBQSxLQUFLLENBQUMsR0FBTixDQUFVO0FBQ1IsTUFBQSxFQUFFLEVBQUUsQ0FESTtBQUVSLE1BQUEsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUZKO0FBR1IsTUFBQSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBSFY7QUFJUixNQUFBLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFKTCxLQUFWO0FBTUQsR0FQRDtBQVFEOztBQUVELFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixFQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0EsTUFBSSxhQUFhLEdBQUcsRUFBcEI7QUFDQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBUixDQUFvQixLQUFqQztBQUNBLE1BQUksSUFBSSxDQUFDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsU0FBaEIsR0FBNEIsRUFBNUI7QUFDdkIsTUFBSSxJQUFJLENBQUMsTUFBTCxHQUFjLE9BQU8sQ0FBQyxTQUExQixFQUFxQzs7QUFDckMsRUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBYixDQUFQLEVBQTJCLFVBQUMsTUFBRCxFQUFZO0FBQ3JDLElBQUEsYUFBYSxDQUFDLElBQWQsQ0FBbUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFNLENBQUMsR0FBcEIsQ0FBbkI7QUFDRCxHQUZEOztBQUdBLEVBQUEsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFkLENBQXFCLFVBQUEsTUFBTTtBQUFBLFdBQUksTUFBTSxDQUFDLEtBQVAsS0FBaUIsRUFBckI7QUFBQSxHQUEzQixDQUFoQjtBQUNBLEVBQUEsYUFBYSxDQUFDLGFBQUQsQ0FBYjtBQUNEOztBQUVELFNBQVMsYUFBVCxDQUF1QixPQUF2QixFQUFnQztBQUM5QixNQUFJLE9BQU8sQ0FBQyxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQUUsSUFBQSxPQUFPLENBQUMsT0FBUixDQUFnQixTQUFoQixHQUE0QixTQUFTLENBQUMsU0FBVixFQUE1QjtBQUFvRCxHQUFoRixNQUFzRjtBQUFFLElBQUEsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsU0FBaEIsR0FBNEIsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsT0FBbEIsQ0FBNUI7QUFBeUQ7QUFDbEo7O0FBRUQsU0FBUyxVQUFULENBQW9CLENBQXBCLEVBQXVCO0FBQ3JCLEVBQUEsQ0FBQyxDQUFDLGNBQUY7QUFDQSxTQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUI7QUFDdkIsRUFBQSxDQUFDLENBQUMsY0FBRjtBQUNBLEVBQUEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsSUFBSSxFQUFyQixHQUEwQixJQUFJLEVBQTlCLENBRnVCLENBRVc7QUFDbkM7O0FBRUQsU0FBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCO0FBQ3ZCLE1BQUksT0FBTyxDQUFDLE1BQVIsSUFBa0IsQ0FBQyxDQUFDLE9BQUYsS0FBYyxFQUFwQyxFQUF3QyxJQUFJO0FBQzdDOztBQUVELFNBQVMsSUFBVCxHQUFnQjtBQUNkLEVBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLE9BQU8sQ0FBQyxXQUFuQztBQUNBLEVBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsS0FBcEI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLElBQWpCO0FBQ0Q7O0FBRUQsU0FBUyxJQUFULEdBQWdCO0FBQ2QsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsT0FBTyxDQUFDLFdBQXRDO0FBQ0EsRUFBQSxPQUFPLENBQUMsTUFBUixHQUFpQixLQUFqQjtBQUNEOztBQUVELFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0I7QUFDbEIsRUFBQSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxFQUFYLEVBQWUsSUFBZixFQUFxQixRQUFyQixDQUFWO0FBQ0EsRUFBQSxnQkFBZ0I7QUFDaEIsRUFBQSxhQUFhO0FBQ2Q7O0FBRUQsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLElBQXRCO0FBQ0EsTUFBTSxDQUFDLE9BQVAsQ0FBZSxPQUFmLEdBQXlCLE9BQXpCOzs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1cEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3poRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkJBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWTtBQUFBO0FBQUEsQ0FBbEI7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBakI7Ozs7O0FDRkEsSUFBTSxjQUFjLEdBQUcsU0FBakIsY0FBaUIsQ0FBQyxNQUFELEVBQVk7QUFDakMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQVAsQ0FBVyxPQUFYLENBQW1CLE9BQW5CLEVBQTRCLEVBQTVCLEVBQWdDLElBQWhDLEVBQWxCO0FBQ0EsZ0VBRWUsU0FGZiw4QkFHWSxNQUFNLENBQUMsS0FIbkIseUNBS1MsTUFBTSxDQUFDLFdBTGhCO0FBUUQsQ0FWRDs7QUFZQSxJQUFNLE1BQU0sR0FBRyxTQUFULE1BQVMsQ0FBQSxPQUFPO0FBQUEsU0FBSSxPQUFPLENBQUMsR0FBUixDQUFZLGNBQVosRUFBNEIsSUFBNUIsQ0FBaUMsRUFBakMsQ0FBSjtBQUFBLENBQXRCOztBQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE1BQWpCOzs7OztBQ2RBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBQ2YsRUFBQSxRQUFRLEVBQUUsT0FBTyxDQUFDLGlCQUFELENBREY7QUFFZixFQUFBLE1BQU0sRUFBRSxPQUFPLENBQUMsZUFBRCxDQUZBO0FBR2YsRUFBQSxJQUFJLEVBQUUsT0FBTyxDQUFDLGdCQUFEO0FBSEUsQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG5jb25zdCBpbWFnZXMgPSByZXF1aXJlKCcuL2ltYWdlcycpO1xuXG5jb25zdCBiYXNldXJsID0gZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm9vdCcpO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBjb25zdCBjYXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm8taW1hZ2UtY2FwdGlvbicpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1oZWFkZXInKTtcbiAgY29uc3QgaGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvLWltYWdlJyk7XG4gIGNvbnN0IGltZyA9IF8ucmFuZG9tKGltYWdlcyk7XG4gIGNhcHRpb24uaW5uZXJIVE1MID0gaW1nLmNhcHRpb247XG4gIGhlcm8uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtiYXNldXJsICsgaW1nLnNyY30pO2ApO1xuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChpbWcuaGVhZGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5pbml0ID0gaW5pdDtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICBzcmM6XG4gICAgICAnL2ltYWdlcy9oZXJvL2dyZWF0LXNtb2tpZXMtbW91bnRhaW4tc2t5bGluZS5qcGcnLFxuICAgIGhlYWRlckNsYXNzOiAnZGFyay10ZXh0JyxcbiAgICBjYXB0aW9uOlxuICAgICAgJzxhIGhyZWY9XCJodHRwczovL2ZsaWMua3IvcC9SZlpVZkVcIiB0YXJnZXQ9XCJfYmxhbmtcIj5HcmVhdCBTbW9reSBNb3VudGFpbnMgTmF0aW9uYWwgUGFyazwvYT4sIFRlbm5lc3NlZS4gUGhvdG8gYnkgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmZsaWNrci5jb20vcGhvdG9zLzI1MTcxNTY5QE4wMi9cIj5qampqNTZjcDwvYT4sIDxhIGhyZWY9XCJodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktbmMtc2EvMi4wL1wiPkNDIEJZLU5DLVNBIDIuMDwvYT4uJyxcbiAgfSxcbiAge1xuICAgIHNyYzpcbiAgICAgICcvaW1hZ2VzL2hlcm8vYmlnLWxha2UtbmF0aW9uYWwtd2lsZGxpZmUtcmVmdWdlLWJvdHRvbWxhbmQtaGFyZHdvb2RzLmpwZycsXG4gICAgaGVhZGVyQ2xhc3M6ICdsaWdodC10ZXh0JyxcbiAgICBjYXB0aW9uOlxuICAgICAgJ0N5cHJlc3MgdHJlZXMgYXQgPGEgaHJlZj1cImh0dHA6Ly93d3cuZndzLmdvdi9iaWdsYWtlL1wiIHRhcmdldD1cIl9ibGFua1wiPkJpZyBMYWtlIE5hdGlvbmFsIFdpbGRsaWZlIFJlZnVnZTwvYT4uIFBob3RvIGJ5IEplcmVteSBCZW5uZXR0LCBVU0ZXUy4nLFxuICB9LFxuICB7XG4gICAgc3JjOiAnL2ltYWdlcy9oZXJvL2Nhbm9laW5nLWFsbGlnYXRvci1yaXZlci1uYXRpb25hLXdpbGRsaWZlLXJlZnVnZS5qcGcnLFxuICAgIGhlYWRlckNsYXNzOiAnbGlnaHQtdGV4dCcsXG4gICAgY2FwdGlvbjpcbiAgICAgICc8YSBocmVmPVwiaHR0cDovL3d3dy5md3MuZ292L3JlZnVnZS9hbGxpZ2F0b3Jfcml2ZXIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+QWxsaWdhdG9yIFJpdmVyIE5hdGlvbmFsIFdpbGRsaWZlIFJlZnVnZTwvYT4uIFBob3RvIGJ5IFN0ZXZlIEhpbGxlYnJhbmQsIFVTRldTLicsXG4gIH0sXG4gIHtcbiAgICBzcmM6ICcvaW1hZ2VzL2hlcm8vYmlnLWxhdXJlbC1icmFuY2gtZmFsbHMtbmFudGFoYWxhLW5hdGlvbmFsLWZvcmVzdC1ub3J0aC1jYXJvbGluYS5qcGcnLFxuICAgIGhlYWRlckNsYXNzOiAnbGlnaHQtdGV4dCcsXG4gICAgY2FwdGlvbjpcbiAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9mbGljLmtyL3AvcjFXazZCXCIgdGFyZ2V0PVwiX2JsYW5rXCI+QmlnIExhdXJlbCBCcmFuY2ggRmFsbHMsIE5hbnRhaGFsYSBOYXRpb25hbCBGb3Jlc3Q8L2E+LCBOb3J0aCBDYXJvbGluYS4gUGhvdG8gYnkgSmVmZiBNb29yZSwgPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy8yLjAvXCI+Q0MgQlktTkMgMi4wPC9hPi4nLFxuICB9LFxuICB7XG4gICAgc3JjOiAnL2ltYWdlcy9oZXJvL2d1bGYtc2lkZS1sb3dlci1zdXdhbmVlLW5hdGlvbmFsLXdpbGRsaWZlLXJlZnVnZS5qcGcnLFxuICAgIGhlYWRlckNsYXNzOiAnbGlnaHQtdGV4dCcsXG4gICAgY2FwdGlvbjpcbiAgICAgICc8YSBocmVmPVwiaHR0cDovL3d3dy5md3MuZ292L3JlZnVnZS9sb3dlcl9zdXdhbm5lZS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Mb3dlciBTdXdhbmVlIE5hdGlvbmFsIFdpbGRsaWZlIFJlZnVnZTwvYT4uIFBob3RvIGJ5IEdlb3JnZSBXaWxsc29uLicsXG4gIH0sXG4gIHtcbiAgICBzcmM6ICcvaW1hZ2VzL2hlcm8vc2FsdC1tYXJzaC1zdC1zaW1vbnMtaXNsYW5kLmpwZycsXG4gICAgaGVhZGVyQ2xhc3M6ICdsaWdodC10ZXh0JyxcbiAgICBjYXB0aW9uOiAnU2FsdCBtYXJzaCBpbiBhIHRpZGFsIHJpdmVyIGVzdHVhcnkgYXQgRWJvIExhbmRpbmcgb24gU3QuIFNpbW9ucyBJc2xhbmQsIEdlb3JnaWEuIFBob3RvIGJ5IEdlb3JnZSBHZW50cnksIFVTRldTLicsXG4gIH0sXG4gIHtcbiAgICBzcmM6XG4gICAgICAnL2ltYWdlcy9oZXJvL2xvbmdsZWFmLXBpbmUtYXQtY2Fyb2xpbmEtc2FuZGhpbGxzLW5hdGlvbmFsLXdpbGRsaWZlLXJlZnVnZS5qcGcnLFxuICAgIGhlYWRlckNsYXNzOiAnbGlnaHQtdGV4dCcsXG4gICAgY2FwdGlvbjpcbiAgICAgICdMb25nbGVhZiBwaW5lIGF0IDxhIGhyZWY9XCJodHRwczovL3d3dy5md3MuZ292L3JlZnVnZS9DYXJvbGluYV9TYW5kaGlsbHMvXCI+Q2Fyb2xpbmEgU2FuZGhpbGxzIE5hdGlvbmFsIFdpbGRsaWZlIFJlZnVnZTwvYT4sIFNvdXRoIENhcm9saW5hLiA8YSBocmVmPVwiaHR0cHM6Ly9mbGljLmtyL3AvYzRjd0ZqXCI+UGhvdG88L2E+IGJ5IEphY2sgQ3VscGVwcGVyLCBVU0ZXUy4nLFxuICB9LFxuICB7XG4gICAgc3JjOiAnL2ltYWdlcy9oZXJvL2NoZXJva2VlLXByYWlyaWUuanBnJyxcbiAgICBoZWFkZXJDbGFzczogJ2xpZ2h0LXRleHQnLFxuICAgIGNhcHRpb246XG4gICAgICAnQ2hlcm9rZWUgUHJhaXJpZSBOYXR1cmFsIEFyZWEsIEFya2Fuc2FzIFJpdmVyIFZhbGxleS4gPGEgaHJlZj1cImh0dHBzOi8vd3d3LnNlZ3Jhc3NsYW5kcy5vcmcvYXJrYW5zYXMtdmFsbGV5LWdyYXNzbGFuZHNcIj5QaG90bzwvYT4gYnkgV2lsbGlhbSBEYXJrIFBob3RvZ3JhcGh5LCB1c2VkIGJ5IHBlcm1pc3Npb24gb2YgU291dGhlYXN0ZXJuIEdyYXNzbGFuZHMgSW5pdGlhdGl2ZS4nLFxuICB9LFxuICB7XG4gICAgc3JjOiAnL2ltYWdlcy9oZXJvL2xhZ3VuYS1jYXJ0YWdlbmEuanBnJyxcbiAgICBoZWFkZXJDbGFzczogJ2xpZ2h0LXRleHQnLFxuICAgIGNhcHRpb246XG4gICAgICAnPGEgaHJlZj1cImh0dHBzOi8vZmxpYy5rci9wL0NlbXNVaFwiIHRhcmdldD1cIl9ibGFua1wiPkxhZ3VuYSBDYXJ0YWdlbmEgTmF0aW9uYWwgV2lsZGxpZmUgUmVmdWdlPC9hPiwgUHVlcnRvIFJpY28uIFBob3RvIGJ5IE0uIE1vcmVsLCBVRlNXUy4nLFxuICB9LFxuICB7XG4gICAgc3JjOiAnL2ltYWdlcy9oZXJvL3ZpcmdpbmlhLWNyZWVwZXItdHJhaWwuanBnJyxcbiAgICBoZWFkZXJDbGFzczogJ2xpZ2h0LXRleHQnLFxuICAgIGNhcHRpb246XG4gICAgICAnVmlyZ2luaWEgQ3JlZXBlciBUcmFpbCwgVmlyZ2luaWEuIDxhIGhyZWY9XCJodHRwczovL2ZsaWMua3IvcC9oYTF3YjVcIj5QaG90bzwvYT4gYnkgPGEgaHJlZj1cImh0dHBzOi8vZmxpY2tyLmNvbS9waG90b3MvMjc4NjQ5NjlATjAwL1wiPlN0ZXBoZW4gVGF5bG9yPC9hPiwgPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy8yLjAvXCI+Q0MgQlktTkMgMi4wPC9hPicsXG4gIH0sXG4gIHtcbiAgICBzcmM6ICcvaW1hZ2VzL2hlcm8vY2FwZS1sb29rb3V0LWxpZ2h0aG91c2UuanBnJyxcbiAgICBoZWFkZXJDbGFzczogJ2RhcmstdGV4dCcsXG4gICAgY2FwdGlvbjpcbiAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9mbGljLmtyL3AvYWlDUHUxXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2FwZSBMb29rb3V0IGxpZ2h0aG91c2UgYW5kIHNlYSBvYXRzPC9hPiwgTm9ydGggQ2Fyb2xpbmEuIFBob3RvIGJ5IFphY2ggRnJhaWxleSwgPGEgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy1uZC8yLjAvXCI+Q0MgQlktTkMtTkQgMi4wPC9hPi4nLFxuICB9LFxuICB7XG4gICAgc3JjOiAnL2ltYWdlcy9oZXJvL2dyYXlzLXJlZWYuanBnJyxcbiAgICBoZWFkZXJDbGFzczogJ2xpZ2h0LXRleHQnLFxuICAgIGNhcHRpb246XG4gICAgICAnRGl2aW5nIGF0IEdyYXnigJlzIFJlZWYgTmF0aW9uYWwgTWFyaW5lIFNhbmN0dWFyeSwgU2F2YW5uYWgsIEdlb3JnaWEuIDxhIGhyZWY9XCJodHRwczovL2ZsaWMua3IvcC9IcVpNblRcIj5QaG90bzwvYT4gYnkgR3JlZyBNY0ZhbGwsIE5PQUEuJyxcbiAgfSxcbl07XG4iLCJjb25zdCBQYXJhbGxheCA9IHJlcXVpcmUoJ3BhcmFsbGF4LXNjcm9sbCcpO1xuXG5jb25zdCBuYXYgPSByZXF1aXJlKCcuL25hdicpO1xuY29uc3QgaGVybyA9IHJlcXVpcmUoJy4vaGVybycpO1xuXG5jb25zdCBwYXJhbGxheCA9IG5ldyBQYXJhbGxheCgnLnBhcmFsbGF4JywgeyBzcGVlZDogMC40IH0pO1xucGFyYWxsYXguYW5pbWF0ZSgpO1xuXG5oZXJvLmluaXQoKTtcblxubmF2LmluaXQoe1xuICBzZWFyY2hCdXR0b246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYnV0dG9uJyksXG4gIGZvcm06IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpLFxuICBzZWFyY2hJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpLFxuICByZXN1bHRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLXJlc3VsdHMnKSxcbn0pO1xuIiwiXG5jb25zdCBsdW5yID0gcmVxdWlyZSgnbHVucicpO1xuY29uc3QgeGhyID0gcmVxdWlyZSgneGhyJyk7XG5cbmNvbnN0IF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgcmVzdWx0cyA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3Jlc3VsdCcpO1xuY29uc3Qgbm9SZXN1bHRzID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbm8tcmVzdWx0cycpO1xuXG5jb25zdCB0ZW1wbGF0ZXMgPSB7XG4gIHJlc3VsdHMsXG4gIG5vUmVzdWx0cyxcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBhY3RpdmU6IGZhbHNlLFxuICBhY3RpdmVDbGFzczogJ2FjdGl2ZScsXG4gIG1pbkxlbmd0aDogMyxcbn07XG5cbmxldCBvcHRpb25zO1xubGV0IGluZGV4O1xuXG5cbmZ1bmN0aW9uIHJlZ2lzdGVySGFuZGxlcnMoKSB7XG4gIG9wdGlvbnMuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2VhcmNoKTtcbiAgb3B0aW9ucy5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNlYXJjaEluZGV4KTtcbiAgb3B0aW9ucy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZvcm1TdWJtaXQpO1xuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5dXBIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgb3B0aW9ucy5zZWFyY2hCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTZWFyY2gpO1xuICBvcHRpb25zLnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2VhcmNoSW5kZXgpO1xuICBvcHRpb25zLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZm9ybVN1Ym1pdCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXl1cEhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBkb3dubG9hZEluZGV4KCkge1xuICB4aHIuZ2V0KCcvc2VhcmNoLmpzb24nLCAoZXJyLCByZXMpID0+IHtcbiAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZG93bmxvYWQgc2VhcmNoIGluZGV4LiA6KCAnKTtcbiAgICBvcHRpb25zLmRhdGEgPSBKU09OLnBhcnNlKHJlcy5ib2R5KTtcbiAgICBjcmVhdGVJbmRleCgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5kZXgoKSB7XG4gIGluZGV4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5maWVsZCgnaWQnKTtcbiAgICB0aGlzLmZpZWxkKCdhdXRob3InKTtcbiAgICB0aGlzLmZpZWxkKCd0aXRsZScsIHsgYm9vc3Q6IDEwIH0pO1xuICAgIHRoaXMuZmllbGQoJ2Rlc2NyaXB0aW9uJywgeyBib29zdDogMyB9KTtcbiAgfSk7XG5cbiAgXy5lYWNoKG9wdGlvbnMuZGF0YSwgKHBhZ2UsIGkpID0+IHtcbiAgICBpbmRleC5hZGQoe1xuICAgICAgaWQ6IGksXG4gICAgICB0aXRsZTogcGFnZS50aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBwYWdlLmRlc2NyaXB0aW9uLFxuICAgICAgYXV0aG9yOiBwYWdlLmF1dGhvclxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VhcmNoSW5kZXgoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCBzZWFyY2hSZXN1bHRzID0gW107XG4gIGNvbnN0IHRlcm0gPSBvcHRpb25zLnNlYXJjaElucHV0LnZhbHVlO1xuICBpZiAodGVybS5sZW5ndGggPT09IDApIG9wdGlvbnMucmVzdWx0cy5pbm5lckhUTUwgPSAnJztcbiAgaWYgKHRlcm0ubGVuZ3RoIDwgb3B0aW9ucy5taW5MZW5ndGgpIHJldHVybjtcbiAgXy5lYWNoKGluZGV4LnNlYXJjaCh0ZXJtKSwgKHJlc3VsdCkgPT4ge1xuICAgIHNlYXJjaFJlc3VsdHMucHVzaChvcHRpb25zLmRhdGFbcmVzdWx0LnJlZl0pO1xuICB9KTtcbiAgc2VhcmNoUmVzdWx0cyA9IHNlYXJjaFJlc3VsdHMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQudGl0bGUgIT09ICcnKTtcbiAgcmVuZGVyUmVzdWx0cyhzZWFyY2hSZXN1bHRzKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUmVzdWx0cyhyZXN1bHRzKSB7XG4gIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkgeyBvcHRpb25zLnJlc3VsdHMuaW5uZXJIVE1MID0gdGVtcGxhdGVzLm5vUmVzdWx0cygpOyB9IGVsc2UgeyBvcHRpb25zLnJlc3VsdHMuaW5uZXJIVE1MID0gdGVtcGxhdGVzLnJlc3VsdHMocmVzdWx0cyk7IH1cbn1cblxuZnVuY3Rpb24gZm9ybVN1Ym1pdChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTZWFyY2goZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIG9wdGlvbnMuYWN0aXZlID8gaGlkZSgpIDogc2hvdygpOyAvLyBlc2xpbnQgaWdub3JlOmxpbmVcbn1cblxuZnVuY3Rpb24ga2V5dXBIYW5kbGVyKGUpIHtcbiAgaWYgKG9wdGlvbnMuYWN0aXZlICYmIGUua2V5Q29kZSA9PT0gMjcpIGhpZGUoKTtcbn1cblxuZnVuY3Rpb24gc2hvdygpIHtcbiAgb3B0aW9ucy5mb3JtLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5hY3RpdmVDbGFzcyk7XG4gIG9wdGlvbnMuc2VhcmNoSW5wdXQuZm9jdXMoKTtcbiAgb3B0aW9ucy5hY3RpdmUgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBoaWRlKCkge1xuICBvcHRpb25zLmZvcm0uY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLmFjdGl2ZUNsYXNzKTtcbiAgb3B0aW9ucy5hY3RpdmUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaW5pdChvcHRzKSB7XG4gIG9wdGlvbnMgPSBfLmRlZmF1bHRzKHt9LCBvcHRzLCBkZWZhdWx0cyk7XG4gIHJlZ2lzdGVySGFuZGxlcnMoKTtcbiAgZG93bmxvYWRJbmRleCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5pbml0ID0gaW5pdDtcbm1vZHVsZS5leHBvcnRzLmRlc3Ryb3kgPSBkZXN0cm95O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgaGFzU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbCgnZm9vJykgPT09ICdzeW1ib2wnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgb3JpZ0RlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbikge1xuXHRyZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIGFyZVByb3BlcnR5RGVzY3JpcHRvcnNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBvYmogPSB7fTtcblx0dHJ5IHtcblx0XHRvcmlnRGVmaW5lUHJvcGVydHkob2JqLCAneCcsIHsgZW51bWVyYWJsZTogZmFsc2UsIHZhbHVlOiBvYmogfSk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzLCBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdGZvciAodmFyIF8gaW4gb2JqKSB7IC8vIGpzY3M6aWdub3JlIGRpc2FsbG93VW51c2VkVmFyaWFibGVzXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBvYmoueCA9PT0gb2JqO1xuXHR9IGNhdGNoIChlKSB7IC8qIHRoaXMgaXMgSUUgOC4gKi9cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IG9yaWdEZWZpbmVQcm9wZXJ0eSAmJiBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkKCk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHZhbHVlLCBwcmVkaWNhdGUpIHtcblx0aWYgKG5hbWUgaW4gb2JqZWN0ICYmICghaXNGdW5jdGlvbihwcmVkaWNhdGUpIHx8ICFwcmVkaWNhdGUoKSkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKHN1cHBvcnRzRGVzY3JpcHRvcnMpIHtcblx0XHRvcmlnRGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG5cdH1cbn07XG5cbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iamVjdCwgbWFwKSB7XG5cdHZhciBwcmVkaWNhdGVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB7fTtcblx0dmFyIHByb3BzID0ga2V5cyhtYXApO1xuXHRpZiAoaGFzU3ltYm9scykge1xuXHRcdHByb3BzID0gY29uY2F0LmNhbGwocHJvcHMsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMobWFwKSk7XG5cdH1cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcHNbaV0sIG1hcFtwcm9wc1tpXV0sIHByZWRpY2F0ZXNbcHJvcHNbaV1dKTtcblx0fVxufTtcblxuZGVmaW5lUHJvcGVydGllcy5zdXBwb3J0c0Rlc2NyaXB0b3JzID0gISFzdXBwb3J0c0Rlc2NyaXB0b3JzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnRpZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbHNcblx0U2V0LFxuXHRNYXAsXG5cdFdlYWtTZXQsXG5cdFdlYWtNYXAsXG5cblx0UHJvbWlzZSxcblxuXHRTeW1ib2wsXG5cdFByb3h5LFxuXG5cdEF0b21pY3MsXG5cdFNoYXJlZEFycmF5QnVmZmVyLFxuXG5cdEFycmF5QnVmZmVyLFxuXHREYXRhVmlldyxcblx0VWludDhBcnJheSxcblx0RmxvYXQzMkFycmF5LFxuXHRGbG9hdDY0QXJyYXksXG5cdEludDhBcnJheSxcblx0SW50MTZBcnJheSxcblx0SW50MzJBcnJheSxcblx0VWludDhDbGFtcGVkQXJyYXksXG5cdFVpbnQxNkFycmF5LFxuXHRVaW50MzJBcnJheSxcbiovXG5cbnZhciB1bmRlZmluZWQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93LXJlc3RyaWN0ZWQtbmFtZXNcblxudmFyIFRocm93VHlwZUVycm9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvclxuXHQ/IChmdW5jdGlvbiAoKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDsgfSgpKVxuXHQ6IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcigpOyB9O1xuXG52YXIgaGFzU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCc7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIGdlbmVyYXRvcjsgLy8gPSBmdW5jdGlvbiAqICgpIHt9O1xudmFyIGdlbmVyYXRvckZ1bmN0aW9uID0gZ2VuZXJhdG9yID8gZ2V0UHJvdG8oZ2VuZXJhdG9yKSA6IHVuZGVmaW5lZDtcbnZhciBhc3luY0ZuOyAvLyBhc3luYyBmdW5jdGlvbigpIHt9O1xudmFyIGFzeW5jRnVuY3Rpb24gPSBhc3luY0ZuID8gYXN5bmNGbi5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZDtcbnZhciBhc3luY0dlbjsgLy8gYXN5bmMgZnVuY3Rpb24gKiAoKSB7fTtcbnZhciBhc3luY0dlbkZ1bmN0aW9uID0gYXN5bmNHZW4gPyBnZXRQcm90byhhc3luY0dlbikgOiB1bmRlZmluZWQ7XG52YXIgYXN5bmNHZW5JdGVyYXRvciA9IGFzeW5jR2VuID8gYXN5bmNHZW4oKSA6IHVuZGVmaW5lZDtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCckICVBcnJheSUnOiBBcnJheSxcblx0JyQgJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyQgJUFycmF5QnVmZmVyUHJvdG90eXBlJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlci5wcm90b3R5cGUsXG5cdCckICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJCAlQXJyYXlQcm90b3R5cGUlJzogQXJyYXkucHJvdG90eXBlLFxuXHQnJCAlQXJyYXlQcm90b19lbnRyaWVzJSc6IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzLFxuXHQnJCAlQXJyYXlQcm90b19mb3JFYWNoJSc6IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLFxuXHQnJCAlQXJyYXlQcm90b19rZXlzJSc6IEFycmF5LnByb3RvdHlwZS5rZXlzLFxuXHQnJCAlQXJyYXlQcm90b192YWx1ZXMlJzogQXJyYXkucHJvdG90eXBlLnZhbHVlcyxcblx0JyQgJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCckICVBc3luY0Z1bmN0aW9uJSc6IGFzeW5jRnVuY3Rpb24sXG5cdCckICVBc3luY0Z1bmN0aW9uUHJvdG90eXBlJSc6IGFzeW5jRnVuY3Rpb24gPyBhc3luY0Z1bmN0aW9uLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcblx0JyQgJUFzeW5jR2VuZXJhdG9yJSc6IGFzeW5jR2VuID8gZ2V0UHJvdG8oYXN5bmNHZW5JdGVyYXRvcikgOiB1bmRlZmluZWQsXG5cdCckICVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IGFzeW5jR2VuRnVuY3Rpb24sXG5cdCckICVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBhc3luY0dlbkZ1bmN0aW9uID8gYXN5bmNHZW5GdW5jdGlvbi5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG5cdCckICVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IGFzeW5jR2VuSXRlcmF0b3IgJiYgaGFzU3ltYm9scyAmJiBTeW1ib2wuYXN5bmNJdGVyYXRvciA/IGFzeW5jR2VuSXRlcmF0b3JbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkgOiB1bmRlZmluZWQsXG5cdCckICVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCckICVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCckICVCb29sZWFuUHJvdG90eXBlJSc6IEJvb2xlYW4ucHJvdG90eXBlLFxuXHQnJCAlRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJCAlRGF0YVZpZXdQcm90b3R5cGUlJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LnByb3RvdHlwZSxcblx0JyQgJURhdGUlJzogRGF0ZSxcblx0JyQgJURhdGVQcm90b3R5cGUlJzogRGF0ZS5wcm90b3R5cGUsXG5cdCckICVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJCAlZGVjb2RlVVJJQ29tcG9uZW50JSc6IGRlY29kZVVSSUNvbXBvbmVudCxcblx0JyQgJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCckICVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJCAlRXJyb3IlJzogRXJyb3IsXG5cdCckICVFcnJvclByb3RvdHlwZSUnOiBFcnJvci5wcm90b3R5cGUsXG5cdCckICVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJCAlRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyQgJUV2YWxFcnJvclByb3RvdHlwZSUnOiBFdmFsRXJyb3IucHJvdG90eXBlLFxuXHQnJCAlRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJCAlRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LnByb3RvdHlwZSxcblx0JyQgJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyQgJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheS5wcm90b3R5cGUsXG5cdCckICVGdW5jdGlvbiUnOiBGdW5jdGlvbixcblx0JyQgJUZ1bmN0aW9uUHJvdG90eXBlJSc6IEZ1bmN0aW9uLnByb3RvdHlwZSxcblx0JyQgJUdlbmVyYXRvciUnOiBnZW5lcmF0b3IgPyBnZXRQcm90byhnZW5lcmF0b3IoKSkgOiB1bmRlZmluZWQsXG5cdCckICVHZW5lcmF0b3JGdW5jdGlvbiUnOiBnZW5lcmF0b3JGdW5jdGlvbixcblx0JyQgJUdlbmVyYXRvclByb3RvdHlwZSUnOiBnZW5lcmF0b3JGdW5jdGlvbiA/IGdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcblx0JyQgJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyQgJUludDhBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheS5wcm90b3R5cGUsXG5cdCckICVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCckICVJbnQxNkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheS5wcm90b3R5cGUsXG5cdCckICVJbnQzMkFycmF5JSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXksXG5cdCckICVJbnQzMkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXkucHJvdG90eXBlLFxuXHQnJCAlaXNGaW5pdGUlJzogaXNGaW5pdGUsXG5cdCckICVpc05hTiUnOiBpc05hTixcblx0JyQgJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyQgJUpTT04lJzogSlNPTixcblx0JyQgJUpTT05QYXJzZSUnOiBKU09OLnBhcnNlLFxuXHQnJCAlTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJCAlTWFwSXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgTWFwKClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyQgJU1hcFByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcC5wcm90b3R5cGUsXG5cdCckICVNYXRoJSc6IE1hdGgsXG5cdCckICVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJCAlTnVtYmVyUHJvdG90eXBlJSc6IE51bWJlci5wcm90b3R5cGUsXG5cdCckICVPYmplY3QlJzogT2JqZWN0LFxuXHQnJCAlT2JqZWN0UHJvdG90eXBlJSc6IE9iamVjdC5wcm90b3R5cGUsXG5cdCckICVPYmpQcm90b190b1N0cmluZyUnOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuXHQnJCAlT2JqUHJvdG9fdmFsdWVPZiUnOiBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YsXG5cdCckICVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCckICVwYXJzZUludCUnOiBwYXJzZUludCxcblx0JyQgJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyQgJVByb21pc2VQcm90b3R5cGUlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5wcm90b3R5cGUsXG5cdCckICVQcm9taXNlUHJvdG9fdGhlbiUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLnByb3RvdHlwZS50aGVuLFxuXHQnJCAlUHJvbWlzZV9hbGwlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5hbGwsXG5cdCckICVQcm9taXNlX3JlamVjdCUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLnJlamVjdCxcblx0JyQgJVByb21pc2VfcmVzb2x2ZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLnJlc29sdmUsXG5cdCckICVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCckICVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCckICVSYW5nZUVycm9yUHJvdG90eXBlJSc6IFJhbmdlRXJyb3IucHJvdG90eXBlLFxuXHQnJCAlUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCckICVSZWZlcmVuY2VFcnJvclByb3RvdHlwZSUnOiBSZWZlcmVuY2VFcnJvci5wcm90b3R5cGUsXG5cdCckICVSZWZsZWN0JSc6IHR5cGVvZiBSZWZsZWN0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFJlZmxlY3QsXG5cdCckICVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJCAlUmVnRXhwUHJvdG90eXBlJSc6IFJlZ0V4cC5wcm90b3R5cGUsXG5cdCckICVTZXQlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTZXQsXG5cdCckICVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJCAlU2V0UHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LnByb3RvdHlwZSxcblx0JyQgJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyQgJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlci5wcm90b3R5cGUsXG5cdCckICVTdHJpbmclJzogU3RyaW5nLFxuXHQnJCAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCckICVTdHJpbmdQcm90b3R5cGUlJzogU3RyaW5nLnByb3RvdHlwZSxcblx0JyQgJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJCAlU3ltYm9sUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuXHQnJCAlU3ludGF4RXJyb3IlJzogU3ludGF4RXJyb3IsXG5cdCckICVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBTeW50YXhFcnJvci5wcm90b3R5cGUsXG5cdCckICVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyQgJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyQgJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogVHlwZWRBcnJheSA/IFR5cGVkQXJyYXkucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuXHQnJCAlVHlwZUVycm9yJSc6IFR5cGVFcnJvcixcblx0JyQgJVR5cGVFcnJvclByb3RvdHlwZSUnOiBUeXBlRXJyb3IucHJvdG90eXBlLFxuXHQnJCAlVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJCAlVWludDhBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LnByb3RvdHlwZSxcblx0JyQgJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyQgJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheS5wcm90b3R5cGUsXG5cdCckICVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCckICVVaW50MTZBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXkucHJvdG90eXBlLFxuXHQnJCAlVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJCAlVWludDMyQXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LnByb3RvdHlwZSxcblx0JyQgJVVSSUVycm9yJSc6IFVSSUVycm9yLFxuXHQnJCAlVVJJRXJyb3JQcm90b3R5cGUlJzogVVJJRXJyb3IucHJvdG90eXBlLFxuXHQnJCAlV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJCAlV2Vha01hcFByb3RvdHlwZSUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLnByb3RvdHlwZSxcblx0JyQgJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldCxcblx0JyQgJVdlYWtTZXRQcm90b3R5cGUlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldC5wcm90b3R5cGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIGtleSA9ICckICcgKyBuYW1lO1xuXHRpZiAoIShrZXkgaW4gSU5UUklOU0lDUykpIHtcblx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG5cdH1cblxuXHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWYgLy8gaG9wZWZ1bGx5IHRoaXMgaXMgaW1wb3NzaWJsZSB0byB0ZXN0IDotKVxuXHRpZiAodHlwZW9mIElOVFJJTlNJQ1Nba2V5XSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdH1cblx0cmV0dXJuIElOVFJJTlNJQ1Nba2V5XTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCcuL0dldEludHJpbnNpYycpO1xuXG52YXIgJE9iamVjdCA9IEdldEludHJpbnNpYygnJU9iamVjdCUnKTtcbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRTdHJpbmcgPSBHZXRJbnRyaW5zaWMoJyVTdHJpbmclJyk7XG5cbnZhciBhc3NlcnRSZWNvcmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYXNzZXJ0UmVjb3JkJyk7XG52YXIgJGlzTmFOID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzTmFOJyk7XG52YXIgJGlzRmluaXRlID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzRmluaXRlJyk7XG5cbnZhciBzaWduID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NpZ24nKTtcbnZhciBtb2QgPSByZXF1aXJlKCcuL2hlbHBlcnMvbW9kJyk7XG5cbnZhciBJc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJ2VzLXRvLXByaW1pdGl2ZS9lczUnKTtcblxudmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuXG4vLyBodHRwczovL2VzNS5naXRodWIuaW8vI3g5XG52YXIgRVM1ID0ge1xuXHRUb1ByaW1pdGl2ZTogdG9QcmltaXRpdmUsXG5cblx0VG9Cb29sZWFuOiBmdW5jdGlvbiBUb0Jvb2xlYW4odmFsdWUpIHtcblx0XHRyZXR1cm4gISF2YWx1ZTtcblx0fSxcblx0VG9OdW1iZXI6IGZ1bmN0aW9uIFRvTnVtYmVyKHZhbHVlKSB7XG5cdFx0cmV0dXJuICt2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHR9LFxuXHRUb0ludGVnZXI6IGZ1bmN0aW9uIFRvSW50ZWdlcih2YWx1ZSkge1xuXHRcdHZhciBudW1iZXIgPSB0aGlzLlRvTnVtYmVyKHZhbHVlKTtcblx0XHRpZiAoJGlzTmFOKG51bWJlcikpIHsgcmV0dXJuIDA7IH1cblx0XHRpZiAobnVtYmVyID09PSAwIHx8ICEkaXNGaW5pdGUobnVtYmVyKSkgeyByZXR1cm4gbnVtYmVyOyB9XG5cdFx0cmV0dXJuIHNpZ24obnVtYmVyKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XG5cdH0sXG5cdFRvSW50MzI6IGZ1bmN0aW9uIFRvSW50MzIoeCkge1xuXHRcdHJldHVybiB0aGlzLlRvTnVtYmVyKHgpID4+IDA7XG5cdH0sXG5cdFRvVWludDMyOiBmdW5jdGlvbiBUb1VpbnQzMih4KSB7XG5cdFx0cmV0dXJuIHRoaXMuVG9OdW1iZXIoeCkgPj4+IDA7XG5cdH0sXG5cdFRvVWludDE2OiBmdW5jdGlvbiBUb1VpbnQxNih2YWx1ZSkge1xuXHRcdHZhciBudW1iZXIgPSB0aGlzLlRvTnVtYmVyKHZhbHVlKTtcblx0XHRpZiAoJGlzTmFOKG51bWJlcikgfHwgbnVtYmVyID09PSAwIHx8ICEkaXNGaW5pdGUobnVtYmVyKSkgeyByZXR1cm4gMDsgfVxuXHRcdHZhciBwb3NJbnQgPSBzaWduKG51bWJlcikgKiBNYXRoLmZsb29yKE1hdGguYWJzKG51bWJlcikpO1xuXHRcdHJldHVybiBtb2QocG9zSW50LCAweDEwMDAwKTtcblx0fSxcblx0VG9TdHJpbmc6IGZ1bmN0aW9uIFRvU3RyaW5nKHZhbHVlKSB7XG5cdFx0cmV0dXJuICRTdHJpbmcodmFsdWUpO1xuXHR9LFxuXHRUb09iamVjdDogZnVuY3Rpb24gVG9PYmplY3QodmFsdWUpIHtcblx0XHR0aGlzLkNoZWNrT2JqZWN0Q29lcmNpYmxlKHZhbHVlKTtcblx0XHRyZXR1cm4gJE9iamVjdCh2YWx1ZSk7XG5cdH0sXG5cdENoZWNrT2JqZWN0Q29lcmNpYmxlOiBmdW5jdGlvbiBDaGVja09iamVjdENvZXJjaWJsZSh2YWx1ZSwgb3B0TWVzc2FnZSkge1xuXHRcdC8qIGpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcihvcHRNZXNzYWdlIHx8ICdDYW5ub3QgY2FsbCBtZXRob2Qgb24gJyArIHZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRJc0NhbGxhYmxlOiBJc0NhbGxhYmxlLFxuXHRTYW1lVmFsdWU6IGZ1bmN0aW9uIFNhbWVWYWx1ZSh4LCB5KSB7XG5cdFx0aWYgKHggPT09IHkpIHsgLy8gMCA9PT0gLTAsIGJ1dCB0aGV5IGFyZSBub3QgaWRlbnRpY2FsLlxuXHRcdFx0aWYgKHggPT09IDApIHsgcmV0dXJuIDEgLyB4ID09PSAxIC8geTsgfVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiAkaXNOYU4oeCkgJiYgJGlzTmFOKHkpO1xuXHR9LFxuXG5cdC8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOFxuXHRUeXBlOiBmdW5jdGlvbiBUeXBlKHgpIHtcblx0XHRpZiAoeCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuICdOdWxsJztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB4ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuICdVbmRlZmluZWQnO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gJ09iamVjdCc7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcblx0XHRcdHJldHVybiAnTnVtYmVyJztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB4ID09PSAnYm9vbGVhbicpIHtcblx0XHRcdHJldHVybiAnQm9vbGVhbic7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnU3RyaW5nJztcblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXByb3BlcnR5LWRlc2NyaXB0b3Itc3BlY2lmaWNhdGlvbi10eXBlXG5cdElzUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBJc1Byb3BlcnR5RGVzY3JpcHRvcihEZXNjKSB7XG5cdFx0aWYgKHRoaXMuVHlwZShEZXNjKSAhPT0gJ09iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dmFyIGFsbG93ZWQgPSB7XG5cdFx0XHQnW1tDb25maWd1cmFibGVdXSc6IHRydWUsXG5cdFx0XHQnW1tFbnVtZXJhYmxlXV0nOiB0cnVlLFxuXHRcdFx0J1tbR2V0XV0nOiB0cnVlLFxuXHRcdFx0J1tbU2V0XV0nOiB0cnVlLFxuXHRcdFx0J1tbVmFsdWVdXSc6IHRydWUsXG5cdFx0XHQnW1tXcml0YWJsZV1dJzogdHJ1ZVxuXHRcdH07XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gRGVzYykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHRpZiAoaGFzKERlc2MsIGtleSkgJiYgIWFsbG93ZWRba2V5XSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGlzRGF0YSA9IGhhcyhEZXNjLCAnW1tWYWx1ZV1dJyk7XG5cdFx0dmFyIElzQWNjZXNzb3IgPSBoYXMoRGVzYywgJ1tbR2V0XV0nKSB8fCBoYXMoRGVzYywgJ1tbU2V0XV0nKTtcblx0XHRpZiAoaXNEYXRhICYmIElzQWNjZXNzb3IpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdQcm9wZXJ0eSBEZXNjcmlwdG9ycyBtYXkgbm90IGJlIGJvdGggYWNjZXNzb3IgYW5kIGRhdGEgZGVzY3JpcHRvcnMnKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguMTAuMVxuXHRJc0FjY2Vzc29yRGVzY3JpcHRvcjogZnVuY3Rpb24gSXNBY2Nlc3NvckRlc2NyaXB0b3IoRGVzYykge1xuXHRcdGlmICh0eXBlb2YgRGVzYyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRhc3NlcnRSZWNvcmQodGhpcywgJ1Byb3BlcnR5IERlc2NyaXB0b3InLCAnRGVzYycsIERlc2MpO1xuXG5cdFx0aWYgKCFoYXMoRGVzYywgJ1tbR2V0XV0nKSAmJiAhaGFzKERlc2MsICdbW1NldF1dJykpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvLyBodHRwczovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOC4xMC4yXG5cdElzRGF0YURlc2NyaXB0b3I6IGZ1bmN0aW9uIElzRGF0YURlc2NyaXB0b3IoRGVzYykge1xuXHRcdGlmICh0eXBlb2YgRGVzYyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRhc3NlcnRSZWNvcmQodGhpcywgJ1Byb3BlcnR5IERlc2NyaXB0b3InLCAnRGVzYycsIERlc2MpO1xuXG5cdFx0aWYgKCFoYXMoRGVzYywgJ1tbVmFsdWVdXScpICYmICFoYXMoRGVzYywgJ1tbV3JpdGFibGVdXScpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguMTAuM1xuXHRJc0dlbmVyaWNEZXNjcmlwdG9yOiBmdW5jdGlvbiBJc0dlbmVyaWNEZXNjcmlwdG9yKERlc2MpIHtcblx0XHRpZiAodHlwZW9mIERlc2MgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0YXNzZXJ0UmVjb3JkKHRoaXMsICdQcm9wZXJ0eSBEZXNjcmlwdG9yJywgJ0Rlc2MnLCBEZXNjKTtcblxuXHRcdGlmICghdGhpcy5Jc0FjY2Vzc29yRGVzY3JpcHRvcihEZXNjKSAmJiAhdGhpcy5Jc0RhdGFEZXNjcmlwdG9yKERlc2MpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0Ly8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTguMTAuNFxuXHRGcm9tUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBGcm9tUHJvcGVydHlEZXNjcmlwdG9yKERlc2MpIHtcblx0XHRpZiAodHlwZW9mIERlc2MgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gRGVzYztcblx0XHR9XG5cblx0XHRhc3NlcnRSZWNvcmQodGhpcywgJ1Byb3BlcnR5IERlc2NyaXB0b3InLCAnRGVzYycsIERlc2MpO1xuXG5cdFx0aWYgKHRoaXMuSXNEYXRhRGVzY3JpcHRvcihEZXNjKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dmFsdWU6IERlc2NbJ1tbVmFsdWVdXSddLFxuXHRcdFx0XHR3cml0YWJsZTogISFEZXNjWydbW1dyaXRhYmxlXV0nXSxcblx0XHRcdFx0ZW51bWVyYWJsZTogISFEZXNjWydbW0VudW1lcmFibGVdXSddLFxuXHRcdFx0XHRjb25maWd1cmFibGU6ICEhRGVzY1snW1tDb25maWd1cmFibGVdXSddXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAodGhpcy5Jc0FjY2Vzc29yRGVzY3JpcHRvcihEZXNjKSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Z2V0OiBEZXNjWydbW0dldF1dJ10sXG5cdFx0XHRcdHNldDogRGVzY1snW1tTZXRdXSddLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiAhIURlc2NbJ1tbRW51bWVyYWJsZV1dJ10sXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogISFEZXNjWydbW0NvbmZpZ3VyYWJsZV1dJ11cblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdGcm9tUHJvcGVydHlEZXNjcmlwdG9yIG11c3QgYmUgY2FsbGVkIHdpdGggYSBmdWxseSBwb3B1bGF0ZWQgUHJvcGVydHkgRGVzY3JpcHRvcicpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBodHRwczovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOC4xMC41XG5cdFRvUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBUb1Byb3BlcnR5RGVzY3JpcHRvcihPYmopIHtcblx0XHRpZiAodGhpcy5UeXBlKE9iaikgIT09ICdPYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignVG9Qcm9wZXJ0eURlc2NyaXB0b3IgcmVxdWlyZXMgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIGRlc2MgPSB7fTtcblx0XHRpZiAoaGFzKE9iaiwgJ2VudW1lcmFibGUnKSkge1xuXHRcdFx0ZGVzY1snW1tFbnVtZXJhYmxlXV0nXSA9IHRoaXMuVG9Cb29sZWFuKE9iai5lbnVtZXJhYmxlKTtcblx0XHR9XG5cdFx0aWYgKGhhcyhPYmosICdjb25maWd1cmFibGUnKSkge1xuXHRcdFx0ZGVzY1snW1tDb25maWd1cmFibGVdXSddID0gdGhpcy5Ub0Jvb2xlYW4oT2JqLmNvbmZpZ3VyYWJsZSk7XG5cdFx0fVxuXHRcdGlmIChoYXMoT2JqLCAndmFsdWUnKSkge1xuXHRcdFx0ZGVzY1snW1tWYWx1ZV1dJ10gPSBPYmoudmFsdWU7XG5cdFx0fVxuXHRcdGlmIChoYXMoT2JqLCAnd3JpdGFibGUnKSkge1xuXHRcdFx0ZGVzY1snW1tXcml0YWJsZV1dJ10gPSB0aGlzLlRvQm9vbGVhbihPYmoud3JpdGFibGUpO1xuXHRcdH1cblx0XHRpZiAoaGFzKE9iaiwgJ2dldCcpKSB7XG5cdFx0XHR2YXIgZ2V0dGVyID0gT2JqLmdldDtcblx0XHRcdGlmICh0eXBlb2YgZ2V0dGVyICE9PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5Jc0NhbGxhYmxlKGdldHRlcikpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0dGVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHRcdFx0fVxuXHRcdFx0ZGVzY1snW1tHZXRdXSddID0gZ2V0dGVyO1xuXHRcdH1cblx0XHRpZiAoaGFzKE9iaiwgJ3NldCcpKSB7XG5cdFx0XHR2YXIgc2V0dGVyID0gT2JqLnNldDtcblx0XHRcdGlmICh0eXBlb2Ygc2V0dGVyICE9PSAndW5kZWZpbmVkJyAmJiAhdGhpcy5Jc0NhbGxhYmxlKHNldHRlcikpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ3NldHRlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblx0XHRcdH1cblx0XHRcdGRlc2NbJ1tbU2V0XV0nXSA9IHNldHRlcjtcblx0XHR9XG5cblx0XHRpZiAoKGhhcyhkZXNjLCAnW1tHZXRdXScpIHx8IGhhcyhkZXNjLCAnW1tTZXRdXScpKSAmJiAoaGFzKGRlc2MsICdbW1ZhbHVlXV0nKSB8fCBoYXMoZGVzYywgJ1tbV3JpdGFibGVdXScpKSkge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0ludmFsaWQgcHJvcGVydHkgZGVzY3JpcHRvci4gQ2Fubm90IGJvdGggc3BlY2lmeSBhY2Nlc3NvcnMgYW5kIGEgdmFsdWUgb3Igd3JpdGFibGUgYXR0cmlidXRlJyk7XG5cdFx0fVxuXHRcdHJldHVybiBkZXNjO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVTNTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJy4uL0dldEludHJpbnNpYycpO1xuXG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcbnZhciAkU3ludGF4RXJyb3IgPSBHZXRJbnRyaW5zaWMoJyVTeW50YXhFcnJvciUnKTtcblxudmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xuXG52YXIgcHJlZGljYXRlcyA9IHtcbiAgLy8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXByb3BlcnR5LWRlc2NyaXB0b3Itc3BlY2lmaWNhdGlvbi10eXBlXG4gICdQcm9wZXJ0eSBEZXNjcmlwdG9yJzogZnVuY3Rpb24gaXNQcm9wZXJ0eURlc2NyaXB0b3IoRVMsIERlc2MpIHtcbiAgICBpZiAoRVMuVHlwZShEZXNjKSAhPT0gJ09iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGFsbG93ZWQgPSB7XG4gICAgICAnW1tDb25maWd1cmFibGVdXSc6IHRydWUsXG4gICAgICAnW1tFbnVtZXJhYmxlXV0nOiB0cnVlLFxuICAgICAgJ1tbR2V0XV0nOiB0cnVlLFxuICAgICAgJ1tbU2V0XV0nOiB0cnVlLFxuICAgICAgJ1tbVmFsdWVdXSc6IHRydWUsXG4gICAgICAnW1tXcml0YWJsZV1dJzogdHJ1ZVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gRGVzYykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBpZiAoaGFzKERlc2MsIGtleSkgJiYgIWFsbG93ZWRba2V5XSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGlzRGF0YSA9IGhhcyhEZXNjLCAnW1tWYWx1ZV1dJyk7XG4gICAgdmFyIElzQWNjZXNzb3IgPSBoYXMoRGVzYywgJ1tbR2V0XV0nKSB8fCBoYXMoRGVzYywgJ1tbU2V0XV0nKTtcbiAgICBpZiAoaXNEYXRhICYmIElzQWNjZXNzb3IpIHtcbiAgICAgIHRocm93IG5ldyAkVHlwZUVycm9yKCdQcm9wZXJ0eSBEZXNjcmlwdG9ycyBtYXkgbm90IGJlIGJvdGggYWNjZXNzb3IgYW5kIGRhdGEgZGVzY3JpcHRvcnMnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNzZXJ0UmVjb3JkKEVTLCByZWNvcmRUeXBlLCBhcmd1bWVudE5hbWUsIHZhbHVlKSB7XG4gIHZhciBwcmVkaWNhdGUgPSBwcmVkaWNhdGVzW3JlY29yZFR5cGVdO1xuICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Vua25vd24gcmVjb3JkIHR5cGU6ICcgKyByZWNvcmRUeXBlKTtcbiAgfVxuICBpZiAoIXByZWRpY2F0ZShFUywgdmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoYXJndW1lbnROYW1lICsgJyBtdXN0IGJlIGEgJyArIHJlY29yZFR5cGUpO1xuICB9XG4gIGNvbnNvbGUubG9nKHByZWRpY2F0ZShFUywgdmFsdWUpLCB2YWx1ZSk7XG59O1xuIiwidmFyICRpc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSAhPT0gYTsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXIuaXNGaW5pdGUgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHR5cGVvZiB4ID09PSAnbnVtYmVyJyAmJiAhJGlzTmFOKHgpICYmIHggIT09IEluZmluaXR5ICYmIHggIT09IC1JbmZpbml0eTsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIGlzTmFOKGEpIHtcblx0cmV0dXJuIGEgIT09IGE7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtb2QobnVtYmVyLCBtb2R1bG8pIHtcblx0dmFyIHJlbWFpbiA9IG51bWJlciAlIG1vZHVsbztcblx0cmV0dXJuIE1hdGguZmxvb3IocmVtYWluID49IDAgPyByZW1haW4gOiByZW1haW4gKyBtb2R1bG8pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2lnbihudW1iZXIpIHtcblx0cmV0dXJuIG51bWJlciA+PSAwID8gMSA6IC0xO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzUHJpbWl0aXZlJyk7XG5cbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcblxuLy8gaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtOC4xMi44XG52YXIgRVM1aW50ZXJuYWxTbG90cyA9IHtcblx0J1tbRGVmYXVsdFZhbHVlXV0nOiBmdW5jdGlvbiAoTykge1xuXHRcdHZhciBhY3R1YWxIaW50O1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YWN0dWFsSGludCA9IGFyZ3VtZW50c1sxXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0dWFsSGludCA9IHRvU3RyLmNhbGwoTykgPT09ICdbb2JqZWN0IERhdGVdJyA/IFN0cmluZyA6IE51bWJlcjtcblx0XHR9XG5cblx0XHRpZiAoYWN0dWFsSGludCA9PT0gU3RyaW5nIHx8IGFjdHVhbEhpbnQgPT09IE51bWJlcikge1xuXHRcdFx0dmFyIG1ldGhvZHMgPSBhY3R1YWxIaW50ID09PSBTdHJpbmcgPyBbJ3RvU3RyaW5nJywgJ3ZhbHVlT2YnXSA6IFsndmFsdWVPZicsICd0b1N0cmluZyddO1xuXHRcdFx0dmFyIHZhbHVlLCBpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKGlzQ2FsbGFibGUoT1ttZXRob2RzW2ldXSkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IE9bbWV0aG9kc1tpXV0oKTtcblx0XHRcdFx0XHRpZiAoaXNQcmltaXRpdmUodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBkZWZhdWx0IHZhbHVlJyk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgW1tEZWZhdWx0VmFsdWVdXSBoaW50IHN1cHBsaWVkJyk7XG5cdH1cbn07XG5cbi8vIGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzUuMS8jc2VjLTkuMVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb1ByaW1pdGl2ZShpbnB1dCkge1xuXHRpZiAoaXNQcmltaXRpdmUoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdHJldHVybiBFUzVpbnRlcm5hbFNsb3RzWydbW0RlZmF1bHRWYWx1ZV1dJ10oaW5wdXQsIGFyZ3VtZW50c1sxXSk7XG5cdH1cblx0cmV0dXJuIEVTNWludGVybmFsU2xvdHNbJ1tbRGVmYXVsdFZhbHVlXV0nXShpbnB1dCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmb3JFYWNoQXJyYXkgPSBmdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgaSkpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0sIGksIGFycmF5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgYXJyYXlbaV0sIGksIGFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoU3RyaW5nID0gZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoT2JqZWN0ID0gZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0b3IsIHRoaXNBcmcpIHtcbiAgICBpZiAoIWlzQ2FsbGFibGUoaXRlcmF0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHZhciByZWNlaXZlcjtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgIHJlY2VpdmVyID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICBpZiAodG9TdHIuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICBmb3JFYWNoQXJyYXkobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBmb3JFYWNoU3RyaW5nKGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yRWFjaE9iamVjdChsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGJvdW5kQXJncy5qb2luKCcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuVG9TdHIgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBjb25zdHJ1Y3RvclJlZ2V4ID0gL15cXHMqY2xhc3NcXGIvO1xudmFyIGlzRVM2Q2xhc3NGbiA9IGZ1bmN0aW9uIGlzRVM2Q2xhc3NGdW5jdGlvbih2YWx1ZSkge1xuXHR0cnkge1xuXHRcdHZhciBmblN0ciA9IGZuVG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIGNvbnN0cnVjdG9yUmVnZXgudGVzdChmblN0cik7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vIG5vdCBhIGZ1bmN0aW9uXG5cdH1cbn07XG5cbnZhciB0cnlGdW5jdGlvbk9iamVjdCA9IGZ1bmN0aW9uIHRyeUZ1bmN0aW9uVG9TdHIodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmbkNsYXNzID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbnZhciBnZW5DbGFzcyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICF2YWx1ZS5wcm90b3R5cGUpIHsgcmV0dXJuIHRydWU7IH1cblx0aWYgKGhhc1RvU3RyaW5nVGFnKSB7IHJldHVybiB0cnlGdW5jdGlvbk9iamVjdCh2YWx1ZSk7IH1cblx0aWYgKGlzRVM2Q2xhc3NGbih2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdHZhciBzdHJDbGFzcyA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRyZXR1cm4gc3RyQ2xhc3MgPT09IGZuQ2xhc3MgfHwgc3RyQ2xhc3MgPT09IGdlbkNsYXNzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGZuKSB7XG4gIHZhciBzdHJpbmcgPSB0b1N0cmluZy5jYWxsKGZuKVxuICByZXR1cm4gc3RyaW5nID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8XG4gICAgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBzdHJpbmcgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB8fFxuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAvLyBJRTggYW5kIGJlbG93XG4gICAgIChmbiA9PT0gd2luZG93LnNldFRpbWVvdXQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuYWxlcnQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuY29uZmlybSB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5wcm9tcHQpKVxufTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25JbmAgdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9ialZhbHVlIFRoZSBkZXN0aW5hdGlvbiB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHNvdXJjZSB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgcGFyZW50IG9iamVjdCBvZiBgb2JqVmFsdWVgLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduSW5EZWZhdWx0cyhvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAoZXEob2JqVmFsdWUsIG9iamVjdFByb3RvW2tleV0pICYmICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpIHtcbiAgICByZXR1cm4gc3JjVmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9ialZhbHVlO1xufVxuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25JbmAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY3VzdG9taXplcmBcbiAqIHdoaWNoIGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJuc1xuICogYHVuZGVmaW5lZGAsIGFzc2lnbm1lbnQgaXMgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmBcbiAqIGlzIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50czogKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGFsaWFzIGV4dGVuZFdpdGhcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VzIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSkge1xuICogICByZXR1cm4gXy5pc1VuZGVmaW5lZChvYmpWYWx1ZSkgPyBzcmNWYWx1ZSA6IG9ialZhbHVlO1xuICogfVxuICpcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduSW5XaXRoLCBjdXN0b21pemVyKTtcbiAqXG4gKiBkZWZhdWx0cyh7ICdhJzogMSB9LCB7ICdiJzogMiB9LCB7ICdhJzogMyB9KTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICovXG52YXIgYXNzaWduSW5XaXRoID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyKSB7XG4gIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzSW4oc291cmNlKSwgb2JqZWN0LCBjdXN0b21pemVyKTtcbn0pO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2VcbiAqIG9iamVjdHMgdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdCBmb3IgYWxsIGRlc3RpbmF0aW9uIHByb3BlcnRpZXMgdGhhdFxuICogcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICogT25jZSBhIHByb3BlcnR5IGlzIHNldCwgYWRkaXRpb25hbCB2YWx1ZXMgb2YgdGhlIHNhbWUgcHJvcGVydHkgYXJlIGlnbm9yZWQuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQHNlZSBfLmRlZmF1bHRzRGVlcFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmF1bHRzKHsgJ2EnOiAxIH0sIHsgJ2InOiAyIH0sIHsgJ2EnOiAzIH0pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKi9cbnZhciBkZWZhdWx0cyA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFyZ3MpIHtcbiAgYXJncy5wdXNoKHVuZGVmaW5lZCwgYXNzaWduSW5EZWZhdWx0cyk7XG4gIHJldHVybiBhcHBseShhc3NpZ25JbldpdGgsIHVuZGVmaW5lZCwgYXJncyk7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggZWxlbWVudC5cbiAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogKipOb3RlOioqIEFzIHdpdGggb3RoZXIgXCJDb2xsZWN0aW9uc1wiIG1ldGhvZHMsIG9iamVjdHMgd2l0aCBhIFwibGVuZ3RoXCJcbiAqIHByb3BlcnR5IGFyZSBpdGVyYXRlZCBsaWtlIGFycmF5cy4gVG8gYXZvaWQgdGhpcyBiZWhhdmlvciB1c2UgYF8uZm9ySW5gXG4gKiBvciBgXy5mb3JPd25gIGZvciBvYmplY3QgaXRlcmF0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBhbGlhcyBlYWNoXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBzZWUgXy5mb3JFYWNoUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgY29uc29sZS5sb2codmFsdWUpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzIGAxYCB0aGVuIGAyYC5cbiAqXG4gKiBfLmZvckVhY2goeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2EnIHRoZW4gJ2InIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RWFjaCA6IGJhc2VFYWNoO1xuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uLCB0eXBlb2YgaXRlcmF0ZWUgPT0gJ2Z1bmN0aW9uJyA/IGl0ZXJhdGVlIDogaWRlbnRpdHkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIG9mIGBwcm9wc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHJldHVybiBhcnJheU1hcChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlRmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpLFxuICAgIG5hdGl2ZVJhbmRvbSA9IE1hdGgucmFuZG9tO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmFuZG9tYCB3aXRob3V0IHN1cHBvcnQgZm9yIHJldHVybmluZ1xuICogZmxvYXRpbmctcG9pbnQgbnVtYmVycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGxvd2VyIFRoZSBsb3dlciBib3VuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB1cHBlciBUaGUgdXBwZXIgYm91bmQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSByYW5kb20gbnVtYmVyLlxuICovXG5mdW5jdGlvbiBiYXNlUmFuZG9tKGxvd2VyLCB1cHBlcikge1xuICByZXR1cm4gbG93ZXIgKyBuYXRpdmVGbG9vcihuYXRpdmVSYW5kb20oKSAqICh1cHBlciAtIGxvd2VyICsgMSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogR2V0cyBhIHJhbmRvbSBlbGVtZW50IGZyb20gYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzYW1wbGUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmFuZG9tIGVsZW1lbnQuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc2FtcGxlKFsxLCAyLCAzLCA0XSk7XG4gKiAvLyA9PiAyXG4gKi9cbmZ1bmN0aW9uIHNhbXBsZShjb2xsZWN0aW9uKSB7XG4gIHZhciBhcnJheSA9IGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pID8gY29sbGVjdGlvbiA6IHZhbHVlcyhjb2xsZWN0aW9uKSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICByZXR1cm4gbGVuZ3RoID4gMCA/IGFycmF5W2Jhc2VSYW5kb20oMCwgbGVuZ3RoIC0gMSldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPyBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNhbXBsZTtcbiIsIi8qKlxuICogbHVuciAtIGh0dHA6Ly9sdW5yanMuY29tIC0gQSBiaXQgbGlrZSBTb2xyLCBidXQgbXVjaCBzbWFsbGVyIGFuZCBub3QgYXMgYnJpZ2h0IC0gMC43LjJcbiAqIENvcHlyaWdodCAoQykgMjAxNiBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbjsoZnVuY3Rpb24oKXtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgaW5zdGFudGlhdGluZyBhIG5ldyBsdW5yIGluZGV4IGFuZCBjb25maWd1cmluZyBpdFxuICogd2l0aCB0aGUgZGVmYXVsdCBwaXBlbGluZSBmdW5jdGlvbnMgYW5kIHRoZSBwYXNzZWQgY29uZmlnIGZ1bmN0aW9uLlxuICpcbiAqIFdoZW4gdXNpbmcgdGhpcyBjb252ZW5pZW5jZSBmdW5jdGlvbiBhIG5ldyBpbmRleCB3aWxsIGJlIGNyZWF0ZWQgd2l0aCB0aGVcbiAqIGZvbGxvd2luZyBmdW5jdGlvbnMgYWxyZWFkeSBpbiB0aGUgcGlwZWxpbmU6XG4gKlxuICogbHVuci5TdG9wV29yZEZpbHRlciAtIGZpbHRlcnMgb3V0IGFueSBzdG9wIHdvcmRzIGJlZm9yZSB0aGV5IGVudGVyIHRoZVxuICogaW5kZXhcbiAqXG4gKiBsdW5yLnN0ZW1tZXIgLSBzdGVtcyB0aGUgdG9rZW5zIGJlZm9yZSBlbnRlcmluZyB0aGUgaW5kZXguXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICogICAgICAgdGhpcy5maWVsZCgndGl0bGUnLCAxMClcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RhZ3MnLCAxMDApXG4gKiAgICAgICB0aGlzLmZpZWxkKCdib2R5JylcbiAqICAgICAgIFxuICogICAgICAgdGhpcy5yZWYoJ2NpZCcpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucGlwZWxpbmUuYWRkKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgLy8gc29tZSBjdXN0b20gcGlwZWxpbmUgZnVuY3Rpb25cbiAqICAgICAgIH0pXG4gKiAgICAgICBcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZyBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbmV3IGluc3RhbmNlXG4gKiBvZiB0aGUgbHVuci5JbmRleCBhcyBib3RoIGl0cyBjb250ZXh0IGFuZCBmaXJzdCBwYXJhbWV0ZXIuIEl0IGNhbiBiZSB1c2VkIHRvXG4gKiBjdXN0b21pemUgdGhlIGluc3RhbmNlIG9mIG5ldyBsdW5yLkluZGV4LlxuICogQG5hbWVzcGFjZVxuICogQG1vZHVsZVxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKlxuICovXG52YXIgbHVuciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdmFyIGlkeCA9IG5ldyBsdW5yLkluZGV4XG5cbiAgaWR4LnBpcGVsaW5lLmFkZChcbiAgICBsdW5yLnRyaW1tZXIsXG4gICAgbHVuci5zdG9wV29yZEZpbHRlcixcbiAgICBsdW5yLnN0ZW1tZXJcbiAgKVxuXG4gIGlmIChjb25maWcpIGNvbmZpZy5jYWxsKGlkeCwgaWR4KVxuXG4gIHJldHVybiBpZHhcbn1cblxubHVuci52ZXJzaW9uID0gXCIwLjcuMlwiXG4vKiFcbiAqIGx1bnIudXRpbHNcbiAqIENvcHlyaWdodCAoQykgMjAxNiBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgbmFtZXNwYWNlIGNvbnRhaW5pbmcgdXRpbHMgZm9yIHRoZSByZXN0IG9mIHRoZSBsdW5yIGxpYnJhcnlcbiAqL1xubHVuci51dGlscyA9IHt9XG5cbi8qKlxuICogUHJpbnQgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gYmUgcHJpbnRlZC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLndhcm4gPSAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSlcbiAgICB9XG4gIH1cbn0pKHRoaXMpXG5cbi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYG51bGxgIGFuZCBgdW5kZWZpbmVkYCB0aGUgZnVuY3Rpb24gcmV0dXJuc1xuICogdGhlIGVtcHR5IHN0cmluZywgaW4gYWxsIG90aGVyIGNhc2VzIHRoZSByZXN1bHQgb2YgY2FsbGluZ1xuICogYHRvU3RyaW5nYCBvbiB0aGUgcGFzc2VkIG9iamVjdCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0ge0FueX0gb2JqIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwYXNzZWQgb2JqZWN0LlxuICogQG1lbWJlck9mIFV0aWxzXG4gKi9cbmx1bnIudXRpbHMuYXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogPT09IHZvaWQgMCB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmoudG9TdHJpbmcoKVxuICB9XG59XG4vKiFcbiAqIGx1bnIuRXZlbnRFbWl0dGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkV2ZW50RW1pdHRlciBpcyBhbiBldmVudCBlbWl0dGVyIGZvciBsdW5yLiBJdCBtYW5hZ2VzIGFkZGluZyBhbmQgcmVtb3ZpbmcgZXZlbnQgaGFuZGxlcnMgYW5kIHRyaWdnZXJpbmcgZXZlbnRzIGFuZCB0aGVpciBoYW5kbGVycy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnRzID0ge31cbn1cblxuLyoqXG4gKiBCaW5kcyBhIGhhbmRsZXIgZnVuY3Rpb24gdG8gYSBzcGVjaWZpYyBldmVudChzKS5cbiAqXG4gKiBDYW4gYmluZCBhIHNpbmdsZSBmdW5jdGlvbiB0byBtYW55IGRpZmZlcmVudCBldmVudHMgaW4gb25lIGNhbGwuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIFRoZSBuYW1lKHMpIG9mIGV2ZW50cyB0byBiaW5kIHRoaXMgZnVuY3Rpb24gdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIGFuIGV2ZW50IGlzIGZpcmVkLlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgIGZuID0gYXJncy5wb3AoKSxcbiAgICAgIG5hbWVzID0gYXJnc1xuXG4gIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvciAoXCJsYXN0IGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvblwiKVxuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgdGhpcy5ldmVudHNbbmFtZV0gPSBbXVxuICAgIHRoaXMuZXZlbnRzW25hbWVdLnB1c2goZm4pXG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnVuY3Rpb24gZnJvbSBhIHNwZWNpZmljIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGlzIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gYW4gZXZlbnQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgcmV0dXJuXG5cbiAgdmFyIGZuSW5kZXggPSB0aGlzLmV2ZW50c1tuYW1lXS5pbmRleE9mKGZuKVxuICB0aGlzLmV2ZW50c1tuYW1lXS5zcGxpY2UoZm5JbmRleCwgMSlcblxuICBpZiAoIXRoaXMuZXZlbnRzW25hbWVdLmxlbmd0aCkgZGVsZXRlIHRoaXMuZXZlbnRzW25hbWVdXG59XG5cbi8qKlxuICogQ2FsbHMgYWxsIGZ1bmN0aW9ucyBib3VuZCB0byB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQWRkaXRpb25hbCBkYXRhIGNhbiBiZSBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXIgYXMgYXJndW1lbnRzIHRvIGBlbWl0YFxuICogYWZ0ZXIgdGhlIGV2ZW50IG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgcmV0dXJuXG5cbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cbiAgdGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpXG4gIH0pXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBoYW5kbGVyIGhhcyBldmVyIGJlZW4gc3RvcmVkIGFnYWluc3QgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gY2hlY2suXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuYW1lIGluIHRoaXMuZXZlbnRzXG59XG5cbi8qIVxuICogbHVuci50b2tlbml6ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNiBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gZm9yIHNwbGl0dGluZyBhIHN0cmluZyBpbnRvIHRva2VucyByZWFkeSB0byBiZSBpbnNlcnRlZCBpbnRvXG4gKiB0aGUgc2VhcmNoIGluZGV4LiBVc2VzIGBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JgIHRvIHNwbGl0IHN0cmluZ3MsIGNoYW5nZVxuICogdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIGhvdyBzdHJpbmdzIGFyZSBzcGxpdCBpbnRvIHRva2Vucy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqIFRoZSBzdHJpbmcgdG8gY29udmVydCBpbnRvIHRva2Vuc1xuICogQHNlZSBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xubHVuci50b2tlbml6ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCBvYmogPT0gbnVsbCB8fCBvYmogPT0gdW5kZWZpbmVkKSByZXR1cm4gW11cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGx1bnIudXRpbHMuYXNTdHJpbmcodCkudG9Mb3dlckNhc2UoKSB9KVxuXG4gIC8vIFRPRE86IFRoaXMgZXhpc3RzIHNvIHRoYXQgdGhlIGRlcHJlY2F0ZWQgcHJvcGVydHkgbHVuci50b2tlbml6ZXIuc2VwZXJhdG9yIGNhbiBzdGlsbCBiZSB1c2VkLiBCeVxuICAvLyBkZWZhdWx0IGl0IGlzIHNldCB0byBmYWxzZSBhbmQgc28gdGhlIGNvcnJlY3RseSBzcGVsdCBsdW5yLnRva2VuaXplci5zZXBhcmF0b3IgaXMgdXNlZCB1bmxlc3NcbiAgLy8gdGhlIHVzZXIgaXMgdXNpbmcgdGhlIG9sZCBwcm9wZXJ0eSB0byBjdXN0b21pc2UgdGhlIHRva2VuaXplci5cbiAgLy9cbiAgLy8gVGhpcyBzaG91bGQgYmUgcmVtb3ZlZCB3aGVuIHZlcnNpb24gMS4wLjAgaXMgcmVsZWFzZWQuXG4gIHZhciBzZXBhcmF0b3IgPSBsdW5yLnRva2VuaXplci5zZXBlcmF0b3IgfHwgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnNwbGl0KHNlcGFyYXRvcilcbn1cblxuLyoqXG4gKiBUaGlzIHByb3BlcnR5IGlzIGxlZ2FjeSBhbGlhcyBmb3IgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yIHRvIG1haW50YWluIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5LlxuICogV2hlbiBpbnRyb2R1Y2VkIHRoZSB0b2tlbiB3YXMgc3BlbHQgaW5jb3JyZWN0bHkuIEl0IHdpbGwgcmVtYWluIHVudGlsIDEuMC4wIHdoZW4gaXQgd2lsbCBiZSByZW1vdmVkLFxuICogYWxsIGNvZGUgc2hvdWxkIHVzZSB0aGUgY29ycmVjdGx5IHNwZWx0IGx1bnIudG9rZW5pemVyLnNlcGFyYXRvciBwcm9wZXJ0eSBpbnN0ZWFkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSAwLjcuMiB3aWxsIGJlIHJlbW92ZWQgaW4gMS4wLjBcbiAqIEBwcml2YXRlXG4gKiBAc2VlIGx1bnIudG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLnNlcGVyYXRvciA9IGZhbHNlXG5cbi8qKlxuICogVGhlIHNwZXJhdG9yIHVzZWQgdG8gc3BsaXQgYSBzdHJpbmcgaW50byB0b2tlbnMuIE92ZXJyaWRlIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBiZWhhdmlvdXIgb2ZcbiAqIGBsdW5yLnRva2VuaXplcmAgYmVoYXZpb3VyIHdoZW4gdG9rZW5pemluZyBzdHJpbmdzLiBCeSBkZWZhdWx0IHRoaXMgc3BsaXRzIG9uIHdoaXRlc3BhY2UgYW5kIGh5cGhlbnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNlZSBsdW5yLnRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5zZXBhcmF0b3IgPSAvW1xcc1xcLV0rL1xuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqXG4gKiBBIHRva2VuaXplciBmdW5jdGlvbiB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLnRva2VuaXplci5cbiAqIElmIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplciBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgb2YgdGhlIHNlcmlhbGlzZWQgdG9rZW5pemVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5sb2FkID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gIHZhciBmbiA9IHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9uc1tsYWJlbF1cblxuICBpZiAoIWZuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgbGFiZWwpXG4gIH1cblxuICByZXR1cm4gZm5cbn1cblxubHVuci50b2tlbml6ZXIubGFiZWwgPSAnZGVmYXVsdCdcblxubHVuci50b2tlbml6ZXIucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IHtcbiAgJ2RlZmF1bHQnOiBsdW5yLnRva2VuaXplclxufVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgdG9rZW5pemVyIGZ1bmN0aW9uLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGFzIHRva2VuaXplcnMgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgaWYgdGhleSBhcmUgdG8gYmUgdXNlZCB3aXRoIGEgc2VyaWFsaXNlZCBpbmRleC5cbiAqXG4gKiBSZWdpc3RlcmluZyBhIGZ1bmN0aW9uIGRvZXMgbm90IGFkZCBpdCB0byBhbiBpbmRleCwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc3BlY2lmaWMgaW5kZXggZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIGluZGV4aW5nIGFuZCBzZWFyY2hpbmcgZG9jdW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZWdpc3Rlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgdG8gcmVnaXN0ZXIgdGhpcyBmdW5jdGlvbiB3aXRoXG4gKiBAbWVtYmVyT2YgdG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHRva2VuaXplcjogJyArIGxhYmVsKVxuICB9XG5cbiAgZm4ubGFiZWwgPSBsYWJlbFxuICB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdID0gZm5cbn1cbi8qIVxuICogbHVuci5QaXBlbGluZVxuICogQ29weXJpZ2h0IChDKSAyMDE2IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5QaXBlbGluZXMgbWFpbnRhaW4gYW4gb3JkZXJlZCBsaXN0IG9mIGZ1bmN0aW9ucyB0byBiZSBhcHBsaWVkIHRvIGFsbFxuICogdG9rZW5zIGluIGRvY3VtZW50cyBlbnRlcmluZyB0aGUgc2VhcmNoIGluZGV4IGFuZCBxdWVyaWVzIGJlaW5nIHJhbiBhZ2FpbnN0XG4gKiB0aGUgaW5kZXguXG4gKlxuICogQW4gaW5zdGFuY2Ugb2YgbHVuci5JbmRleCBjcmVhdGVkIHdpdGggdGhlIGx1bnIgc2hvcnRjdXQgd2lsbCBjb250YWluIGFcbiAqIHBpcGVsaW5lIHdpdGggYSBzdG9wIHdvcmQgZmlsdGVyIGFuZCBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIuIEV4dHJhXG4gKiBmdW5jdGlvbnMgY2FuIGJlIGFkZGVkIGJlZm9yZSBvciBhZnRlciBlaXRoZXIgb2YgdGhlc2UgZnVuY3Rpb25zIG9yIHRoZXNlXG4gKiBkZWZhdWx0IGZ1bmN0aW9ucyBjYW4gYmUgcmVtb3ZlZC5cbiAqXG4gKiBXaGVuIHJ1biB0aGUgcGlwZWxpbmUgd2lsbCBjYWxsIGVhY2ggZnVuY3Rpb24gaW4gdHVybiwgcGFzc2luZyBhIHRva2VuLCB0aGVcbiAqIGluZGV4IG9mIHRoYXQgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIGxpc3Qgb2YgYWxsIHRva2VucyBhbmQgZmluYWxseSBhIGxpc3Qgb2ZcbiAqIGFsbCB0aGUgb3JpZ2luYWwgdG9rZW5zLlxuICpcbiAqIFRoZSBvdXRwdXQgb2YgZnVuY3Rpb25zIGluIHRoZSBwaXBlbGluZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBmdW5jdGlvblxuICogaW4gdGhlIHBpcGVsaW5lLiBUbyBleGNsdWRlIGEgdG9rZW4gZnJvbSBlbnRlcmluZyB0aGUgaW5kZXggdGhlIGZ1bmN0aW9uXG4gKiBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCwgdGhlIHJlc3Qgb2YgdGhlIHBpcGVsaW5lIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoXG4gKiB0aGlzIHRva2VuLlxuICpcbiAqIEZvciBzZXJpYWxpc2F0aW9uIG9mIHBpcGVsaW5lcyB0byB3b3JrLCBhbGwgZnVuY3Rpb25zIHVzZWQgaW4gYW4gaW5zdGFuY2Ugb2ZcbiAqIGEgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLiBSZWdpc3RlcmVkIGZ1bmN0aW9ucyBjYW5cbiAqIHRoZW4gYmUgbG9hZGVkLiBJZiB0cnlpbmcgdG8gbG9hZCBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgdGhhdCB1c2VzIGZ1bmN0aW9uc1xuICogdGhhdCBhcmUgbm90IHJlZ2lzdGVyZWQgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogSWYgbm90IHBsYW5uaW5nIG9uIHNlcmlhbGlzaW5nIHRoZSBwaXBlbGluZSB0aGVuIHJlZ2lzdGVyaW5nIHBpcGVsaW5lIGZ1bmN0aW9uc1xuICogaXMgbm90IG5lY2Vzc2FyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5QaXBlbGluZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7fVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgZnVuY3Rpb24gd2l0aCB0aGUgcGlwZWxpbmUuXG4gKlxuICogRnVuY3Rpb25zIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZSBwaXBlbGluZVxuICogbmVlZHMgdG8gYmUgc2VyaWFsaXNlZCwgb3IgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIG5lZWRzIHRvIGJlIGxvYWRlZC5cbiAqXG4gKiBSZWdpc3RlcmluZyBhIGZ1bmN0aW9uIGRvZXMgbm90IGFkZCBpdCB0byBhIHBpcGVsaW5lLCBmdW5jdGlvbnMgbXVzdCBzdGlsbCBiZVxuICogYWRkZWQgdG8gaW5zdGFuY2VzIG9mIHRoZSBwaXBlbGluZSBmb3IgdGhlbSB0byBiZSB1c2VkIHdoZW4gcnVubmluZyBhIHBpcGVsaW5lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjaGVjayBmb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbiwgbGFiZWwpIHtcbiAgaWYgKGxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucykge1xuICAgIGx1bnIudXRpbHMud2FybignT3ZlcndyaXRpbmcgZXhpc3RpbmcgcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgZm4ubGFiZWwgPSBsYWJlbFxuICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm4ubGFiZWxdID0gZm5cbn1cblxuLyoqXG4gKiBXYXJucyBpZiB0aGUgZnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgYXMgYSBQaXBlbGluZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucylcblxuICBpZiAoIWlzUmVnaXN0ZXJlZCkge1xuICAgIGx1bnIudXRpbHMud2FybignRnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBwaXBlbGluZS4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXguXFxuJywgZm4pXG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBwaXBlbGluZS5cbiAqXG4gKiBBbGwgZnVuY3Rpb25zIHRvIGJlIGxvYWRlZCBtdXN0IGFscmVhZHkgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuXG4gKiBJZiBhbnkgZnVuY3Rpb24gZnJvbSB0aGUgc2VyaWFsaXNlZCBkYXRhIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHRoZW4gYW5cbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkIFRoZSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5QaXBlbGluZX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZCkge1xuICB2YXIgcGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuXG4gIHNlcmlhbGlzZWQuZm9yRWFjaChmdW5jdGlvbiAoZm5OYW1lKSB7XG4gICAgdmFyIGZuID0gbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuTmFtZV1cblxuICAgIGlmIChmbikge1xuICAgICAgcGlwZWxpbmUuYWRkKGZuKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHVuLXJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBmbk5hbWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBwaXBlbGluZVxufVxuXG4vKipcbiAqIEFkZHMgbmV3IGZ1bmN0aW9ucyB0byB0aGUgZW5kIG9mIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25zIEFueSBudW1iZXIgb2YgZnVuY3Rpb25zIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZm5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXG4gIGZucy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuICAgIHRoaXMuX3N0YWNrLnB1c2goZm4pXG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBhZnRlciBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhpc3RpbmdGbiBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3Rm4gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24gKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKG5ld0ZuKVxuXG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGV4aXN0aW5nRm4nKVxuICB9XG5cbiAgcG9zID0gcG9zICsgMVxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGJlZm9yZSBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhpc3RpbmdGbiBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3Rm4gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBmdW5jdGlvbiBmcm9tIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihmbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMSlcbn1cblxuLyoqXG4gKiBSdW5zIHRoZSBjdXJyZW50IGxpc3Qgb2YgZnVuY3Rpb25zIHRoYXQgbWFrZSB1cCB0aGUgcGlwZWxpbmUgYWdhaW5zdCB0aGVcbiAqIHBhc3NlZCB0b2tlbnMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zIFRoZSB0b2tlbnMgdG8gcnVuIHRocm91Z2ggdGhlIHBpcGVsaW5lLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgdmFyIG91dCA9IFtdLFxuICAgICAgdG9rZW5MZW5ndGggPSB0b2tlbnMubGVuZ3RoLFxuICAgICAgc3RhY2tMZW5ndGggPSB0aGlzLl9zdGFjay5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3RhY2tMZW5ndGg7IGorKykge1xuICAgICAgdG9rZW4gPSB0aGlzLl9zdGFja1tqXSh0b2tlbiwgaSwgdG9rZW5zKVxuICAgICAgaWYgKHRva2VuID09PSB2b2lkIDAgfHwgdG9rZW4gPT09ICcnKSBicmVha1xuICAgIH07XG5cbiAgICBpZiAodG9rZW4gIT09IHZvaWQgMCAmJiB0b2tlbiAhPT0gJycpIG91dC5wdXNoKHRva2VuKVxuICB9O1xuXG4gIHJldHVybiBvdXRcbn1cblxuLyoqXG4gKiBSZXNldHMgdGhlIHBpcGVsaW5lIGJ5IHJlbW92aW5nIGFueSBleGlzdGluZyBwcm9jZXNzb3JzLlxuICpcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGlwZWxpbmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9zdGFjay5tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG5cbiAgICByZXR1cm4gZm4ubGFiZWxcbiAgfSlcbn1cbi8qIVxuICogbHVuci5WZWN0b3JcbiAqIENvcHlyaWdodCAoQykgMjAxNiBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuVmVjdG9ycyBpbXBsZW1lbnQgdmVjdG9yIHJlbGF0ZWQgb3BlcmF0aW9ucyBmb3JcbiAqIGEgc2VyaWVzIG9mIGVsZW1lbnRzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlZlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gbnVsbFxuICB0aGlzLmxpc3QgPSB1bmRlZmluZWRcbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogbHVuci5WZWN0b3IuTm9kZSBpcyBhIHNpbXBsZSBzdHJ1Y3QgZm9yIGVhY2ggbm9kZVxuICogaW4gYSBsdW5yLlZlY3Rvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBkYXRhIGF0IHRoaXMgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvci5Ob2RlfSBUaGUgbm9kZSBkaXJlY3RseSBhZnRlciB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5Ob2RlID0gZnVuY3Rpb24gKGlkeCwgdmFsLCBuZXh0KSB7XG4gIHRoaXMuaWR4ID0gaWR4XG4gIHRoaXMudmFsID0gdmFsXG4gIHRoaXMubmV4dCA9IG5leHRcbn1cblxuLyoqXG4gKiBJbnNlcnRzIGEgbmV3IHZhbHVlIGF0IGEgcG9zaXRpb24gaW4gYSB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgYSB2YWx1ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0IHRvIGluc2VydCBpbiB0aGUgdmVjdG9yLlxuICogQG1lbWJlck9mIFZlY3Rvci5cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChpZHgsIHZhbCkge1xuICB0aGlzLl9tYWduaXR1ZGUgPSB1bmRlZmluZWQ7XG4gIHZhciBsaXN0ID0gdGhpcy5saXN0XG5cbiAgaWYgKCFsaXN0KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICBpZiAoaWR4IDwgbGlzdC5pZHgpIHtcbiAgICB0aGlzLmxpc3QgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIGxpc3QpXG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgfVxuXG4gIHZhciBwcmV2ID0gbGlzdCxcbiAgICAgIG5leHQgPSBsaXN0Lm5leHRcblxuICB3aGlsZSAobmV4dCAhPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoaWR4IDwgbmV4dC5pZHgpIHtcbiAgICAgIHByZXYubmV4dCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbmV4dClcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gICAgfVxuXG4gICAgcHJldiA9IG5leHQsIG5leHQgPSBuZXh0Lm5leHRcbiAgfVxuXG4gIHByZXYubmV4dCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbmV4dClcbiAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYWduaXR1ZGUgb2YgdGhpcyB2ZWN0b3IuXG4gKlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX21hZ25pdHVkZSkgcmV0dXJuIHRoaXMuX21hZ25pdHVkZVxuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIHN1bU9mU3F1YXJlcyA9IDAsXG4gICAgICB2YWxcblxuICB3aGlsZSAobm9kZSkge1xuICAgIHZhbCA9IG5vZGUudmFsXG4gICAgc3VtT2ZTcXVhcmVzICs9IHZhbCAqIHZhbFxuICAgIG5vZGUgPSBub2RlLm5leHRcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9tYWduaXR1ZGUgPSBNYXRoLnNxcnQoc3VtT2ZTcXVhcmVzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciBUaGUgdmVjdG9yIHRvIGNvbXB1dGUgdGhlIGRvdCBwcm9kdWN0IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHZhciBub2RlID0gdGhpcy5saXN0LFxuICAgICAgb3RoZXJOb2RlID0gb3RoZXJWZWN0b3IubGlzdCxcbiAgICAgIGRvdFByb2R1Y3QgPSAwXG5cbiAgd2hpbGUgKG5vZGUgJiYgb3RoZXJOb2RlKSB7XG4gICAgaWYgKG5vZGUuaWR4IDwgb3RoZXJOb2RlLmlkeCkge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dFxuICAgIH0gZWxzZSBpZiAobm9kZS5pZHggPiBvdGhlck5vZGUuaWR4KSB7XG4gICAgICBvdGhlck5vZGUgPSBvdGhlck5vZGUubmV4dFxuICAgIH0gZWxzZSB7XG4gICAgICBkb3RQcm9kdWN0ICs9IG5vZGUudmFsICogb3RoZXJOb2RlLnZhbFxuICAgICAgbm9kZSA9IG5vZGUubmV4dFxuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZG90UHJvZHVjdFxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGVcbiAqIHNpbWlsYXJpdHkgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5zaW1pbGFyaXR5ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmRvdChvdGhlclZlY3RvcikgLyAodGhpcy5tYWduaXR1ZGUoKSAqIG90aGVyVmVjdG9yLm1hZ25pdHVkZSgpKVxufVxuLyohXG4gKiBsdW5yLlNvcnRlZFNldFxuICogQ29weXJpZ2h0IChDKSAyMDE2IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5Tb3J0ZWRTZXRzIGFyZSB1c2VkIHRvIG1haW50YWluIGFuIGFycmF5IG9mIHVuaXEgdmFsdWVzIGluIGEgc29ydGVkXG4gKiBvcmRlci5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5Tb3J0ZWRTZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGVuZ3RoID0gMFxuICB0aGlzLmVsZW1lbnRzID0gW11cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzZXQgPSBuZXcgdGhpc1xuXG4gIHNldC5lbGVtZW50cyA9IHNlcmlhbGlzZWREYXRhXG4gIHNldC5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcblxuICByZXR1cm4gc2V0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBuZXcgaXRlbXMgaW50byB0aGUgc2V0IGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIHRvIG1haW50YWluIHRoZVxuICogb3JkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3RzIHRvIGFkZCB0byB0aGlzIHNldC5cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGksIGVsZW1lbnRcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZWxlbWVudCA9IGFyZ3VtZW50c1tpXVxuICAgIGlmICh+dGhpcy5pbmRleE9mKGVsZW1lbnQpKSBjb250aW51ZVxuICAgIHRoaXMuZWxlbWVudHMuc3BsaWNlKHRoaXMubG9jYXRpb25Gb3IoZWxlbWVudCksIDAsIGVsZW1lbnQpXG4gIH1cblxuICB0aGlzLmxlbmd0aCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoXG59XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBzb3J0ZWQgc2V0IGludG8gYW4gYXJyYXkuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc2xpY2UoKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgd2l0aCB0aGUgcmVzdWx0cyBvZiBjYWxsaW5nIGEgcHJvdmlkZWQgZnVuY3Rpb24gb24gZXZlcnlcbiAqIGVsZW1lbnQgaW4gdGhpcyBzb3J0ZWQgc2V0LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUubWFwIGFuZCBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gKiBzZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBmb3IgdGhlIGZ1bmN0aW9uIGZuLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMubWFwKGZuLCBjdHgpXG59XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIHBlciBzb3J0ZWQgc2V0IGVsZW1lbnQuXG4gKlxuICogRGVsZWdhdGVzIHRvIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoIGFuZCBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gKiBzZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKiBmb3IgdGhlIGZ1bmN0aW9uIGZuLlxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLmZvckVhY2goZm4sIGN0eClcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBhIGdpdmVuIGVsZW1lbnQgY2FuIGJlIGZvdW5kIGluIHRoZVxuICogc29ydGVkIHNldCwgb3IgLTEgaWYgaXQgaXMgbm90IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW0gVGhlIG9iamVjdCB0byBsb2NhdGUgaW4gdGhlIHNvcnRlZCBzZXQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKSxcbiAgICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG5cbiAgd2hpbGUgKHNlY3Rpb25MZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90RWxlbSA9PT0gZWxlbSkgcmV0dXJuIHBpdm90XG5cbiAgICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgc3RhcnQgPSBwaXZvdFxuICAgIGlmIChwaXZvdEVsZW0gPiBlbGVtKSBlbmQgPSBwaXZvdFxuXG4gICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0XG4gICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpXG4gICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cbiAgfVxuXG4gIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gIHJldHVybiAtMVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgc29ydGVkIHNldCB0aGF0IGFuIGVsZW1lbnQgc2hvdWxkIGJlXG4gKiBpbnNlcnRlZCBhdCB0byBtYWludGFpbiB0aGUgY3VycmVudCBvcmRlciBvZiB0aGUgc2V0LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IHRoZSBlbGVtZW50IHRvIHNlYXJjaCBmb3IgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxuICogaW4gdGhlIHNvcnRlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW0gVGhlIGVsZW0gdG8gZmluZCB0aGUgcG9zaXRpb24gZm9yIGluIHRoZSBzZXRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5sb2NhdGlvbkZvciA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKSxcbiAgICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG5cbiAgd2hpbGUgKHNlY3Rpb25MZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID4gZWxlbSkgcmV0dXJuIHBpdm90XG4gIGlmIChwaXZvdEVsZW0gPCBlbGVtKSByZXR1cm4gcGl2b3QgKyAxXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsdW5yLlNvcnRlZFNldCB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byBpbnRlcnNlY3Qgd2l0aCB0aGlzIHNldC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICB2YXIgaW50ZXJzZWN0U2V0ID0gbmV3IGx1bnIuU29ydGVkU2V0LFxuICAgICAgaSA9IDAsIGogPSAwLFxuICAgICAgYV9sZW4gPSB0aGlzLmxlbmd0aCwgYl9sZW4gPSBvdGhlclNldC5sZW5ndGgsXG4gICAgICBhID0gdGhpcy5lbGVtZW50cywgYiA9IG90aGVyU2V0LmVsZW1lbnRzXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAoaSA+IGFfbGVuIC0gMSB8fCBqID4gYl9sZW4gLSAxKSBicmVha1xuXG4gICAgaWYgKGFbaV0gPT09IGJbal0pIHtcbiAgICAgIGludGVyc2VjdFNldC5hZGQoYVtpXSlcbiAgICAgIGkrKywgaisrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChhW2ldIDwgYltqXSkge1xuICAgICAgaSsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChhW2ldID4gYltqXSkge1xuICAgICAgaisrXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gaW50ZXJzZWN0U2V0XG59XG5cbi8qKlxuICogTWFrZXMgYSBjb3B5IG9mIHRoaXMgc2V0XG4gKlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjbG9uZSA9IG5ldyBsdW5yLlNvcnRlZFNldFxuXG4gIGNsb25lLmVsZW1lbnRzID0gdGhpcy50b0FycmF5KClcbiAgY2xvbmUubGVuZ3RoID0gY2xvbmUuZWxlbWVudHMubGVuZ3RoXG5cbiAgcmV0dXJuIGNsb25lXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsdW5yLlNvcnRlZFNldCB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBpbiB0aGUgdW5pb25cbiAqIG9mIHRoaXMgc2V0IGFuZCB0aGUgcGFzc2VkIHNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuU29ydGVkU2V0fSBvdGhlclNldCBUaGUgc2V0IHRvIHVuaW9uIHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICB2YXIgbG9uZ1NldCwgc2hvcnRTZXQsIHVuaW9uU2V0XG5cbiAgaWYgKHRoaXMubGVuZ3RoID49IG90aGVyU2V0Lmxlbmd0aCkge1xuICAgIGxvbmdTZXQgPSB0aGlzLCBzaG9ydFNldCA9IG90aGVyU2V0XG4gIH0gZWxzZSB7XG4gICAgbG9uZ1NldCA9IG90aGVyU2V0LCBzaG9ydFNldCA9IHRoaXNcbiAgfVxuXG4gIHVuaW9uU2V0ID0gbG9uZ1NldC5jbG9uZSgpXG5cbiAgZm9yKHZhciBpID0gMCwgc2hvcnRTZXRFbGVtZW50cyA9IHNob3J0U2V0LnRvQXJyYXkoKTsgaSA8IHNob3J0U2V0RWxlbWVudHMubGVuZ3RoOyBpKyspe1xuICAgIHVuaW9uU2V0LmFkZChzaG9ydFNldEVsZW1lbnRzW2ldKVxuICB9XG5cbiAgcmV0dXJuIHVuaW9uU2V0XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzb3J0ZWQgc2V0IHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9BcnJheSgpXG59XG4vKiFcbiAqIGx1bnIuSW5kZXhcbiAqIENvcHlyaWdodCAoQykgMjAxNiBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuSW5kZXggaXMgb2JqZWN0IHRoYXQgbWFuYWdlcyBhIHNlYXJjaCBpbmRleC4gIEl0IGNvbnRhaW5zIHRoZSBpbmRleGVzXG4gKiBhbmQgc3RvcmVzIGFsbCB0aGUgdG9rZW5zIGFuZCBkb2N1bWVudCBsb29rdXBzLiAgSXQgYWxzbyBwcm92aWRlcyB0aGUgbWFpblxuICogdXNlciBmYWNpbmcgQVBJIGZvciB0aGUgbGlicmFyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5JbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fZmllbGRzID0gW11cbiAgdGhpcy5fcmVmID0gJ2lkJ1xuICB0aGlzLnBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcbiAgdGhpcy5kb2N1bWVudFN0b3JlID0gbmV3IGx1bnIuU3RvcmVcbiAgdGhpcy50b2tlblN0b3JlID0gbmV3IGx1bnIuVG9rZW5TdG9yZVxuICB0aGlzLmNvcnB1c1Rva2VucyA9IG5ldyBsdW5yLlNvcnRlZFNldFxuICB0aGlzLmV2ZW50RW1pdHRlciA9ICBuZXcgbHVuci5FdmVudEVtaXR0ZXJcbiAgdGhpcy50b2tlbml6ZXJGbiA9IGx1bnIudG9rZW5pemVyXG5cbiAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuXG4gIHRoaXMub24oJ2FkZCcsICdyZW1vdmUnLCAndXBkYXRlJywgKGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZGZDYWNoZSA9IHt9XG4gIH0pLmJpbmQodGhpcykpXG59XG5cbi8qKlxuICogQmluZCBhIGhhbmRsZXIgdG8gZXZlbnRzIGJlaW5nIGVtaXR0ZWQgYnkgdGhlIGluZGV4LlxuICpcbiAqIFRoZSBoYW5kbGVyIGNhbiBiZSBib3VuZCB0byBtYW55IGV2ZW50cyBhdCB0aGUgc2FtZSB0aW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGUgZnVuY3Rpb24gdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gIHJldHVybiB0aGlzLmV2ZW50RW1pdHRlci5hZGRMaXN0ZW5lci5hcHBseSh0aGlzLmV2ZW50RW1pdHRlciwgYXJncylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgaGFuZGxlciBmcm9tIGFuIGV2ZW50IGJlaW5nIGVtaXR0ZWQgYnkgdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgZXZlbnRzIHRvIHJlbW92ZSB0aGUgZnVuY3Rpb24gZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgZm4pXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogSXNzdWVzIGEgd2FybmluZyBpZiB0aGUgaW5kZXggYmVpbmcgaW1wb3J0ZWQgd2FzIHNlcmlhbGlzZWRcbiAqIGJ5IGEgZGlmZmVyZW50IHZlcnNpb24gb2YgbHVuci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgaWYgKHNlcmlhbGlzZWREYXRhLnZlcnNpb24gIT09IGx1bnIudmVyc2lvbikge1xuICAgIGx1bnIudXRpbHMud2FybigndmVyc2lvbiBtaXNtYXRjaDogY3VycmVudCAnICsgbHVuci52ZXJzaW9uICsgJyBpbXBvcnRpbmcgJyArIHNlcmlhbGlzZWREYXRhLnZlcnNpb24pXG4gIH1cblxuICB2YXIgaWR4ID0gbmV3IHRoaXNcblxuICBpZHguX2ZpZWxkcyA9IHNlcmlhbGlzZWREYXRhLmZpZWxkc1xuICBpZHguX3JlZiA9IHNlcmlhbGlzZWREYXRhLnJlZlxuXG4gIGlkeC50b2tlbml6ZXIobHVuci50b2tlbml6ZXIubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlbml6ZXIpKVxuICBpZHguZG9jdW1lbnRTdG9yZSA9IGx1bnIuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS5kb2N1bWVudFN0b3JlKVxuICBpZHgudG9rZW5TdG9yZSA9IGx1bnIuVG9rZW5TdG9yZS5sb2FkKHNlcmlhbGlzZWREYXRhLnRva2VuU3RvcmUpXG4gIGlkeC5jb3JwdXNUb2tlbnMgPSBsdW5yLlNvcnRlZFNldC5sb2FkKHNlcmlhbGlzZWREYXRhLmNvcnB1c1Rva2VucylcbiAgaWR4LnBpcGVsaW5lID0gbHVuci5QaXBlbGluZS5sb2FkKHNlcmlhbGlzZWREYXRhLnBpcGVsaW5lKVxuXG4gIHJldHVybiBpZHhcbn1cblxuLyoqXG4gKiBBZGRzIGEgZmllbGQgdG8gdGhlIGxpc3Qgb2YgZmllbGRzIHRoYXQgd2lsbCBiZSBzZWFyY2hhYmxlIHdpdGhpbiBkb2N1bWVudHNcbiAqIGluIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBvcHRpb25hbCBib29zdCBwYXJhbSBjYW4gYmUgcGFzc2VkIHRvIGFmZmVjdCBob3cgbXVjaCB0b2tlbnMgaW4gdGhpcyBmaWVsZFxuICogcmFuayBpbiBzZWFyY2ggcmVzdWx0cywgYnkgZGVmYXVsdCB0aGUgYm9vc3QgdmFsdWUgaXMgMS5cbiAqXG4gKiBGaWVsZHMgc2hvdWxkIGJlIGFkZGVkIGJlZm9yZSBhbnkgZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgaW5kZXgsIGZpZWxkc1xuICogdGhhdCBhcmUgYWRkZWQgYWZ0ZXIgZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgaW5kZXggd2lsbCBvbmx5IGFwcGx5IHRvIG5ld1xuICogZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGROYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGRvY3VtZW50IHRoYXRcbiAqIHNob3VsZCBiZSBpbmRleGVkXG4gKiBAcGFyYW0ge051bWJlcn0gYm9vc3QgQW4gb3B0aW9uYWwgYm9vc3QgdGhhdCBjYW4gYmUgYXBwbGllZCB0byB0ZXJtcyBpbiB0aGlzXG4gKiBmaWVsZC5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24gKGZpZWxkTmFtZSwgb3B0cykge1xuICB2YXIgb3B0cyA9IG9wdHMgfHwge30sXG4gICAgICBmaWVsZCA9IHsgbmFtZTogZmllbGROYW1lLCBib29zdDogb3B0cy5ib29zdCB8fCAxIH1cblxuICB0aGlzLl9maWVsZHMucHVzaChmaWVsZClcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBwcm9wZXJ0eSB1c2VkIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXgsXG4gKiBieSBkZWZhdWx0IHRoaXMgcHJvcGVydHkgaXMgJ2lkJy5cbiAqXG4gKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNoYW5nZWQgYmVmb3JlIGFkZGluZyBkb2N1bWVudHMgdG8gdGhlIGluZGV4LCBjaGFuZ2luZ1xuICogdGhlIHJlZiBwcm9wZXJ0eSB3aXRob3V0IHJlc2V0dGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIFRoZSB2YWx1ZSBvZiByZWYgY2FuIGJlIG9mIGFueSB0eXBlIGJ1dCBpdCBfbXVzdF8gYmUgc3RhYmx5IGNvbXBhcmFibGUgYW5kXG4gKiBvcmRlcmFibGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZk5hbWUgVGhlIHByb3BlcnR5IHRvIHVzZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGVcbiAqIGRvY3VtZW50cyBpbiB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgYWRkIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24gKHJlZk5hbWUpIHtcbiAgdGhpcy5fcmVmID0gcmVmTmFtZVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHRva2VuaXplciB1c2VkIGZvciB0aGlzIGluZGV4LlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGluZGV4IHdpbGwgdXNlIHRoZSBkZWZhdWx0IHRva2VuaXplciwgbHVuci50b2tlbml6ZXIuIFRoZSB0b2tlbml6ZXJcbiAqIHNob3VsZCBvbmx5IGJlIGNoYW5nZWQgYmVmb3JlIGFkZGluZyBkb2N1bWVudHMgdG8gdGhlIGluZGV4LiBDaGFuZ2luZyB0aGUgdG9rZW5pemVyXG4gKiB3aXRob3V0IHJlLWJ1aWxkaW5nIHRoZSBpbmRleCBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHVzZSBhcyBhIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRva2VuaXplciA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIGx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCBhIHJlZ2lzdGVyZWQgdG9rZW5pemVyLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleCcpXG4gIH1cblxuICB0aGlzLnRva2VuaXplckZuID0gZm5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBZGQgYSBkb2N1bWVudCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpcyB0aGUgd2F5IG5ldyBkb2N1bWVudHMgZW50ZXIgdGhlIGluZGV4LCB0aGlzIGZ1bmN0aW9uIHdpbGwgcnVuIHRoZVxuICogZmllbGRzIGZyb20gdGhlIGRvY3VtZW50IHRocm91Z2ggdGhlIGluZGV4J3MgcGlwZWxpbmUgYW5kIHRoZW4gYWRkIGl0IHRvXG4gKiB0aGUgaW5kZXgsIGl0IHdpbGwgdGhlbiBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzLlxuICpcbiAqIEFuICdhZGQnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiBhZGRlZCBhbmQgdGhlIGluZGV4XG4gKiB0aGUgZG9jdW1lbnQgaGFzIGJlZW4gYWRkZWQgdG8uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYWRkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIGFkZCB0byB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIG9yIG5vdCB0byBlbWl0IGV2ZW50cywgZGVmYXVsdCB0cnVlLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZG9jVG9rZW5zID0ge30sXG4gICAgICBhbGxEb2N1bWVudFRva2VucyA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdLFxuICAgICAgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgdGhpcy5fZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgdmFyIGZpZWxkVG9rZW5zID0gdGhpcy5waXBlbGluZS5ydW4odGhpcy50b2tlbml6ZXJGbihkb2NbZmllbGQubmFtZV0pKVxuXG4gICAgZG9jVG9rZW5zW2ZpZWxkLm5hbWVdID0gZmllbGRUb2tlbnNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlbiA9IGZpZWxkVG9rZW5zW2ldXG4gICAgICBhbGxEb2N1bWVudFRva2Vucy5hZGQodG9rZW4pXG4gICAgICB0aGlzLmNvcnB1c1Rva2Vucy5hZGQodG9rZW4pXG4gICAgfVxuICB9LCB0aGlzKVxuXG4gIHRoaXMuZG9jdW1lbnRTdG9yZS5zZXQoZG9jUmVmLCBhbGxEb2N1bWVudFRva2VucylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbERvY3VtZW50VG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gYWxsRG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV1cbiAgICB2YXIgdGYgPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBqKyspe1xuICAgICAgdmFyIGZpZWxkID0gdGhpcy5fZmllbGRzW2pdXG4gICAgICB2YXIgZmllbGRUb2tlbnMgPSBkb2NUb2tlbnNbZmllbGQubmFtZV1cbiAgICAgIHZhciBmaWVsZExlbmd0aCA9IGZpZWxkVG9rZW5zLmxlbmd0aFxuXG4gICAgICBpZiAoIWZpZWxkTGVuZ3RoKSBjb250aW51ZVxuXG4gICAgICB2YXIgdG9rZW5Db3VudCA9IDBcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZmllbGRMZW5ndGg7IGsrKyl7XG4gICAgICAgIGlmIChmaWVsZFRva2Vuc1trXSA9PT0gdG9rZW4pe1xuICAgICAgICAgIHRva2VuQ291bnQrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRmICs9ICh0b2tlbkNvdW50IC8gZmllbGRMZW5ndGggKiBmaWVsZC5ib29zdClcbiAgICB9XG5cbiAgICB0aGlzLnRva2VuU3RvcmUuYWRkKHRva2VuLCB7IHJlZjogZG9jUmVmLCB0ZjogdGYgfSlcbiAgfTtcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdhZGQnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGRvY3VtZW50IGZyb20gdGhlIGluZGV4LlxuICpcbiAqIFRvIG1ha2Ugc3VyZSBkb2N1bWVudHMgbm8gbG9uZ2VyIHNob3cgdXAgaW4gc2VhcmNoIHJlc3VsdHMgdGhleSBjYW4gYmVcbiAqIHJlbW92ZWQgZnJvbSB0aGUgaW5kZXggdXNpbmcgdGhpcyBtZXRob2QuXG4gKlxuICogVGhlIGRvY3VtZW50IHBhc3NlZCBvbmx5IG5lZWRzIHRvIGhhdmUgdGhlIHNhbWUgcmVmIHByb3BlcnR5IHZhbHVlIGFzIHRoZVxuICogZG9jdW1lbnQgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGluZGV4LCB0aGV5IGNvdWxkIGJlIGNvbXBsZXRlbHkgZGlmZmVyZW50XG4gKiBvYmplY3RzLlxuICpcbiAqIEEgJ3JlbW92ZScgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIHJlbW92ZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIHJlbW92ZWQgZnJvbS4gVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZVxuICogYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byByZW1vdmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHJlbW92ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdLFxuICAgICAgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgaWYgKCF0aGlzLmRvY3VtZW50U3RvcmUuaGFzKGRvY1JlZikpIHJldHVyblxuXG4gIHZhciBkb2NUb2tlbnMgPSB0aGlzLmRvY3VtZW50U3RvcmUuZ2V0KGRvY1JlZilcblxuICB0aGlzLmRvY3VtZW50U3RvcmUucmVtb3ZlKGRvY1JlZilcblxuICBkb2NUb2tlbnMuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuU3RvcmUucmVtb3ZlKHRva2VuLCBkb2NSZWYpXG4gIH0sIHRoaXMpXG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgncmVtb3ZlJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFVwZGF0ZXMgYSBkb2N1bWVudCBpbiB0aGUgaW5kZXguXG4gKlxuICogV2hlbiBhIGRvY3VtZW50IGNvbnRhaW5lZCB3aXRoaW4gdGhlIGluZGV4IGdldHMgdXBkYXRlZCwgZmllbGRzIGNoYW5nZWQsXG4gKiBhZGRlZCBvciByZW1vdmVkLCB0byBtYWtlIHN1cmUgaXQgY29ycmVjdGx5IG1hdGNoZWQgYWdhaW5zdCBzZWFyY2ggcXVlcmllcyxcbiAqIGl0IHNob3VsZCBiZSB1cGRhdGVkIGluIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBqdXN0IGEgd3JhcHBlciBhcm91bmQgYHJlbW92ZWAgYW5kIGBhZGRgXG4gKlxuICogQW4gJ3VwZGF0ZScgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIHVwZGF0ZWQgYW5kIHRoZSBpbmRleC5cbiAqIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2UgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB1cGRhdGUuIE9ubHlcbiAqIGFuIHVwZGF0ZSBldmVudCB3aWxsIGJlIGZpcmVkLCB0aGUgJ2FkZCcgYW5kICdyZW1vdmUnIGV2ZW50cyBvZiB0aGUgdW5kZXJseWluZyBjYWxsc1xuICogYXJlIHNpbGVuY2VkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHVwZGF0ZSBpbiB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgdXBkYXRlIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUucmVtb3ZlXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5hZGRcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMucmVtb3ZlKGRvYywgZmFsc2UpXG4gIHRoaXMuYWRkKGRvYywgZmFsc2UpXG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgndXBkYXRlJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2UgZG9jdW1lbnQgZnJlcXVlbmN5IGZvciBhIHRva2VuIHdpdGhpbiB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBjYWxjdWxhdGUgdGhlIGlkZiBvZi5cbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmlkZlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5pZGYgPSBmdW5jdGlvbiAodGVybSkge1xuICB2YXIgY2FjaGVLZXkgPSBcIkBcIiArIHRlcm1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9pZGZDYWNoZSwgY2FjaGVLZXkpKSByZXR1cm4gdGhpcy5faWRmQ2FjaGVbY2FjaGVLZXldXG5cbiAgdmFyIGRvY3VtZW50RnJlcXVlbmN5ID0gdGhpcy50b2tlblN0b3JlLmNvdW50KHRlcm0pLFxuICAgICAgaWRmID0gMVxuXG4gIGlmIChkb2N1bWVudEZyZXF1ZW5jeSA+IDApIHtcbiAgICBpZGYgPSAxICsgTWF0aC5sb2codGhpcy5kb2N1bWVudFN0b3JlLmxlbmd0aCAvIGRvY3VtZW50RnJlcXVlbmN5KVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XSA9IGlkZlxufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBpbmRleCB1c2luZyB0aGUgcGFzc2VkIHF1ZXJ5LlxuICpcbiAqIFF1ZXJpZXMgc2hvdWxkIGJlIGEgc3RyaW5nLCBtdWx0aXBsZSB3b3JkcyBhcmUgYWxsb3dlZCBhbmQgd2lsbCBsZWFkIHRvIGFuXG4gKiBBTkQgYmFzZWQgcXVlcnksIGUuZy4gYGlkeC5zZWFyY2goJ2ZvbyBiYXInKWAgd2lsbCBydW4gYSBzZWFyY2ggZm9yXG4gKiBkb2N1bWVudHMgY29udGFpbmluZyBib3RoICdmb28nIGFuZCAnYmFyJy5cbiAqXG4gKiBBbGwgcXVlcnkgdG9rZW5zIGFyZSBwYXNzZWQgdGhyb3VnaCB0aGUgc2FtZSBwaXBlbGluZSB0aGF0IGRvY3VtZW50IHRva2Vuc1xuICogYXJlIHBhc3NlZCB0aHJvdWdoLCBzbyBhbnkgbGFuZ3VhZ2UgcHJvY2Vzc2luZyBpbnZvbHZlZCB3aWxsIGJlIHJ1biBvbiBldmVyeVxuICogcXVlcnkgdGVybS5cbiAqXG4gKiBFYWNoIHF1ZXJ5IHRlcm0gaXMgZXhwYW5kZWQsIHNvIHRoYXQgdGhlIHRlcm0gJ2hlJyBtaWdodCBiZSBleHBhbmRlZCB0b1xuICogJ2hlbGxvJyBhbmQgJ2hlbHAnIGlmIHRob3NlIHRlcm1zIHdlcmUgYWxyZWFkeSBpbmNsdWRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogTWF0Y2hpbmcgZG9jdW1lbnRzIGFyZSByZXR1cm5lZCBhcyBhbiBhcnJheSBvZiBvYmplY3RzLCBlYWNoIG9iamVjdCBjb250YWluc1xuICogdGhlIG1hdGNoaW5nIGRvY3VtZW50IHJlZiwgYXMgc2V0IGZvciB0aGlzIGluZGV4LCBhbmQgdGhlIHNpbWlsYXJpdHkgc2NvcmVcbiAqIGZvciB0aGlzIGRvY3VtZW50IGFnYWluc3QgdGhlIHF1ZXJ5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIHRoZSBpbmRleCB3aXRoLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmlkZlxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3JcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgdmFyIHF1ZXJ5VG9rZW5zID0gdGhpcy5waXBlbGluZS5ydW4odGhpcy50b2tlbml6ZXJGbihxdWVyeSkpLFxuICAgICAgcXVlcnlWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3IsXG4gICAgICBkb2N1bWVudFNldHMgPSBbXSxcbiAgICAgIGZpZWxkQm9vc3RzID0gdGhpcy5fZmllbGRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgZikgeyByZXR1cm4gbWVtbyArIGYuYm9vc3QgfSwgMClcblxuICB2YXIgaGFzU29tZVRva2VuID0gcXVlcnlUb2tlbnMuc29tZShmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4gdGhpcy50b2tlblN0b3JlLmhhcyh0b2tlbilcbiAgfSwgdGhpcylcblxuICBpZiAoIWhhc1NvbWVUb2tlbikgcmV0dXJuIFtdXG5cbiAgcXVlcnlUb2tlbnNcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4sIGksIHRva2Vucykge1xuICAgICAgdmFyIHRmID0gMSAvIHRva2Vucy5sZW5ndGggKiB0aGlzLl9maWVsZHMubGVuZ3RoICogZmllbGRCb29zdHMsXG4gICAgICAgICAgc2VsZiA9IHRoaXNcblxuICAgICAgdmFyIHNldCA9IHRoaXMudG9rZW5TdG9yZS5leHBhbmQodG9rZW4pLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgICAgIHZhciBwb3MgPSBzZWxmLmNvcnB1c1Rva2Vucy5pbmRleE9mKGtleSksXG4gICAgICAgICAgICBpZGYgPSBzZWxmLmlkZihrZXkpLFxuICAgICAgICAgICAgc2ltaWxhcml0eUJvb3N0ID0gMSxcbiAgICAgICAgICAgIHNldCA9IG5ldyBsdW5yLlNvcnRlZFNldFxuXG4gICAgICAgIC8vIGlmIHRoZSBleHBhbmRlZCBrZXkgaXMgbm90IGFuIGV4YWN0IG1hdGNoIHRvIHRoZSB0b2tlbiB0aGVuXG4gICAgICAgIC8vIHBlbmFsaXNlIHRoZSBzY29yZSBmb3IgdGhpcyBrZXkgYnkgaG93IGRpZmZlcmVudCB0aGUga2V5IGlzXG4gICAgICAgIC8vIHRvIHRoZSB0b2tlbi5cbiAgICAgICAgaWYgKGtleSAhPT0gdG9rZW4pIHtcbiAgICAgICAgICB2YXIgZGlmZiA9IE1hdGgubWF4KDMsIGtleS5sZW5ndGggLSB0b2tlbi5sZW5ndGgpXG4gICAgICAgICAgc2ltaWxhcml0eUJvb3N0ID0gMSAvIE1hdGgubG9nKGRpZmYpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHF1ZXJ5IHRmLWlkZiBzY29yZSBmb3IgdGhpcyB0b2tlblxuICAgICAgICAvLyBhcHBseWluZyBhbiBzaW1pbGFyaXR5Qm9vc3QgdG8gZW5zdXJlIGV4YWN0IG1hdGNoZXNcbiAgICAgICAgLy8gdGhlc2UgcmFuayBoaWdoZXIgdGhhbiBleHBhbmRlZCB0ZXJtc1xuICAgICAgICBpZiAocG9zID4gLTEpIHF1ZXJ5VmVjdG9yLmluc2VydChwb3MsIHRmICogaWRmICogc2ltaWxhcml0eUJvb3N0KVxuXG4gICAgICAgIC8vIGFkZCBhbGwgdGhlIGRvY3VtZW50cyB0aGF0IGhhdmUgdGhpcyBrZXkgaW50byBhIHNldFxuICAgICAgICAvLyBlbnN1cmluZyB0aGF0IHRoZSB0eXBlIG9mIGtleSBpcyBwcmVzZXJ2ZWRcbiAgICAgICAgdmFyIG1hdGNoaW5nRG9jdW1lbnRzID0gc2VsZi50b2tlblN0b3JlLmdldChrZXkpLFxuICAgICAgICAgICAgcmVmcyA9IE9iamVjdC5rZXlzKG1hdGNoaW5nRG9jdW1lbnRzKSxcbiAgICAgICAgICAgIHJlZnNMZW4gPSByZWZzLmxlbmd0aFxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmc0xlbjsgaSsrKSB7XG4gICAgICAgICAgc2V0LmFkZChtYXRjaGluZ0RvY3VtZW50c1tyZWZzW2ldXS5yZWYpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVtby51bmlvbihzZXQpXG4gICAgICB9LCBuZXcgbHVuci5Tb3J0ZWRTZXQpXG5cbiAgICAgIGRvY3VtZW50U2V0cy5wdXNoKHNldClcbiAgICB9LCB0aGlzKVxuXG4gIHZhciBkb2N1bWVudFNldCA9IGRvY3VtZW50U2V0cy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHNldCkge1xuICAgIHJldHVybiBtZW1vLmludGVyc2VjdChzZXQpXG4gIH0pXG5cbiAgcmV0dXJuIGRvY3VtZW50U2V0XG4gICAgLm1hcChmdW5jdGlvbiAocmVmKSB7XG4gICAgICByZXR1cm4geyByZWY6IHJlZiwgc2NvcmU6IHF1ZXJ5VmVjdG9yLnNpbWlsYXJpdHkodGhpcy5kb2N1bWVudFZlY3RvcihyZWYpKSB9XG4gICAgfSwgdGhpcylcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgfSlcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB2ZWN0b3IgY29udGFpbmluZyBhbGwgdGhlIHRva2VucyBpbiB0aGUgZG9jdW1lbnQgbWF0Y2hpbmcgdGhlXG4gKiBwYXNzZWQgZG9jdW1lbnRSZWYuXG4gKlxuICogVGhlIHZlY3RvciBjb250YWlucyB0aGUgdGYtaWRmIHNjb3JlIGZvciBlYWNoIHRva2VuIGNvbnRhaW5lZCBpbiB0aGVcbiAqIGRvY3VtZW50IHdpdGggdGhlIHBhc3NlZCBkb2N1bWVudFJlZi4gIFRoZSB2ZWN0b3Igd2lsbCBjb250YWluIGFuIGVsZW1lbnRcbiAqIGZvciBldmVyeSB0b2tlbiBpbiB0aGUgaW5kZXhlcyBjb3JwdXMsIGlmIHRoZSBkb2N1bWVudCBkb2VzIG5vdCBjb250YWluIHRoYXRcbiAqIHRva2VuIHRoZSBlbGVtZW50IHdpbGwgYmUgMC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jdW1lbnRSZWYgVGhlIHJlZiB0byBmaW5kIHRoZSBkb2N1bWVudCB3aXRoLlxuICogQHJldHVybnMge2x1bnIuVmVjdG9yfVxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5kb2N1bWVudFZlY3RvciA9IGZ1bmN0aW9uIChkb2N1bWVudFJlZikge1xuICB2YXIgZG9jdW1lbnRUb2tlbnMgPSB0aGlzLmRvY3VtZW50U3RvcmUuZ2V0KGRvY3VtZW50UmVmKSxcbiAgICAgIGRvY3VtZW50VG9rZW5zTGVuZ3RoID0gZG9jdW1lbnRUb2tlbnMubGVuZ3RoLFxuICAgICAgZG9jdW1lbnRWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3JcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY3VtZW50VG9rZW5zTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSBkb2N1bWVudFRva2Vucy5lbGVtZW50c1tpXSxcbiAgICAgICAgdGYgPSB0aGlzLnRva2VuU3RvcmUuZ2V0KHRva2VuKVtkb2N1bWVudFJlZl0udGYsXG4gICAgICAgIGlkZiA9IHRoaXMuaWRmKHRva2VuKVxuXG4gICAgZG9jdW1lbnRWZWN0b3IuaW5zZXJ0KHRoaXMuY29ycHVzVG9rZW5zLmluZGV4T2YodG9rZW4pLCB0ZiAqIGlkZilcbiAgfTtcblxuICByZXR1cm4gZG9jdW1lbnRWZWN0b3Jcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZGV4IHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246IGx1bnIudmVyc2lvbixcbiAgICBmaWVsZHM6IHRoaXMuX2ZpZWxkcyxcbiAgICByZWY6IHRoaXMuX3JlZixcbiAgICB0b2tlbml6ZXI6IHRoaXMudG9rZW5pemVyRm4ubGFiZWwsXG4gICAgZG9jdW1lbnRTdG9yZTogdGhpcy5kb2N1bWVudFN0b3JlLnRvSlNPTigpLFxuICAgIHRva2VuU3RvcmU6IHRoaXMudG9rZW5TdG9yZS50b0pTT04oKSxcbiAgICBjb3JwdXNUb2tlbnM6IHRoaXMuY29ycHVzVG9rZW5zLnRvSlNPTigpLFxuICAgIHBpcGVsaW5lOiB0aGlzLnBpcGVsaW5lLnRvSlNPTigpXG4gIH1cbn1cblxuLyoqXG4gKiBBcHBsaWVzIGEgcGx1Z2luIHRvIHRoZSBjdXJyZW50IGluZGV4LlxuICpcbiAqIEEgcGx1Z2luIGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYXMgaXRzIGNvbnRleHQuXG4gKiBQbHVnaW5zIGNhbiBiZSB1c2VkIHRvIGN1c3RvbWlzZSBvciBleHRlbmQgdGhlIGJlaGF2aW91ciB0aGUgaW5kZXhcbiAqIGluIHNvbWUgd2F5LiBBIHBsdWdpbiBpcyBqdXN0IGEgZnVuY3Rpb24sIHRoYXQgZW5jYXBzdWxhdGVkIHRoZSBjdXN0b21cbiAqIGJlaGF2aW91ciB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBhcmd1bWVudCwgYWRkaXRpb25hbFxuICogYXJndW1lbnRzIGNhbiBhbHNvIGJlIHBhc3NlZCB3aGVuIGNhbGxpbmcgdXNlLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBteVBsdWdpbiA9IGZ1bmN0aW9uIChpZHgsIGFyZzEsIGFyZzIpIHtcbiAqICAgICAgIC8vIGB0aGlzYCBpcyB0aGUgaW5kZXggdG8gYmUgZXh0ZW5kZWRcbiAqICAgICAgIC8vIGFwcGx5IGFueSBleHRlbnNpb25zIGV0YyBoZXJlLlxuICogICAgIH1cbiAqXG4gKiAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICogICAgICAgdGhpcy51c2UobXlQbHVnaW4sICdhcmcxJywgJ2FyZzInKVxuICogICAgIH0pXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGx1Z2luIFRoZSBwbHVnaW4gdG8gYXBwbHkuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgYXJncy51bnNoaWZ0KHRoaXMpXG4gIHBsdWdpbi5hcHBseSh0aGlzLCBhcmdzKVxufVxuLyohXG4gKiBsdW5yLlN0b3JlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlN0b3JlIGlzIGEgc2ltcGxlIGtleS12YWx1ZSBzdG9yZSB1c2VkIGZvciBzdG9yaW5nIHNldHMgb2YgdG9rZW5zIGZvclxuICogZG9jdW1lbnRzIHN0b3JlZCBpbiBpbmRleC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtb2R1bGVcbiAqL1xubHVuci5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zdG9yZSA9IHt9XG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHN0b3JlIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5TdG9yZX1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHN0b3JlID0gbmV3IHRoaXNcblxuICBzdG9yZS5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcbiAgc3RvcmUuc3RvcmUgPSBPYmplY3Qua2V5cyhzZXJpYWxpc2VkRGF0YS5zdG9yZSkucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXkpIHtcbiAgICBtZW1vW2tleV0gPSBsdW5yLlNvcnRlZFNldC5sb2FkKHNlcmlhbGlzZWREYXRhLnN0b3JlW2tleV0pXG4gICAgcmV0dXJuIG1lbW9cbiAgfSwge30pXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogU3RvcmVzIHRoZSBnaXZlbiB0b2tlbnMgaW4gdGhlIHN0b3JlIGFnYWluc3QgdGhlIGdpdmVuIGlkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUga2V5IHVzZWQgdG8gc3RvcmUgdGhlIHRva2VucyBhZ2FpbnN0LlxuICogQHBhcmFtIHtPYmplY3R9IHRva2VucyBUaGUgdG9rZW5zIHRvIHN0b3JlIGFnYWluc3QgdGhlIGtleS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoaWQsIHRva2Vucykge1xuICBpZiAoIXRoaXMuaGFzKGlkKSkgdGhpcy5sZW5ndGgrK1xuICB0aGlzLnN0b3JlW2lkXSA9IHRva2Vuc1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgdG9rZW5zIGZyb20gdGhlIHN0b3JlIGZvciBhIGdpdmVuIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB0byBsb29rdXAgYW5kIHJldHJpZXZlIGZyb20gdGhlIHN0b3JlLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIHRoaXMuc3RvcmVbaWRdXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIHN0b3JlIGNvbnRhaW5zIGEga2V5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgdG8gbG9vayB1cCBpbiB0aGUgc3RvcmUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIGlkIGluIHRoaXMuc3RvcmVcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSB2YWx1ZSBmb3IgYSBrZXkgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgdG8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlLlxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpZCkge1xuICBpZiAoIXRoaXMuaGFzKGlkKSkgcmV0dXJuXG5cbiAgZGVsZXRlIHRoaXMuc3RvcmVbaWRdXG4gIHRoaXMubGVuZ3RoLS1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHN0b3JlIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgfVxufVxuXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE2IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLnN0ZW1tZXIgaXMgYW4gZW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLCB0aGlzIGlzIGEgSmF2YVNjcmlwdFxuICogaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvcnRlclN0ZW1tZXIgdGFrZW4gZnJvbSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gc3RlbVxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnN0ZW1tZXIgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIHN0ZXAybGlzdCA9IHtcbiAgICAgIFwiYXRpb25hbFwiIDogXCJhdGVcIixcbiAgICAgIFwidGlvbmFsXCIgOiBcInRpb25cIixcbiAgICAgIFwiZW5jaVwiIDogXCJlbmNlXCIsXG4gICAgICBcImFuY2lcIiA6IFwiYW5jZVwiLFxuICAgICAgXCJpemVyXCIgOiBcIml6ZVwiLFxuICAgICAgXCJibGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImFsbGlcIiA6IFwiYWxcIixcbiAgICAgIFwiZW50bGlcIiA6IFwiZW50XCIsXG4gICAgICBcImVsaVwiIDogXCJlXCIsXG4gICAgICBcIm91c2xpXCIgOiBcIm91c1wiLFxuICAgICAgXCJpemF0aW9uXCIgOiBcIml6ZVwiLFxuICAgICAgXCJhdGlvblwiIDogXCJhdGVcIixcbiAgICAgIFwiYXRvclwiIDogXCJhdGVcIixcbiAgICAgIFwiYWxpc21cIiA6IFwiYWxcIixcbiAgICAgIFwiaXZlbmVzc1wiIDogXCJpdmVcIixcbiAgICAgIFwiZnVsbmVzc1wiIDogXCJmdWxcIixcbiAgICAgIFwib3VzbmVzc1wiIDogXCJvdXNcIixcbiAgICAgIFwiYWxpdGlcIiA6IFwiYWxcIixcbiAgICAgIFwiaXZpdGlcIiA6IFwiaXZlXCIsXG4gICAgICBcImJpbGl0aVwiIDogXCJibGVcIixcbiAgICAgIFwibG9naVwiIDogXCJsb2dcIlxuICAgIH0sXG5cbiAgICBzdGVwM2xpc3QgPSB7XG4gICAgICBcImljYXRlXCIgOiBcImljXCIsXG4gICAgICBcImF0aXZlXCIgOiBcIlwiLFxuICAgICAgXCJhbGl6ZVwiIDogXCJhbFwiLFxuICAgICAgXCJpY2l0aVwiIDogXCJpY1wiLFxuICAgICAgXCJpY2FsXCIgOiBcImljXCIsXG4gICAgICBcImZ1bFwiIDogXCJcIixcbiAgICAgIFwibmVzc1wiIDogXCJcIlxuICAgIH0sXG5cbiAgICBjID0gXCJbXmFlaW91XVwiLCAgICAgICAgICAvLyBjb25zb25hbnRcbiAgICB2ID0gXCJbYWVpb3V5XVwiLCAgICAgICAgICAvLyB2b3dlbFxuICAgIEMgPSBjICsgXCJbXmFlaW91eV0qXCIsICAgIC8vIGNvbnNvbmFudCBzZXF1ZW5jZVxuICAgIFYgPSB2ICsgXCJbYWVpb3VdKlwiLCAgICAgIC8vIHZvd2VsIHNlcXVlbmNlXG5cbiAgICBtZ3IwID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDLCAgICAgICAgICAgICAgIC8vIFtDXVZDLi4uIGlzIG0+MFxuICAgIG1lcTEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBcIihcIiArIFYgKyBcIik/JFwiLCAgLy8gW0NdVkNbVl0gaXMgbT0xXG4gICAgbWdyMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFYgKyBDLCAgICAgICAvLyBbQ11WQ1ZDLi4uIGlzIG0+MVxuICAgIHNfdiA9IFwiXihcIiArIEMgKyBcIik/XCIgKyB2OyAgICAgICAgICAgICAgICAgICAvLyB2b3dlbCBpbiBzdGVtXG5cbiAgdmFyIHJlX21ncjAgPSBuZXcgUmVnRXhwKG1ncjApO1xuICB2YXIgcmVfbWdyMSA9IG5ldyBSZWdFeHAobWdyMSk7XG4gIHZhciByZV9tZXExID0gbmV3IFJlZ0V4cChtZXExKTtcbiAgdmFyIHJlX3NfdiA9IG5ldyBSZWdFeHAoc192KTtcblxuICB2YXIgcmVfMWEgPSAvXiguKz8pKHNzfGkpZXMkLztcbiAgdmFyIHJlMl8xYSA9IC9eKC4rPykoW15zXSlzJC87XG4gIHZhciByZV8xYiA9IC9eKC4rPyllZWQkLztcbiAgdmFyIHJlMl8xYiA9IC9eKC4rPykoZWR8aW5nKSQvO1xuICB2YXIgcmVfMWJfMiA9IC8uJC87XG4gIHZhciByZTJfMWJfMiA9IC8oYXR8Ymx8aXopJC87XG4gIHZhciByZTNfMWJfMiA9IG5ldyBSZWdFeHAoXCIoW15hZWlvdXlsc3pdKVxcXFwxJFwiKTtcbiAgdmFyIHJlNF8xYl8yID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHJlXzFjID0gL14oLis/W15hZWlvdV0peSQvO1xuICB2YXIgcmVfMiA9IC9eKC4rPykoYXRpb25hbHx0aW9uYWx8ZW5jaXxhbmNpfGl6ZXJ8YmxpfGFsbGl8ZW50bGl8ZWxpfG91c2xpfGl6YXRpb258YXRpb258YXRvcnxhbGlzbXxpdmVuZXNzfGZ1bG5lc3N8b3VzbmVzc3xhbGl0aXxpdml0aXxiaWxpdGl8bG9naSkkLztcblxuICB2YXIgcmVfMyA9IC9eKC4rPykoaWNhdGV8YXRpdmV8YWxpemV8aWNpdGl8aWNhbHxmdWx8bmVzcykkLztcblxuICB2YXIgcmVfNCA9IC9eKC4rPykoYWx8YW5jZXxlbmNlfGVyfGljfGFibGV8aWJsZXxhbnR8ZW1lbnR8bWVudHxlbnR8b3V8aXNtfGF0ZXxpdGl8b3VzfGl2ZXxpemUpJC87XG4gIHZhciByZTJfNCA9IC9eKC4rPykoc3x0KShpb24pJC87XG5cbiAgdmFyIHJlXzUgPSAvXiguKz8pZSQvO1xuICB2YXIgcmVfNV8xID0gL2xsJC87XG4gIHZhciByZTNfNSA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciBwb3J0ZXJTdGVtbWVyID0gZnVuY3Rpb24gcG9ydGVyU3RlbW1lcih3KSB7XG4gICAgdmFyICAgc3RlbSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIGZpcnN0Y2gsXG4gICAgICByZSxcbiAgICAgIHJlMixcbiAgICAgIHJlMyxcbiAgICAgIHJlNDtcblxuICAgIGlmICh3Lmxlbmd0aCA8IDMpIHsgcmV0dXJuIHc7IH1cblxuICAgIGZpcnN0Y2ggPSB3LnN1YnN0cigwLDEpO1xuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b1VwcGVyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYVxuICAgIHJlID0gcmVfMWFcbiAgICByZTIgPSByZTJfMWE7XG5cbiAgICBpZiAocmUudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlLFwiJDEkMlwiKTsgfVxuICAgIGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUyLFwiJDEkMlwiKTsgfVxuXG4gICAgLy8gU3RlcCAxYlxuICAgIHJlID0gcmVfMWI7XG4gICAgcmUyID0gcmUyXzFiO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3QoZnBbMV0pKSB7XG4gICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlMiA9IHJlX3NfdjtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgICAgcmUyID0gcmUyXzFiXzI7XG4gICAgICAgIHJlMyA9IHJlM18xYl8yO1xuICAgICAgICByZTQgPSByZTRfMWJfMjtcbiAgICAgICAgaWYgKHJlMi50ZXN0KHcpKSB7ICB3ID0gdyArIFwiZVwiOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlMy50ZXN0KHcpKSB7IHJlID0gcmVfMWJfMjsgdyA9IHcucmVwbGFjZShyZSxcIlwiKTsgfVxuICAgICAgICBlbHNlIGlmIChyZTQudGVzdCh3KSkgeyB3ID0gdyArIFwiZVwiOyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYyAtIHJlcGxhY2Ugc3VmZml4IHkgb3IgWSBieSBpIGlmIHByZWNlZGVkIGJ5IGEgbm9uLXZvd2VsIHdoaWNoIGlzIG5vdCB0aGUgZmlyc3QgbGV0dGVyIG9mIHRoZSB3b3JkIChzbyBjcnkgLT4gY3JpLCBieSAtPiBieSwgc2F5IC0+IHNheSlcbiAgICByZSA9IHJlXzFjO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgdyA9IHN0ZW0gKyBcImlcIjtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDJcbiAgICByZSA9IHJlXzI7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDJsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAzXG4gICAgcmUgPSByZV8zO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAzbGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNFxuICAgIHJlID0gcmVfNDtcbiAgICByZTIgPSByZTJfNDtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmUyLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdICsgZnBbMl07XG4gICAgICByZTIgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNVxuICAgIHJlID0gcmVfNTtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIHJlMiA9IHJlX21lcTE7XG4gICAgICByZTMgPSByZTNfNTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pIHx8IChyZTIudGVzdChzdGVtKSAmJiAhKHJlMy50ZXN0KHN0ZW0pKSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmUgPSByZV81XzE7XG4gICAgcmUyID0gcmVfbWdyMTtcbiAgICBpZiAocmUudGVzdCh3KSAmJiByZTIudGVzdCh3KSkge1xuICAgICAgcmUgPSByZV8xYl8yO1xuICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBhbmQgdHVybiBpbml0aWFsIFkgYmFjayB0byB5XG5cbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9Mb3dlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9O1xuXG4gIHJldHVybiBwb3J0ZXJTdGVtbWVyO1xufSkoKTtcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RlbW1lciwgJ3N0ZW1tZXInKVxuLyohXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgYnVpbGRzIGEgc3RvcFdvcmRGaWx0ZXIgZnVuY3Rpb24gZnJvbSB0aGUgcHJvdmlkZWRcbiAqIGxpc3Qgb2Ygc3RvcCB3b3Jkcy5cbiAqXG4gKiBUaGUgYnVpbHQgaW4gbHVuci5zdG9wV29yZEZpbHRlciBpcyBidWlsdCB1c2luZyB0aGlzIGdlbmVyYXRvciBhbmQgY2FuIGJlIHVzZWRcbiAqIHRvIGdlbmVyYXRlIGN1c3RvbSBzdG9wV29yZEZpbHRlcnMgZm9yIGFwcGxpY2F0aW9ucyBvciBub24gRW5nbGlzaCBsYW5ndWFnZXMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtBcnJheX0gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqIEBzZWUgbHVuci5zdG9wV29yZEZpbHRlclxuICovXG5sdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgPSBmdW5jdGlvbiAoc3RvcFdvcmRzKSB7XG4gIHZhciB3b3JkcyA9IHN0b3BXb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHN0b3BXb3JkKSB7XG4gICAgbWVtb1tzdG9wV29yZF0gPSBzdG9wV29yZFxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodG9rZW4gJiYgd29yZHNbdG9rZW5dICE9PSB0b2tlbikgcmV0dXJuIHRva2VuXG4gIH1cbn1cblxuLyoqXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RvcCB3b3JkIGxpc3QgZmlsdGVyLCBhbnkgd29yZHNcbiAqIGNvbnRhaW5lZCBpbiB0aGUgbGlzdCB3aWxsIG5vdCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyLlxuICpcbiAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB0aGUgUGlwZWxpbmUuIElmIHRoZSB0b2tlbiBkb2VzIG5vdCBwYXNzIHRoZVxuICogZmlsdGVyIHRoZW4gdW5kZWZpbmVkIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnN0b3BXb3JkRmlsdGVyID0gbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyKFtcbiAgJ2EnLFxuICAnYWJsZScsXG4gICdhYm91dCcsXG4gICdhY3Jvc3MnLFxuICAnYWZ0ZXInLFxuICAnYWxsJyxcbiAgJ2FsbW9zdCcsXG4gICdhbHNvJyxcbiAgJ2FtJyxcbiAgJ2Ftb25nJyxcbiAgJ2FuJyxcbiAgJ2FuZCcsXG4gICdhbnknLFxuICAnYXJlJyxcbiAgJ2FzJyxcbiAgJ2F0JyxcbiAgJ2JlJyxcbiAgJ2JlY2F1c2UnLFxuICAnYmVlbicsXG4gICdidXQnLFxuICAnYnknLFxuICAnY2FuJyxcbiAgJ2Nhbm5vdCcsXG4gICdjb3VsZCcsXG4gICdkZWFyJyxcbiAgJ2RpZCcsXG4gICdkbycsXG4gICdkb2VzJyxcbiAgJ2VpdGhlcicsXG4gICdlbHNlJyxcbiAgJ2V2ZXInLFxuICAnZXZlcnknLFxuICAnZm9yJyxcbiAgJ2Zyb20nLFxuICAnZ2V0JyxcbiAgJ2dvdCcsXG4gICdoYWQnLFxuICAnaGFzJyxcbiAgJ2hhdmUnLFxuICAnaGUnLFxuICAnaGVyJyxcbiAgJ2hlcnMnLFxuICAnaGltJyxcbiAgJ2hpcycsXG4gICdob3cnLFxuICAnaG93ZXZlcicsXG4gICdpJyxcbiAgJ2lmJyxcbiAgJ2luJyxcbiAgJ2ludG8nLFxuICAnaXMnLFxuICAnaXQnLFxuICAnaXRzJyxcbiAgJ2p1c3QnLFxuICAnbGVhc3QnLFxuICAnbGV0JyxcbiAgJ2xpa2UnLFxuICAnbGlrZWx5JyxcbiAgJ21heScsXG4gICdtZScsXG4gICdtaWdodCcsXG4gICdtb3N0JyxcbiAgJ211c3QnLFxuICAnbXknLFxuICAnbmVpdGhlcicsXG4gICdubycsXG4gICdub3InLFxuICAnbm90JyxcbiAgJ29mJyxcbiAgJ29mZicsXG4gICdvZnRlbicsXG4gICdvbicsXG4gICdvbmx5JyxcbiAgJ29yJyxcbiAgJ290aGVyJyxcbiAgJ291cicsXG4gICdvd24nLFxuICAncmF0aGVyJyxcbiAgJ3NhaWQnLFxuICAnc2F5JyxcbiAgJ3NheXMnLFxuICAnc2hlJyxcbiAgJ3Nob3VsZCcsXG4gICdzaW5jZScsXG4gICdzbycsXG4gICdzb21lJyxcbiAgJ3RoYW4nLFxuICAndGhhdCcsXG4gICd0aGUnLFxuICAndGhlaXInLFxuICAndGhlbScsXG4gICd0aGVuJyxcbiAgJ3RoZXJlJyxcbiAgJ3RoZXNlJyxcbiAgJ3RoZXknLFxuICAndGhpcycsXG4gICd0aXMnLFxuICAndG8nLFxuICAndG9vJyxcbiAgJ3R3YXMnLFxuICAndXMnLFxuICAnd2FudHMnLFxuICAnd2FzJyxcbiAgJ3dlJyxcbiAgJ3dlcmUnLFxuICAnd2hhdCcsXG4gICd3aGVuJyxcbiAgJ3doZXJlJyxcbiAgJ3doaWNoJyxcbiAgJ3doaWxlJyxcbiAgJ3dobycsXG4gICd3aG9tJyxcbiAgJ3doeScsXG4gICd3aWxsJyxcbiAgJ3dpdGgnLFxuICAnd291bGQnLFxuICAneWV0JyxcbiAgJ3lvdScsXG4gICd5b3VyJ1xuXSlcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RvcFdvcmRGaWx0ZXIsICdzdG9wV29yZEZpbHRlcicpXG4vKiFcbiAqIGx1bnIudHJpbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE2IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci50cmltbWVyIGlzIGEgcGlwZWxpbmUgZnVuY3Rpb24gZm9yIHRyaW1taW5nIG5vbiB3b3JkXG4gKiBjaGFyYWN0ZXJzIGZyb20gdGhlIGJlZ2luaW5nIGFuZCBlbmQgb2YgdG9rZW5zIGJlZm9yZSB0aGV5XG4gKiBlbnRlciB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBtYXkgbm90IHdvcmsgY29ycmVjdGx5IGZvciBub24gbGF0aW5cbiAqIGNoYXJhY3RlcnMgYW5kIHNob3VsZCBlaXRoZXIgYmUgcmVtb3ZlZCBvciBhZGFwdGVkIGZvciB1c2VcbiAqIHdpdGggbGFuZ3VhZ2VzIHdpdGggbm9uLWxhdGluIGNoYXJhY3RlcnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnRyaW1tZXIgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL15cXFcrLywgJycpLnJlcGxhY2UoL1xcVyskLywgJycpXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnRyaW1tZXIsICd0cmltbWVyJylcbi8qIVxuICogbHVuci5zdGVtbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBJbmNsdWRlcyBjb2RlIGZyb20gLSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW4vUG9ydGVyU3RlbW1lci9qcy50eHRcbiAqL1xuXG4vKipcbiAqIGx1bnIuVG9rZW5TdG9yZSBpcyB1c2VkIGZvciBlZmZpY2llbnQgc3RvcmluZyBhbmQgbG9va3VwIG9mIHRoZSByZXZlcnNlXG4gKiBpbmRleCBvZiB0b2tlbiB0byBkb2N1bWVudCByZWYuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuVG9rZW5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yb290ID0geyBkb2NzOiB7fSB9XG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHRva2VuIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHRva2VuIHN0b3JlIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblN0b3JlfVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHN0b3JlID0gbmV3IHRoaXNcblxuICBzdG9yZS5yb290ID0gc2VyaWFsaXNlZERhdGEucm9vdFxuICBzdG9yZS5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcblxuICByZXR1cm4gc3RvcmVcbn1cblxuLyoqXG4gKiBBZGRzIGEgbmV3IHRva2VuIGRvYyBwYWlyIHRvIHRoZSBzdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gc3RvcmUgdGhlIGRvYyB1bmRlclxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jIHRvIHN0b3JlIGFnYWluc3QgdGhlIHRva2VuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0IGxvb2tpbmcgZm9yIHRoZVxuICogY29ycmVjdCBwbGFjZSB0byBlbnRlciB0aGUgZG9jLCBieSBkZWZhdWx0IHRoZSByb290IG9mIHRoaXMgbHVuci5Ub2tlblN0b3JlXG4gKiBpcyB1c2VkLlxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodG9rZW4sIGRvYywgcm9vdCkge1xuICB2YXIgcm9vdCA9IHJvb3QgfHwgdGhpcy5yb290LFxuICAgICAga2V5ID0gdG9rZW4uY2hhckF0KDApLFxuICAgICAgcmVzdCA9IHRva2VuLnNsaWNlKDEpXG5cbiAgaWYgKCEoa2V5IGluIHJvb3QpKSByb290W2tleV0gPSB7ZG9jczoge319XG5cbiAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcm9vdFtrZXldLmRvY3NbZG9jLnJlZl0gPSBkb2NcbiAgICB0aGlzLmxlbmd0aCArPSAxXG4gICAgcmV0dXJuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHJlc3QsIGRvYywgcm9vdFtrZXldKVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBrZXkgaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIGx1bnIuVG9rZW5TdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2hlY2sgZm9yXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICBpZiAoIXRva2VuKSByZXR1cm4gZmFsc2VcblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIW5vZGVbdG9rZW4uY2hhckF0KGkpXSkgcmV0dXJuIGZhbHNlXG5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIGEgbm9kZSBmcm9tIHRoZSB0b2tlbiBzdG9yZSBmb3IgYSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBub2RlIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQHNlZSBUb2tlblN0b3JlLnByb3RvdHlwZS5nZXRcbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0Tm9kZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICBpZiAoIXRva2VuKSByZXR1cm4ge31cblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIW5vZGVbdG9rZW4uY2hhckF0KGkpXSkgcmV0dXJuIHt9XG5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBkb2N1bWVudHMgZm9yIGEgbm9kZSBmb3IgdGhlIGdpdmVuIHRva2VuLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIGRvY3VtZW50cyBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHRva2VuLCByb290KSB7XG4gIHJldHVybiB0aGlzLmdldE5vZGUodG9rZW4sIHJvb3QpLmRvY3MgfHwge31cbn1cblxubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5jb3VudCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5nZXQodG9rZW4sIHJvb3QpKS5sZW5ndGhcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRvY3VtZW50IGlkZW50aWZpZWQgYnkgcmVmIGZyb20gdGhlIHRva2VuIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZiBUaGUgcmVmIG9mIHRoZSBkb2N1bWVudCB0byByZW1vdmUgZnJvbSB0aGlzIHRva2VuLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0b2tlbiwgcmVmKSB7XG4gIGlmICghdG9rZW4pIHJldHVyblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoISh0b2tlbi5jaGFyQXQoaSkgaW4gbm9kZSkpIHJldHVyblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIGRlbGV0ZSBub2RlLmRvY3NbcmVmXVxufVxuXG4vKipcbiAqIEZpbmQgYWxsIHRoZSBwb3NzaWJsZSBzdWZmaXhlcyBvZiB0aGUgcGFzc2VkIHRva2VuIHVzaW5nIHRva2Vuc1xuICogY3VycmVudGx5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGV4cGFuZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZXhwYW5kID0gZnVuY3Rpb24gKHRva2VuLCBtZW1vKSB7XG4gIHZhciByb290ID0gdGhpcy5nZXROb2RlKHRva2VuKSxcbiAgICAgIGRvY3MgPSByb290LmRvY3MgfHwge30sXG4gICAgICBtZW1vID0gbWVtbyB8fCBbXVxuXG4gIGlmIChPYmplY3Qua2V5cyhkb2NzKS5sZW5ndGgpIG1lbW8ucHVzaCh0b2tlbilcblxuICBPYmplY3Qua2V5cyhyb290KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdkb2NzJykgcmV0dXJuXG5cbiAgICAgIG1lbW8uY29uY2F0KHRoaXMuZXhwYW5kKHRva2VuICsga2V5LCBtZW1vKSlcbiAgICB9LCB0aGlzKVxuXG4gIHJldHVybiBtZW1vXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgcm9vdDogdGhpcy5yb290LFxuICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgfVxufVxuXG4gIC8qKlxuICAgKiBleHBvcnQgdGhlIG1vZHVsZSB2aWEgQU1ELCBDb21tb25KUyBvciBhcyBhIGJyb3dzZXIgZ2xvYmFsXG4gICAqIEV4cG9ydCBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZC9ibG9iL21hc3Rlci9yZXR1cm5FeHBvcnRzLmpzXG4gICAqL1xuICA7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgZGVmaW5lKGZhY3RvcnkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8qKlxuICAgICAgICogTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgKiBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICogbGlrZSBOb2RlLlxuICAgICAgICovXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgcm9vdC5sdW5yID0gZmFjdG9yeSgpXG4gICAgfVxuICB9KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBKdXN0IHJldHVybiBhIHZhbHVlIHRvIGRlZmluZSB0aGUgbW9kdWxlIGV4cG9ydC5cbiAgICAgKiBUaGlzIGV4YW1wbGUgcmV0dXJucyBhbiBvYmplY3QsIGJ1dCB0aGUgbW9kdWxlXG4gICAgICogY2FuIHJldHVybiBhIGZ1bmN0aW9uIGFzIHRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICByZXR1cm4gbHVuclxuICB9KSlcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzU2hpbTtcbmlmICghT2JqZWN0LmtleXMpIHtcblx0Ly8gbW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW1cblx0dmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0dmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cdHZhciBoYXNEb250RW51bUJ1ZyA9ICFpc0VudW1lcmFibGUuY2FsbCh7IHRvU3RyaW5nOiBudWxsIH0sICd0b1N0cmluZycpO1xuXHR2YXIgaGFzUHJvdG9FbnVtQnVnID0gaXNFbnVtZXJhYmxlLmNhbGwoZnVuY3Rpb24gKCkge30sICdwcm90b3R5cGUnKTtcblx0dmFyIGRvbnRFbnVtcyA9IFtcblx0XHQndG9TdHJpbmcnLFxuXHRcdCd0b0xvY2FsZVN0cmluZycsXG5cdFx0J3ZhbHVlT2YnLFxuXHRcdCdoYXNPd25Qcm9wZXJ0eScsXG5cdFx0J2lzUHJvdG90eXBlT2YnLFxuXHRcdCdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG5cdFx0J2NvbnN0cnVjdG9yJ1xuXHRdO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUgPSBmdW5jdGlvbiAobykge1xuXHRcdHZhciBjdG9yID0gby5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gY3RvciAmJiBjdG9yLnByb3RvdHlwZSA9PT0gbztcblx0fTtcblx0dmFyIGV4Y2x1ZGVkS2V5cyA9IHtcblx0XHQkYXBwbGljYXRpb25DYWNoZTogdHJ1ZSxcblx0XHQkY29uc29sZTogdHJ1ZSxcblx0XHQkZXh0ZXJuYWw6IHRydWUsXG5cdFx0JGZyYW1lOiB0cnVlLFxuXHRcdCRmcmFtZUVsZW1lbnQ6IHRydWUsXG5cdFx0JGZyYW1lczogdHJ1ZSxcblx0XHQkaW5uZXJIZWlnaHQ6IHRydWUsXG5cdFx0JGlubmVyV2lkdGg6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmNoYW5nZTogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuZXJyb3I6IHRydWUsXG5cdFx0JG91dGVySGVpZ2h0OiB0cnVlLFxuXHRcdCRvdXRlcldpZHRoOiB0cnVlLFxuXHRcdCRwYWdlWE9mZnNldDogdHJ1ZSxcblx0XHQkcGFnZVlPZmZzZXQ6IHRydWUsXG5cdFx0JHBhcmVudDogdHJ1ZSxcblx0XHQkc2Nyb2xsTGVmdDogdHJ1ZSxcblx0XHQkc2Nyb2xsVG9wOiB0cnVlLFxuXHRcdCRzY3JvbGxYOiB0cnVlLFxuXHRcdCRzY3JvbGxZOiB0cnVlLFxuXHRcdCRzZWxmOiB0cnVlLFxuXHRcdCR3ZWJraXRJbmRleGVkREI6IHRydWUsXG5cdFx0JHdlYmtpdFN0b3JhZ2VJbmZvOiB0cnVlLFxuXHRcdCR3aW5kb3c6IHRydWVcblx0fTtcblx0dmFyIGhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1ZyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKHZhciBrIGluIHdpbmRvdykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFleGNsdWRlZEtleXNbJyQnICsga10gJiYgaGFzLmNhbGwod2luZG93LCBrKSAmJiB3aW5kb3dba10gIT09IG51bGwgJiYgdHlwZW9mIHdpbmRvd1trXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0ZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUod2luZG93W2tdKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSgpKTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnKSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHRrZXlzU2hpbSA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG5cdFx0dmFyIGlzT2JqZWN0ID0gb2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnO1xuXHRcdHZhciBpc0Z1bmN0aW9uID0gdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHRcdHZhciBpc0FyZ3VtZW50cyA9IGlzQXJncyhvYmplY3QpO1xuXHRcdHZhciBpc1N0cmluZyA9IGlzT2JqZWN0ICYmIHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdFx0dmFyIHRoZUtleXMgPSBbXTtcblxuXHRcdGlmICghaXNPYmplY3QgJiYgIWlzRnVuY3Rpb24gJiYgIWlzQXJndW1lbnRzKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gYSBub24tb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIHNraXBQcm90byA9IGhhc1Byb3RvRW51bUJ1ZyAmJiBpc0Z1bmN0aW9uO1xuXHRcdGlmIChpc1N0cmluZyAmJiBvYmplY3QubGVuZ3RoID4gMCAmJiAhaGFzLmNhbGwob2JqZWN0LCAwKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzQXJndW1lbnRzICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG9iamVjdC5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGopKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcblx0XHRcdFx0aWYgKCEoc2tpcFByb3RvICYmIG5hbWUgPT09ICdwcm90b3R5cGUnKSAmJiBoYXMuY2FsbChvYmplY3QsIG5hbWUpKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhuYW1lKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaGFzRG9udEVudW1CdWcpIHtcblx0XHRcdHZhciBza2lwQ29uc3RydWN0b3IgPSBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kob2JqZWN0KTtcblxuXHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBkb250RW51bXMubGVuZ3RoOyArK2spIHtcblx0XHRcdFx0aWYgKCEoc2tpcENvbnN0cnVjdG9yICYmIGRvbnRFbnVtc1trXSA9PT0gJ2NvbnN0cnVjdG9yJykgJiYgaGFzLmNhbGwob2JqZWN0LCBkb250RW51bXNba10pKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKGRvbnRFbnVtc1trXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoZUtleXM7XG5cdH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpO1xuXG52YXIgb3JpZ0tleXMgPSBPYmplY3Qua2V5cztcbnZhciBrZXlzU2hpbSA9IG9yaWdLZXlzID8gZnVuY3Rpb24ga2V5cyhvKSB7IHJldHVybiBvcmlnS2V5cyhvKTsgfSA6IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5rZXlzU2hpbS5zaGltID0gZnVuY3Rpb24gc2hpbU9iamVjdEtleXMoKSB7XG5cdGlmIChPYmplY3Qua2V5cykge1xuXHRcdHZhciBrZXlzV29ya3NXaXRoQXJndW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFNhZmFyaSA1LjAgYnVnXG5cdFx0XHR2YXIgYXJncyA9IE9iamVjdC5rZXlzKGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHR9KDEsIDIpKTtcblx0XHRpZiAoIWtleXNXb3Jrc1dpdGhBcmd1bWVudHMpIHtcblx0XHRcdE9iamVjdC5rZXlzID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcblx0XHRcdFx0aWYgKGlzQXJncyhvYmplY3QpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhzbGljZS5jYWxsKG9iamVjdCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMob2JqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdE9iamVjdC5rZXlzID0ga2V5c1NoaW07XG5cdH1cblx0cmV0dXJuIE9iamVjdC5rZXlzIHx8IGtleXNTaGltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHR2YXIgc3RyID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG5cdHZhciBpc0FyZ3MgPSBzdHIgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXHRpZiAoIWlzQXJncykge1xuXHRcdGlzQXJncyA9IHN0ciAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdFx0dmFsdWUgIT09IG51bGwgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0XHR2YWx1ZS5sZW5ndGggPj0gMCAmJlxuXHRcdFx0dG9TdHIuY2FsbCh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHR9XG5cdHJldHVybiBpc0FyZ3M7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5yZXF1aXJlKCdjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcblxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQYXJhbGxheCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGFyYWxsYXgoc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFyYWxsYXgpO1xuXG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSAtMTtcblxuICAgIC8vIEVzdGFibGlzaCBkZWZhdWx0IHNldHRpbmdzXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgc3BlZWQ6IDAuMlxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuZWxlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpKSB7XG4gICAgICB0aGlzLmVsZW1zID0gc2VsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbXMgPSBbc2VsZWN0b3JdO1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQYXJhbGxheCwgW3tcbiAgICBrZXk6ICd1cGRhdGVQb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5lbGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIF90aGlzLmxhc3RQb3NpdGlvbjtcbiAgICAgICAgdmFyIHlQb3NpdGlvbiA9IE1hdGgucm91bmQoKG9mZnNldCAtIF90aGlzLmxhc3RQb3NpdGlvbikgKiBfdGhpcy5zZXR0aW5ncy5zcGVlZCk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIHktYXhpcyB0cmFuc2Zvcm1cbiAgICAgICAgZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwgJyArIHlQb3NpdGlvbiAqIC0xICsgJ3B4LCAwKSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FuaW1hdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIC8vIElmIHRoZSBvZmZzZXQgcG9zaXRpb24gaGFzbid0IGNoYW5nZWQsIHNraXAgdGhpcyBmcmFtZVxuICAgICAgaWYgKHRoaXMubGFzdFBvc2l0aW9uID09PSB3aW5kb3cucGFnZVlPZmZzZXQpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMyLmFuaW1hdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBTYXZlIHRoZSBuZXcgb2Zmc2V0IHBvc2l0aW9uXG4gICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5hbmltYXRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUGFyYWxsYXg7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBhcmFsbGF4O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMS4yLjYnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgcmVkZWZpbmUgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiBrZXkgaW4gdGFyZ2V0O1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQgJiYgIW93bilyZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0KTtcbiAgICAvLyBleHBvcnRcbiAgICBpZihleHBvcnRzW2tleV0gIT0gb3V0KWhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KWV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7IC8vIHdyYXBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTsiLCIvLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIGEgPSBPYmplY3QuYXNzaWduXG4gICAgLCBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuIGEoe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoYSh7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgJCQgICAgPSBhcmd1bWVudHNcbiAgICAsICQkbGVuID0gJCQubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldEtleXMgICAgPSAkLmdldEtleXNcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHNcbiAgICAsIGlzRW51bSAgICAgPSAkLmlzRW51bTtcbiAgd2hpbGUoJCRsZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoJCRbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn0gOiBPYmplY3QuYXNzaWduOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCIvLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZ1xuLy8gZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG52YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKSgnc3JjJylcbiAgLCBUT19TVFJJTkcgPSAndG9TdHJpbmcnXG4gICwgJHRvU3RyaW5nID0gRnVuY3Rpb25bVE9fU1RSSU5HXVxuICAsIFRQTCAgICAgICA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi8kLmNvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywga2V5LCB2YWwsIHNhZmUpe1xuICBpZih0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpe1xuICAgIHZhbC5oYXNPd25Qcm9wZXJ0eShTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgICB2YWwuaGFzT3duUHJvcGVydHkoJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICB9XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKWRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59OyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuLyQudG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgJCQgICAgICA9IGFyZ3VtZW50c1xuICAgICAgLCAkJGxlbiAgID0gJCQubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSAkJGxlbiA+IDEgPyAkJFsxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCAkJGxlbiA+IDIgPyAkJFsyXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIHJlc3VsdFtpbmRleF0gPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi8kLm9iamVjdC1hc3NpZ24nKX0pOyIsInZhciB0cmltID0gcmVxdWlyZSgnc3RyaW5nLnByb3RvdHlwZS50cmltJylcbiAgLCBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIGZvckVhY2goXG4gICAgICB0cmltKGhlYWRlcnMpLnNwbGl0KCdcXG4nKVxuICAgICwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgICAgICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgICAgICBpZiAodHlwZW9mKHJlc3VsdFtrZXldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgICAgICB9XG4gICAgICB9XG4gIClcblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEVTID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvZXM1Jyk7XG52YXIgcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuXG52YXIgbGVmdFdoaXRlc3BhY2UgPSAvXltcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkZdKy87XG52YXIgcmlnaHRXaGl0ZXNwYWNlID0gL1tcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkZdKyQvO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyaW0oKSB7XG5cdHZhciBTID0gRVMuVG9TdHJpbmcoRVMuQ2hlY2tPYmplY3RDb2VyY2libGUodGhpcykpO1xuXHRyZXR1cm4gcmVwbGFjZShyZXBsYWNlKFMsIGxlZnRXaGl0ZXNwYWNlLCAnJyksIHJpZ2h0V2hpdGVzcGFjZSwgJycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIGJvdW5kVHJpbSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBnZXRQb2x5ZmlsbCgpKTtcblxuZGVmaW5lKGJvdW5kVHJpbSwge1xuXHRnZXRQb2x5ZmlsbDogZ2V0UG9seWZpbGwsXG5cdGltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbixcblx0c2hpbTogc2hpbVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYm91bmRUcmltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciB6ZXJvV2lkdGhTcGFjZSA9ICdcXHUyMDBiJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKFN0cmluZy5wcm90b3R5cGUudHJpbSAmJiB6ZXJvV2lkdGhTcGFjZS50cmltKCkgPT09IHplcm9XaWR0aFNwYWNlKSB7XG5cdFx0cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbTtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltU3RyaW5nVHJpbSgpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIHsgdHJpbTogcG9seWZpbGwgfSwgeyB0cmltOiBmdW5jdGlvbiAoKSB7IHJldHVybiBTdHJpbmcucHJvdG90eXBlLnRyaW0gIT09IHBvbHlmaWxsOyB9IH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIilcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcImlzLWZ1bmN0aW9uXCIpXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZShcInBhcnNlLWhlYWRlcnNcIilcbnZhciB4dGVuZCA9IHJlcXVpcmUoXCJ4dGVuZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVhIUlxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlWEhSO1xuY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IHx8IG5vb3BcbmNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCA9IFwid2l0aENyZWRlbnRpYWxzXCIgaW4gKG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKSkgPyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgOiB3aW5kb3cuWERvbWFpblJlcXVlc3RcblxuZm9yRWFjaEFycmF5KFtcImdldFwiLCBcInB1dFwiLCBcInBvc3RcIiwgXCJwYXRjaFwiLCBcImhlYWRcIiwgXCJkZWxldGVcIl0sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGNyZWF0ZVhIUlttZXRob2QgPT09IFwiZGVsZXRlXCIgPyBcImRlbFwiIDogbWV0aG9kXSA9IGZ1bmN0aW9uKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgICAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxuICAgIH1cbn0pXG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIGZvcih2YXIgaSBpbiBvYmope1xuICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgcGFyYW1zID0gdXJpXG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHt1cmk6dXJpfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0geHRlbmQob3B0aW9ucywge3VyaTogdXJpfSlcbiAgICB9XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiBwYXJhbXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlWEhSKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVYSFIob3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgYXJndW1lbnQgbWlzc2luZ1wiKVxuICAgIH1cblxuICAgIHZhciBjYWxsZWQgPSBmYWxzZVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNiT25jZShlcnIsIHJlc3BvbnNlLCBib2R5KXtcbiAgICAgICAgaWYoIWNhbGxlZCl7XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlXG4gICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIGJvZHkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQobG9hZEZ1bmMsIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICAvLyBDaHJvbWUgd2l0aCByZXF1ZXN0VHlwZT1ibG9iIHRocm93cyBlcnJvcnMgYXJyb3VuZCB3aGVuIGV2ZW4gdGVzdGluZyBhY2Nlc3MgdG8gcmVzcG9uc2VUZXh0XG4gICAgICAgIHZhciBib2R5ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgZ2V0WG1sKHhocilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0pzb24pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yRnVuYyhldnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYoIShldnQgaW5zdGFuY2VvZiBFcnJvcikpe1xuICAgICAgICAgICAgZXZ0ID0gbmV3IEVycm9yKFwiXCIgKyAoZXZ0IHx8IFwiVW5rbm93biBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKSApXG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnN0YXR1c0NvZGUgPSAwXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhldnQsIGZhaWx1cmVSZXNwb25zZSlcbiAgICB9XG5cbiAgICAvLyB3aWxsIGxvYWQgdGhlIGRhdGEgJiBwcm9jZXNzIHRoZSByZXNwb25zZSBpbiBhIHNwZWNpYWwgcmVzcG9uc2Ugb2JqZWN0XG4gICAgZnVuY3Rpb24gbG9hZEZ1bmMoKSB7XG4gICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgdmFyIHN0YXR1c1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZihvcHRpb25zLnVzZVhEUiAmJiB4aHIuc3RhdHVzPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL0lFOCBDT1JTIEdFVCBzdWNjZXNzZnVsIHJlc3BvbnNlIGRvZXNuJ3QgaGF2ZSBhIHN0YXR1cyBmaWVsZCwgYnV0IGJvZHkgaXMgZmluZVxuICAgICAgICAgICAgc3RhdHVzID0gMjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gZmFpbHVyZVJlc3BvbnNlXG4gICAgICAgIHZhciBlcnIgPSBudWxsXG5cbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gMCl7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiBnZXRCb2R5KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycyl7IC8vcmVtZW1iZXIgeGhyIGNhbiBpbiBmYWN0IGJlIFhEUiBmb3IgQ09SUyBpbiBJRVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiSW50ZXJuYWwgWE1MSHR0cFJlcXVlc3QgRXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCByZXNwb25zZSwgcmVzcG9uc2UuYm9keSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gb3B0aW9ucy54aHIgfHwgbnVsbFxuXG4gICAgaWYgKCF4aHIpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29ycyB8fCBvcHRpb25zLnVzZVhEUikge1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5XG4gICAgdmFyIGFib3J0ZWRcbiAgICB2YXIgdXJpID0geGhyLnVybCA9IG9wdGlvbnMudXJpIHx8IG9wdGlvbnMudXJsXG4gICAgdmFyIG1ldGhvZCA9IHhoci5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiXG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgb3B0aW9ucy5kYXRhXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHVybDogdXJpLFxuICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICB9XG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucyAmJiBvcHRpb25zLmpzb24gIT09IGZhbHNlKSB7XG4gICAgICAgIGlzSnNvbiA9IHRydWVcbiAgICAgICAgaGVhZGVyc1tcImFjY2VwdFwiXSB8fCBoZWFkZXJzW1wiQWNjZXB0XCJdIHx8IChoZWFkZXJzW1wiQWNjZXB0XCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgIGlmIChtZXRob2QgIT09IFwiR0VUXCIgJiYgbWV0aG9kICE9PSBcIkhFQURcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSB8fCBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdIHx8IChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5qc29uID09PSB0cnVlID8gYm9keSA6IG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgICAgIGFib3J0ZWQgPSB0cnVlLy9JRTkgbWF5IHN0aWxsIGNhbGwgcmVhZHlzdGF0ZWNoYW5nZVxuICAgICAgICAgICAgeGhyLmFib3J0KFwidGltZW91dFwiKVxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoXCJYTUxIdHRwUmVxdWVzdCB0aW1lb3V0XCIpXG4gICAgICAgICAgICBlLmNvZGUgPSBcIkVUSU1FRE9VVFwiXG4gICAgICAgICAgICBlcnJvckZ1bmMoZSlcbiAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IClcbiAgICB9XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgZm9yKGtleSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGlmKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGVhZGVycyAmJiAhaXNFbXB0eShvcHRpb25zLmhlYWRlcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlcnMgY2Fubm90IGJlIHNldCBvbiBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3RcIilcbiAgICB9XG5cbiAgICBpZiAoXCJyZXNwb25zZVR5cGVcIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZVxuICAgIH1cblxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmJlZm9yZVNlbmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKVxuICAgIH1cblxuICAgIC8vIE1pY3Jvc29mdCBFZGdlIGJyb3dzZXIgc2VuZHMgXCJ1bmRlZmluZWRcIiB3aGVuIHNlbmQgaXMgY2FsbGVkIHdpdGggdW5kZWZpbmVkIHZhbHVlLlxuICAgIC8vIFhNTEh0dHBSZXF1ZXN0IHNwZWMgc2F5cyB0byBwYXNzIG51bGwgYXMgYm9keSB0byBpbmRpY2F0ZSBubyBib2R5XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXVndHVyL3hoci9pc3N1ZXMvMTAwLlxuICAgIHhoci5zZW5kKGJvZHkgfHwgbnVsbClcblxuICAgIHJldHVybiB4aHJcblxuXG59XG5cbmZ1bmN0aW9uIGdldFhtbCh4aHIpIHtcbiAgICAvLyB4aHIucmVzcG9uc2VYTUwgd2lsbCB0aHJvdyBFeGNlcHRpb24gXCJJbnZhbGlkU3RhdGVFcnJvclwiIG9yIFwiRE9NRXhjZXB0aW9uXCJcbiAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L3Jlc3BvbnNlWE1MLlxuICAgIHRyeSB7XG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyZWZveEJ1Z1Rha2VuRWZmZWN0ID0geGhyLnJlc3BvbnNlWE1MICYmIHhoci5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgPT09IFwicGFyc2VyZXJyb3JcIlxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiAmJiAhZmlyZWZveEJ1Z1Rha2VuRWZmZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwiY29uc3Qgbm9SZXN1bHRzID0gKCkgPT4gYDxsaSBjbGFzcz1cInNlYXJjaC1yZXN1bHQgbm8tcmVzdWx0c1wiPk5vIHJlc3VsdHMgZm91bmQuPC9saT5gO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vUmVzdWx0czsiLCJjb25zdCBjcmVhdGVMaXN0SXRlbSA9IChyZXN1bHQpID0+IHtcbiAgY29uc3QgcGVybWFsaW5rID0gcmVzdWx0LnVybC5yZXBsYWNlKCcuaHRtbCcsICcnKS50cmltKCk7XG4gIHJldHVybiBgXG4gICAgPGxpIGNsYXNzPVwic2VhcmNoXCI+XG4gICAgICA8YSBocmVmPVwiJHtwZXJtYWxpbmt9XCI+XG4gICAgICAgIDxoMj4ke3Jlc3VsdC50aXRsZX08L2gyPlxuICAgICAgPC9hPlxuICAgICAgPHA+JHtyZXN1bHQuZGVzY3JpcHRpb259PC9wPlxuICAgIDwvbGk+XG4gIGA7XG59O1xuXG5jb25zdCByZXN1bHQgPSByZXN1bHRzID0+IHJlc3VsdHMubWFwKGNyZWF0ZUxpc3RJdGVtKS5qb2luKCcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXN1bHQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGVmYXVsdHM6IHJlcXVpcmUoJ2xvZGFzaC5kZWZhdWx0cycpLFxuICByYW5kb206IHJlcXVpcmUoJ2xvZGFzaC5zYW1wbGUnKSxcbiAgZWFjaDogcmVxdWlyZSgnbG9kYXNoLmZvcmVhY2gnKSxcbn07XG4iXX0=
