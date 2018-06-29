import React from 'react';

function PhotoUpload(props) {
  return (
    <div>
      <h4 className="subheader-text">Photo Upload</h4>
      <label className="btn btn-info">
        Choose picture
        <input
          onChange={props.onChange} 
          type='file' 
          style={{display: "none"}}
        />
      </label>
      <img src={props.value} className="img-thumbnail small-thumbnail" alt=""/>
    </div>
  );
}

export default PhotoUpload;