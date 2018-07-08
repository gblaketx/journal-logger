const moment = require('moment');
const fs = require('fs');
const DayOne = require('dayone'); // Module to create entries
const request = require('request');

const CONSTANTS = require('../src/constants');


let dataFile = fs.readFileSync('./data/mission-entries.json', 'utf8');
let entries = JSON.parse(dataFile).entries;

// TODO: Hide these before committing

testModule();

exports.createJSON = function(entryData) {
  console.log("Creating JSON with entryData", entryData);

  let entry = new DayOne.DayOneEntry();

  entry.creationDate = entryData.date;
  entry.text = entryData.text;
  entry.tags = ["Mission"];


  const requestParams = getLocationRequestParams(entryData.location);


  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${requestParams}`,
    {json: true}, (err, res, body) => {
    if(err) {
      return console.log(err);
    }
    const latLongData = body.results[0].geometry.location;
    entry.location = entryData.location;
    entry.location.longitude = latLongData.long;
    entry.location.latitude = latLongData.lat;

  });




  // entry.location = locationData;
  // entry.location = entryData.location; TODO: elaborate on basic locationd data
  //TODO: add weather
  // Dark Sky API https://darksky.net/dev/docs
  // NOAA API https://www.ncdc.noaa.gov/cdo-web/webservices/v2#data
  // Weather Underground API: https://www.wunderground.com/weather/api/d/docs?d=resources/code-samples
  // entry.weather = getWeather(entryData.date, locationData);

  // if(entryData.picture !== "") {
  //   //TODO: Bufferize? Test if this will work
  //   entry.photo = new Buffer(entryData.picture);
  // }


  console.log("Full properties", entry);
  //TODO: modify entries
  return true;
}

exports.validateEntry = function(entry) {
  // Validates whether entry works
  entry.date = moment(entry.date);

  let errors = [];
  const dateFormatted = entry.date.format("MMM Do YYYY");
  if(entry.date < moment("2013-06-12") || entry.date > moment("2015-06-11")) {
    errors.push(`Date "${dateFormatted}" doesn't occur during mission`);
  } else if(!entryFallsInDate(entry)) {
    const locationName = entry.location.shortName;
    errors.push(`Date "${dateFormatted}" doesn't fall in expected range for location "${locationName}"`);
  }
  const lastEntryDate = moment(entries[entries.length-1].creationDate);
  const daysSinceLastEntry =entry.date.diff(lastEntryDate, 'days');
  if(daysSinceLastEntry > 1) {
    errors.push(
      `Date "${dateFormatted}" is more than one day after last entry date "${lastEntryDate.format("MMM Do YYYY")}"`);
  } else if(daysSinceLastEntry == 0) {
    errors.push(`There is already an entry on "${dateFormatted}"`);
  }

  return errors;
}

exports.getLastEntry = function() {
  // $.getJSON("mission-entries.json", function(entriesJSON){
  //   console.log("Entries", entriesJSON);
  // });
  // const entries = fs.readFileSync('mission-entries.json', 'utf8');
  // console.log(entries);
  // fs.readFile('./data/mission-entries.json', 'utf8', function(err, data) {
  //   if(err) {
  //     throw err;
  //   }
  //   console.log(data);
  // });
  return entries[entries.length - 1];
}

function saveEntries() {

}

// check if: location falls within specified date range for location
function entryFallsInDate(entry) {
  if(!CONSTANTS.locationDates.has(entry.location.shortName)) {
    return true;
  }

  const dateRange = CONSTANTS.locationDates.get(entry.location.shortName);
  if(entry.date < dateRange.start || entry.date > dateRange.end) {
    return false;
  }

  return true;
}

function testModule() {
  const location = CONSTANTS.locations.get('MTC');

  const requestParams = getLocationRequestParams(location);
  console.log('Request params', requestParams);

  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${requestParams}`,
    {json: true}, (err, res, body) => {
    if(err) {
      return console.log(err);
    }
    console.log('Response body', body);
    console.log('Location data', body.results[0].geometry.location);
  });
}

function getWeather(date, location) {
   //TODO: get with HAMWeather, using date
  return {
    "sunsetDate" : "2015-06-14T02:59:09Z",
    "temperatureCelsius" : 18,
    "weatherServiceName" : "HAMweather",
    "windBearing" : 230,
    "sunriseDate" : "2015-06-13T12:39:35Z",
    "conditionsDescription" : "Cloudy",
    "pressureMB" : 1010,
    "visibilityKM" : 16.093439102172852,
    "relativeHumidity" : 78,
    "windSpeedKPH" : 11,
    "weatherCode" : "cloudy",
    "windChillCelsius" : 18
  };
}

function getLocationRequestParams(location) {
  let reqStr = `${location.placeName},+${location.localityName},+${location.administrativeArea}&key=${googleAPIkey}`;

  reqStr = reqStr.replace(new RegExp(" ", 'g'), "+");

  return reqStr;
}

function getLocationData(location) {

  //TODO: get latitute and longitude from address

  return {
    "localityName" : location.localityName,
    "country" : "United States",
    "longitude" : -117.27059173583984,
    "administrativeArea" : location.administrativeArea,
    "placeName" : location.placeName,
    "latitude" : 32.984580993652344
  }
}

function getEntryTemplate() {
  let template = {
    "starred" : false,
    "location" : {
      "region" : {
        "center" : {
          "longitude" : -117.2707066,
          "latitude" : 32.984760999999999
        },
        "radius" : 73.702573673532015
      },
      "localityName" : "Solana Beach",
      "country" : "United States",
      "longitude" : -117.27059173583984,
      "administrativeArea" : "CA",
      "placeName" : "535 S Highway 101",
      "latitude" : 32.984580993652344
    },
    "creationDate" : "2015-06-13T19:00:00Z",
    // "userActivity" : {
    //   "activityName" : "Stationary",
    //   "stepCount" : 2298
    // },
    "text" : "TODO: PLACEHOLDER TEXT",
    "weather" : { //TODO: get with HAMWeather
      "sunsetDate" : "2015-06-14T02:59:09Z",
      "temperatureCelsius" : 18,
      "weatherServiceName" : "HAMweather",
      "windBearing" : 230,
      "sunriseDate" : "2015-06-13T12:39:35Z",
      "conditionsDescription" : "Cloudy",
      "pressureMB" : 1010,
      "visibilityKM" : 16.093439102172852,
      "relativeHumidity" : 78,
      "windSpeedKPH" : 11,
      "weatherCode" : "cloudy",
      "windChillCelsius" : 18
    },
    "timeZone" : "America\/Los_Angeles",
    "uuid" : "38E39CC254424F1598D49B1F3B3985EB",
    "tags" : [
      "Mission"
    ],
    "duration" : 0,
    "photos" : [
      {
        "cameraMake" : "Apple",
        "fnumber" : "2.2",
        "orderInEntry" : 0,
        "width" : 2100,
        "cameraModel" : "iPhone 6",
        "type" : "jpeg",
        "identifier" : "194EE920A72C4A8DA0C36A1AF0315774",
        "date" : "2015-06-21T14:36:25Z",
        "location" : {
          "region" : {
            "center" : {
              "longitude" : -83.827903747558608,
              "latitude" : 42.280570977455
            },
            "identifier" : "<+42.28057098,-83.82790375> radius 141.69",
            "radius" : 141.68776905187667
          },
          "localityName" : "Scio",
          "country" : "Estados Unidos",
          "timeZoneName" : "America\/Detroit",
          "administrativeArea" : "MI",
          "longitude" : -83.827903747558594,
          "placeName" : "5004 Birkdale Dr",
          "latitude" : 42.280570983886719
        },
        "height" : 1575,
        "md5" : "6e5ff81a786b32b955e759c9d20552cc",
        "focalLength" : "4.15"
      }
    ]
  };

  return template;
}