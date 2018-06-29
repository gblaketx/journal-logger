import React, { Component } from 'react';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.locations = new Map([
      ['MTC', 
        {
          "placeName": "2005 North 900 East",
          "localityName": "Provo",
          "administrativeArea": "UT"
        }
      ],
      ['Quincy',
        {
          "placeName": "105 North 9th Street #4",
          "localityName": "Quincy",
          "administrativeArea": "FL"
        }
      ],
      ['Tallahassee - Ocala',
        {
          "placeName": "1360 Ocala Road #231",
          "localityName": "Tallahassee",
          "administrativeArea": "FL"
        }
      ],
      ['Tallahassee - Charlotte',
        {
          "placeName": "1330 Charlotte Street",
          "localityName": "Tallahassee",
          "administrativeArea": "FL"
        }
      ],
      ['Tallahassee - Victory Garden',
        {
          "placeName": "410 Victory Garden Drive #189",
          "localityName": "Tallahassee",
          "administrativeArea": "FL"
        }
      ],
      ['Pascagoula - Scovel',
        {
          "placeName": "4004 Scovel Avenue #24",
          "localityName": "Pascagoula",
          "administrativeArea": "MS"
        }
      ],
      ['Pascagoula - Eden',
        {
          "placeName": "2816 Eden Street #515",
          "localityName": "Pascagoula",
          "administrativeArea": "MS"
        }
      ],
      ['Mobile',
        {
          "placeName": "5089 Government Boulevard #102",
          "localityName": "Mobile",
          "administrativeArea": "AL"
        }
      ],
      ['Other - Specify', null]
    ]);

    this.locationOptions = Array.from(this.locations.keys()).map( (shortName) =>
      <option key={shortName}>{shortName}</option>
    );

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.isReadOnly = this.isReadOnly.bind(this);
  }

  getLocation(shortName) {
    const location = this.locations.get(shortName)
    if(!location) {
      return {
        shortName: shortName,
        placeName: "",
        localityName: "",
        administrativeArea: ""
      }
    }
    location.shortName = shortName;
    return location;
  }

  handleDropdownChange(event) {
    const location = this.getLocation(event.target.value);
    this.props.onChange(location);
  }

  handleLocationChange(event) {
    let newLocation = Object.assign({}, this.props.location);
    newLocation[event.target.name] = event.target.value;
    this.props.onChange(newLocation);
  }

  isReadOnly() {
    return this.props.location.shortName !== 'Other - Specify';
  }

  render() {
    return (
      <div>
        <div>
          <h4 className="subheader-text">Location</h4>
          <select 
            className="form-control" 
            value={this.props.location.shortName}
            onChange={this.handleDropdownChange}
          >
            {this.locationOptions}
          </select>
        </div>
        <div>
          <div className="vertical-margin">
            Street Address
            <input 
              className="form-control larger-font" 
              name="placeName"
              value={this.props.location.placeName}
              readOnly={this.isReadOnly()}
              onChange={this.handleLocationChange}
            />
          </div>
          <div className="vertical-margin">
            City
            <input 
              className="form-control larger-font" 
              name="localityName"
              value={this.props.location.localityName} 
              readOnly={this.isReadOnly()}
              onChange={this.handleLocationChange}
            />
          </div>
          <div className="vertical-margin">
            State
            <input 
              className="form-control larger-font"
              name="administrativeArea"
              value={this.props.location.administrativeArea} 
              readOnly={this.isReadOnly()}
              onChange={this.handleLocationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LocationPicker;