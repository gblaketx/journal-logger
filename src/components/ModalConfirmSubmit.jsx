import React from 'react';

function ModalConfirmSubmit(props) {
  if(!props.show) {
    return null;
  }

  return (
    <div className="modal-confirm-backdrop">
      <div className="modal-confirm-body intro-text">
        {props.children}
        <div className="footer footer-bottom">
          <button 
            className="btn btn-secondary"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button 
            className="btn btn-danger advance-button"
            onClick={props.onSubmit}
          >
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmSubmit;