const isEmail = require('isemail');
const $ = require('jquery');

const tokens = require('./tokens');

const validate = email => isEmail.validate(email);

const displayMessage = (message, container) => container.innerHTML = message;

// Todo: Validation
// 1. Did we get "Subscriber profile succesfully created" message
// 2. Did we get something else?

const subscribe = (email) => {
  const url = 'https://stage-api.govdelivery.com/api/add_script_subscription';
  const params = {
    t: 'USDOIFWS_124',
    c: 'jsonpcallback',
    k: tokens.staging,
    e: email,
  };

  return $.ajax(url, {
    data: params,
    dataType: 'jsonp',
    jsonpCallback: 'jsonpcallback',
    method: 'GET',
    success: (e) => { console.log('Success: ', e); },
    error: (e) => { console.log('Error: ', e); },
  });
};

module.exports = {
  subscribe,
  validate,
  displayMessage,
};
