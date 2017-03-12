'use strict';
var APP_ID = 'amzn1.ask.skill.e2355886-98a9-4d48-b32c-3b088a42dab4';
var SPEECH_OUTPUT = 'Hello World!';
var AlexaSkill = require('./AlexaSkill');
var GreeterService = function() {
  AlexaSkill.call(this, APP_ID);
};

GreeterService.prototype = Object.create(AlexaSkill.prototype);
var helloResponseFunction = function(intent, session, response) {
  response.tell(SPEECH_OUTPUT);
};

GreeterService.prototype.eventHandlers.onLaunch = helloResponseFunction;

GreeterService.prototype.intentHandlers = {
  'HelloWorldIntent': helloResponseFunction
};

exports.handler = function(event, context) {
  var greeterService = new GreeterService();
  greeterService.execute(event, context);
};
