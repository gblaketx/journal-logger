import React, { Component } from 'react';

const CONSTANTS = require('../constants');
// import CONSTANTS from '../constants';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.locationOptions = Array.from(CONSTANTS.locations.keys()).map( (shortName) =>
      <option key={shortName}>{shortName}</option>
    );

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.isReadOnly = this.isReadOnly.bind(this);
  }

  getLocation(shortName) {
    const location = CONSTANTS.locations.get(shortName)
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

  getClassName(isValid) {
    return "form-control larger-font" + (isValid ? " error" : "");
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
              className={this.getClassName(this.props.errors.placeName)}
              name="placeName"
              value={this.props.location.placeName}
              readOnly={this.isReadOnly()}
              onChange={this.handleLocationChange}
            />
          </div>
          <div className="vertical-margin">
            City
            <input 
              className={this.getClassName(this.props.errors.localityName)} 
              name="localityName"
              value={this.props.location.localityName} 
              readOnly={this.isReadOnly()}
              onChange={this.handleLocationChange}
            />
          </div>
          <div className="vertical-margin">
            State
            <input 
              className={this.getClassName(this.props.errors.administrativeArea)}
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