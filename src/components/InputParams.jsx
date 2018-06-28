import React from 'react';
import DatePicker from 'react-datepicker';

import LocationPicker from './LocationPicker';

import 'react-datepicker/dist/react-datepicker.css';

function InputParams(props) {

  return (
    <div className="col-md-3">
      <div className="panel panel-info tall-panel">
        <div className="panel-heading header-text">Entry Details</div>

        <div className="panel-body">
          <h4 className="subheader-text">Date</h4>
          <DatePicker 
            selected={props.initialDate}
          />
          <LocationPicker 
            location = {props.initialLocation}
            onChange = {props.onLocationChange}
          />

          <h4 className="subheader-text">Photo Upload</h4>
          <label className="btn btn-info">
            Choose picture
            <input type='file' style={{display: "none"}} />
          </label>
        </div>
      </div>
    </div>
  );
}

// TODO: callback in DatePicker onChange

export default InputParams;