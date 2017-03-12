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
    //Days of week
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //var d = new Date(dateString);
    var dayName = 'Sunday';//days[d.getDay()];
    var openingTimeforDay = '';
    var closingTimeforDay = '08:00';
    var indexnumber;

    //Additional store data for response
    var storeData = _.template('The ${storeName} store address is ${formattedAddress}, and can be contacted on ${telephone}.')({
        storeName: storeInfo.displayName,
        formattedAddress: storeInfo.address.formattedAddress,
        telephone: storeInfo.address.phone
    });

    var openingHoursData = storeInfo.openingHours;
    //console.log(openingHoursData);
    //console.log("The day1 is: " + openingHoursData[1]);

    // iterate over each element in the opening hours array to find the current day of week
    console.log("Length 1: "+ openingHoursData.length);

    for (var i = 0; i < openingHoursData.length; i++) {
        // look for the entry with a matching `code` value
        //console.log("The day is: "+ openingHoursData[i]["weekDay"]);
       
        var daylist = openingHoursData[i];
        //console.log("Day List: "+ openingHoursData[i]);
        
        for (var j = 0; j < daylist.length; j++){
            if (daylist[j]["weekDay"] == 'Sunday') {
                console.log("log 2: "+ daylist[j].weekDay);
            }
        };

       /* if (openingHoursData["openingHours"]["weekDayOpeningList"][i].weekDay == 'Sunday') {
            indexnumber = i;
            openingTimeforDay = storeInfo.openingHours.weekDayOpeningList[i]['openingTime']['formattedHour'];
            //closingTimeforDay = storeInfo.openingHours.weekDayOpeningList[i].closingTime.formattedHour;
            closingTimeforDay = '23:00';
        }*/
    };

    //if (storeInfo.delay === 'true') {
    var template = _.template('The ${storeName} store opens at ${opening_time} and closes at ${closing_time}.');
    return template({
        storeName: storeInfo.displayName,
        storeOpeningStatus: storeInfo.openingHours.todayHours.closed === 'false' ? 'open' : 'closed',
        //Static store hours
        //opening_time: storeInfo.openingHours.todayHours.openingTime.formattedHour,
        //closing_time: storeInfo.openingHours.todayHours.closingTime.formattedHour
        opening_time: openingTimeforDay,//storeInfo.openingHours.weekDayOpeningList[indexnumber]["openingTime.formattedHour"],
        closing_time: closingTimeforDay
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