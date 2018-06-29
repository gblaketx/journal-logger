import React from 'react';
import DatePicker from 'react-datepicker';

import LocationPicker from './LocationPicker';
import PhotoUpload from './PhotoUpload';

import 'react-datepicker/dist/react-datepicker.css';

function InputParams(props) {

  return (
    <div className="col-md-3">
      <div className="panel panel-info tall-panel">
        <div className="panel-heading header-text">Entry Details</div>

        <div className="panel-body">
          <h4 className="subheader-text">Date</h4>
          <DatePicker 
            className="date-picker"
            selected={props.initialDate}
            onChange={props.onDateChange}
          />
          <LocationPicker 
            location = {props.initialLocation}
            onChange = {props.onLocationChange}
          />

          <PhotoUpload 
            value={props.initialPicture}
            onChange={props.onPictureChange}
          />
        </div>
      </div>
    </div>
  );
}

//  
// TODO: callback in DatePicker onChange

export default InputParams;