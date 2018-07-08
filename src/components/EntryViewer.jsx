import React from 'react';
import moment from 'moment';

function EntryViewer(props) {
  if(!props.show) {
    return null;
  }

  const location = props.entry.location;

  return(
    <div className="modal-confirm-backdrop">
      <div className="modal-confirm-body intro-text modal-body-wide">
        <h2>{moment(props.entry.creationDate).format("MMM Do YYYY")}</h2>
        <div className="intro-text">
          {location.placeName}<br />
          {location.localityName}, {location.administrativeArea}
        </div>

        {props.entry && props.entry.text}
        <div className="footer footer-bottom">
          <button 
            className="btn btn-secondary"
            onClick={props.onCancel}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryViewer;