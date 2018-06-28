import React, { Component } from 'react';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.locations = new Map([
      ['MTC', 
        {
          "placeName": "MTC Street",
          "localityName": "Provo",
          "administrativeArea": "Utah"
        }
      ],
      ['Quincy',
        {
          "placeName": "MTC Street",
          "localityName": "Quincy",
          "administrativeArea": "Florida"
        }
      ],
      ['Tallahassee - Ocala',
        {
          "placeName": "MTC Street",
          "localityName": "Tallahassee",
          "administrativeArea": "Florida"
        }
      ],
      ['Other - Specify', null]
    ]);

    this.locationOptions = Array.from(this.locations.keys()).map( (shortName) =>
      <option>{shortName}</option>
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