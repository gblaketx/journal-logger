// import moment from "moment";

const moment = require("moment");

const locationDates = new Map([
  ['MTC', 
    {
      start: moment("2013-06-12"), 
      end: moment("2013-06-25")
    }
  ],
  ['Quincy',
    {
      start: moment("2013-06-26"),
      end: moment("2013-08-04")
    }
  ],
  ['Tallahassee - Ocala',
    {
      start: moment("2013-08-05"),
      end: moment("2013-09-23")
    }
  ],
  ['Tallahassee - Charlotte',
    {
      start: moment("2013-09-23"),
      end: moment("2013-12-08")
    }
  ],
  ['Tallahassee - Victory Garden',
    {
      start: moment("2013-12-09"),
      end: moment("2014-07-07")
    }
  ],
  ['Pascagoula - Scovel',
    {
      start: moment("2014-07-08"),
      end: moment("2014-12-28")
    }
  ],
  ['Pascagoula - Eden',
    {
      start: moment("2014-12-29"),
      end: moment("2015-03-20")
    }
  ],
  ['Mobile',
    {
      start: moment("2015-03-23"),
      end: moment("2015-06-10")
    }
  ]
]);


const locations = new Map([
  ['MTC', 
    {
      "placeName": "2005 North 900 East",
      "localityName": "Provo",
      "administrativeArea": "UT",
      "latitute": 40.26019,
      "longitude": -111.644998
    }
  ],
  ['Quincy',
    {
      "placeName": "105 North 9th Street #4",
      "localityName": "Quincy",
      "administrativeArea": "FL",
      "latitute": 30.589444,
      "longitude": -84.585601
    }
  ],
  ['Tallahassee - Ocala',
    {
      "placeName": "1360 Ocala Road #231",
      "localityName": "Tallahassee",
      "administrativeArea": "FL",
      "latitute": 30.461106,
      "longitude": -84.318941
    }
  ],
  ['Tallahassee - Charlotte',
    {
      "placeName": "1330 Charlotte Street",
      "localityName": "Tallahassee",
      "administrativeArea": "FL",
      "latitute": 30.452386,
      "longitude": -84.304747
    }
  ],
  ['Tallahassee - Victory Garden',
    {
      "placeName": "410 Victory Garden Drive #189",
      "localityName": "Tallahassee",
      "administrativeArea": "FL",
      "latitute": 30.440366,
      "longitude": -84.242242   
    }
  ],
  ['Pascagoula - Scovel',
    {
      "placeName": "4004 Scovel Avenue #24",
      "localityName": "Pascagoula",
      "administrativeArea": "MS",
      "latitute": 30.361892,
      "longitude": -88.521503
    }
  ],
  ['Pascagoula - Eden',
    {
      "placeName": "2816 Eden Street #515",
      "localityName": "Pascagoula",
      "administrativeArea": "MS",
      "latitute": 30.36206,
      "longitude": -88.528723
    }
  ],
  ['Mobile',
    {
      "placeName": "5089 Government Boulevard #102",
      "localityName": "Mobile",
      "administrativeArea": "AL",
      "latitute": 30.611734,
      "longitude": -88.159006
    }
  ],
  ['Other - Specify', 
    {
      "placeName": "",
      "localityName": "",
      "administrativeArea": "",
      "latitute": "",
      "longitude": ""
    }
  ]
]);

module.exports = {
  locationDates: locationDates,
  locations: locations,
}

// export default {locations, locationDates};