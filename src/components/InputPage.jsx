import React, { Component } from 'react';
import InputParams from './InputParams';
import './InputPage.css'
import moment from 'moment'

import {createJSON} from './JSONUtils';

class InputPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /** The date for the journal entry */
      date: moment(),

      /** The location of the entry */
      location: {
        shortName: "Tallahassee - Ocala",
        placeName: "1549 Ocala Road",
        localityName: "Tallahassee",
        administrativeArea: "Florida"
      },

      /** The journal entry text */
      text: "",

      /** An optional picture file */
      picture: "",
    }

    this.updateText = this.updateText.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updatePicture = this.updatePicture.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.nextEntry = this.nextEntry.bind(this);
  }

  /** Updates the text when it's changed */
  updateText(event) {
    this.setState({text: event.target.value});
  }

  updateLocation(newLocation) {
    this.setState({location: newLocation});
  }

  updatePicture(event) {
    const myURL = window.URL || window.webkitURL;
    this.setState({picture: myURL.createObjectURL(event.target.files[0])})
  }

  updateDate(date) {
    this.setState({date: date})
  }

  nextEntry(event) {
    // TODO: Run some sort of validation here, maybe in createJSON?

    createJSON(this.state);

    this.setState({
      date: this.state.date.add(1, 'days'),
      text: "",
      picture: "",
    });

    // Some sort of confirmation popup here would be nice?
  }


  render() {
    return (
      <div>
        <div className="app-header">
          <h1>Journal Logger</h1>
          <h4>Easily turn text into DayOne JSON entries.</h4>
        </div>

        <div className='input-page'>          
          <div className="intro-text">
            Fill in the metadata for the entry, type the text, then hit "Next Day" to save as JSON.
          </div>

          <div>
            <InputParams
              initialDate={this.state.date}
              initialLocation={this.state.location}
              initialPicture={this.state.picture}

              onLocationChange={this.updateLocation}
              onPictureChange={this.updatePicture}
              onDateChange={this.updateDate}
            />

            <div className="col-md-9">
              <div className="panel panel-primary">
                <div className="panel-heading header-text">Entry Text</div>
                <div className="panel-body">
                  <textarea 
                    className="form-control tall larger-font" 
                    value={this.state.text} 
                    onChange={this.updateText}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button 
              className="btn btn-lg btn-primary advance-button"
              onClick={this.nextEntry}
            >
              Next Day
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InputPage;