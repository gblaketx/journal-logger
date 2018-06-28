import React, { Component } from 'react';
import InputParams from './InputParams';
import './InputPage.css'
import moment from 'moment'

class InputPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /** The date for the journal entry */
      date: moment(),

      location: {
        shortName: "Tallahassee - Ocala",
        placeName: "1549 Ocala Road",
        localityName: "Tallahassee",
        administrativeArea: "Florida"
      },

      /** The journal entry text */
      text: "",
    }

    this.updateText = this.updateText.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  /** Updates the text when it's changed */
  updateText(event) {
    this.setState({text: event.target.value});
  }

  updateLocation(newLocation) {
    // const newLocation = {
    //   shortName: shortName,
    //   placeName: address,
    //   localityName: city,
    //   administrativeArea: state
    // }

    this.setState({location: newLocation});
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

              onLocationChange={this.updateLocation}
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
            <button className="btn btn-lg btn-primary advance-button">
              Next Day
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default InputPage;