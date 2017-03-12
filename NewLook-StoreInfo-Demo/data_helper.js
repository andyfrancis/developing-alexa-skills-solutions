'use strict';
var _ = require('lodash');
var js = require('json3');
var rp = require('request-promise');
var ENDPOINT = 'http://newlookdemo-alexa-test.cloudhub.io/api/v1/stores/';

function StoreInfoDataHelper() { }

StoreInfoDataHelper.prototype.requestStoreInfo = function (storeCode) {
    return this.getStoreInfo(storeCode).then(
        function (response) {
            console.log('success - received store info for ' + storeCode);
            return response.body;
        }
    );
};

StoreInfoDataHelper.prototype.getStoreInfo = function (storeCode) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + storeCode,
        resolveWithFullResponse: true,
        json: true
    };
    return rp(options);
};


StoreInfoDataHelper.prototype.formatStoreInfo = function (storeInfo) {
    //Additional store data for response
    var storeData = _.template('The ${storeName} store address is ${formattedAddress}, and can be contacted on ${telephone}.')({
        storeName: storeInfo.displayName,
        formattedAddress: storeInfo.address.formattedAddress,
        telephone: storeInfo.address.phone
    });

 
    //if (storeInfo.delay === 'true') {
    var template = _.template('The ${storeName} store opens at ${opening_time} and closes at ${closing_time}.');
    return template({
        storeName: storeInfo.displayName,
        storeOpeningStatus: storeInfo.openingHours.todayHours.closed === 'false' ? 'open' : 'closed',
        //Static store hours
        opening_time: storeInfo.openingHours.todayHours.openingTime.formattedHour,
        closing_time: storeInfo.openingHours.todayHours.closingTime.formattedHour
    });
    /*} else {
            //    no delay
            return _.template('There is currently no delay at ${airport}. ${weather}')({
                airport: airportStatus.name,
                weather: weather
            });
    }*/
};

module.exports = StoreInfoDataHelper;