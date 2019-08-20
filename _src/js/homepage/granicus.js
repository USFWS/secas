const isEmail = require('isemail');
const $ = require('jquery');
const toastr = require('toastr');

const tokens = require('./tokens');

const validate = email => isEmail.validate(email);

const displayMessage = (message, container) => container.innerHTML = message;

// Todo: Validation
// 1. Did we get "Subscriber profile succesfully created" message
// 2. Did we get something else?

const subscribe = (email) => {
  const url = 'https://api.govdelivery.com/api/add_script_subscription';
  const params = {
    t: 'USDOIFWS_124',
    c: 'jsonpcallback',
    k: tokens.production,
    e: email,
  };

  return $.ajax(url, {
    data: params,
    dataType: 'jsonp',
    jsonpCallback: 'jsonpcallback',
    method: 'GET',
    success: (e) => toastr.success('You successfully subscribed!'),
    error: (e) => toastr.error('Subscription failed, please try again.')
  });
};

module.exports = {
  subscribe,
  validate,
  displayMessage,
};
