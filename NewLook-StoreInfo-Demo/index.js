'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('newlookstoreinfo');
var StoreInfoDataHelper = require('./data_helper');
app.launch(function (req, res) {
    var prompt = 'For store information, tell me a store name.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});


app.intent('newlookstoreinfo', {
    'slots': {
        'STORECODE': 'NEWLOOKSTORES'
    },
    'utterances': ['{|store|shop} {|info|opening hours|opening times} {|for} {-|STORECODE}']
},
    function (req, res) {
        //get the slot
        var storeCode = req.slot('STORECODE');
        var reprompt = 'Tell me a store name to get information.';
        if (_.isEmpty(storeCode)) {
            var prompt = 'I didn\'t hear a store name I recognise. Tell me another store name.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            var storeHelper = new StoreInfoDataHelper();
            storeHelper.requestStoreInfo(storeCode).then(function (storeInfo) {
                console.log(storeInfo);
                res.say(storeHelper.formatStoreInfo(storeInfo)).send();
            }).catch(function (err) {
                console.log(err.statusCode);
                var prompt = 'I didn\'t find any information for a store name of ' + storeCode;
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            });
            return false;
        }
    }
);


module.exports = app;