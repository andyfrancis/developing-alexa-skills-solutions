'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var StoreInfoDataHelper = require('../data_helper');
chai.config.includeStack = true;

describe('StoreInfoDataHelper', function () {
    var subject = new StoreInfoDataHelper();
    var store_code;

    describe('#getStoreInfo', function () {
        //Test with a valid code
        context('with a valid store code', function () {
            it('returns matching store code', function () {
                store_code = 'Wandsworth';
                var value = subject.requestStoreInfo(store_code).then(function (obj) {
                    return obj.displayName;
                });
                return expect(value).to.eventually.eq(store_code);
            });
        });
    });

    describe('#formatStoreInfo', function () {
        var storedata = {
            "address": {
                "formattedAddress": "Unit 4 Southside Shopping Centre, London, SW18 4TF, United Kingdom",
                "phone": "020 8877 5800",
            },
            "displayName": "Wandsworth",
            "openingHours": {
                "code": "2087",
                "name": "Wandsworth Opening Hours",
                "todayHours": {
                    "closingTime": {
                        "hour": "6",
                        "formattedHour": "18:30",
                        "minute": "30"
                    },
                    "openingTime": {
                        "hour": "9",
                        "formattedHour": "09:30",
                        "minute": "30"
                    },
                    "weekDay": "Monday",
                    "closed": "false"
                },
                "weekDayOpeningList": [
                    {
                        "closingTime": {
                            "hour": "6",
                            "formattedHour": "18:30",
                            "minute": "30"
                        }
                    }]
            }
        };
        context('with a valid response', function () {
            it('formats the status as expected', function () {
                //status.delay = 'true';
                expect(subject.formatStoreInfo(storedata)).to.eq(
                    'The Wandsworth store opens at 09:30 and closes at 18:30.'
                );
            });
        });
    });
});