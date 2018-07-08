import React, { Component } from 'react';
import InputParams from './InputParams';
import ModalConfirmSubmit from './ModalConfirmSubmit';
import EntryViewer from './EntryViewer';
import CONSTANTS from '../constants';

import './InputPage.css'
import moment from 'moment'


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

      /** List of errors to show on modal, empty if modal is hidden */
      modalErrors: [],

      /** Most recent entry in the database*/
      mostRecentEntry: null,

      /** Whether to display the modal most recent entry */
      showMostRecentEntry: false,
    }

    this.updateText = this.updateText.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updatePicture = this.updatePicture.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.tryNextEntry = this.tryNextEntry.bind(this);
    this.nextEntry = this.nextEntry.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
    this.getMostRecentEntryDate = this.getMostRecentEntryDate.bind(this);
    // loadEntries(); TODO
  }

  componentWillMount() {
    // fetch('/api/hello')
    //   .then(res => console.log(res));
    this.callAPI('/mostRecentEntry')
      .then(res => {
        const newDate = moment(res.creationDate).add(1, 'days');
        console.log("Got location", this.getLocationForDate(newDate));
        this.setState({
          mostRecentEntry: res,
          date: newDate,
          location: this.getLocationForDate(newDate),
        })
      }); //TODO: add location
  }

  callAPI = async (path) => {
    const response = await fetch('/api' + path);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  postAPI = async (path, postBody) => {
    const response = await fetch('/api' + path, {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody)
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;  
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

  getMostRecentEntryDate() {
    if(this.state.mostRecentEntry === null) {
      return "";
    }
    // return "TODO: Date";
    // return moment("07-04-2018");
    return moment(this.state.mostRecentEntry.creationDate).format("MMM Do YYYY");
  }

  tryNextEntry(event) {
    // TODO: Run some sort of validation here, maybe in createJSON?

    const entryErrors = [];
    // const entryErrors = validateEntry(this.state); TODO
    this.postAPI('/validateEntry', this.state).then(
      res => {
        const entryErrors = res.entryErrors;
        if(entryErrors.length > 0) {
          this.setState({ modalErrors: entryErrors });
        } else {
          this.nextEntry(event);
        }
      }
    );


    

    // createJSON(this.state);
    // this.setState({
    //   date: this.state.date.add(1, 'days'),
    //   text: "",
    //   picture: "",
    // });

    // Some sort of confirmation popup here would be nice?
  }

  nextEntry(event) {
    const entry = {
      date: this.state.date,
      location: this.state.location,
      text: this.state.text,
      picture: this.state.picture,
    }


    this.postAPI('/addEntry', entry)
      .then(res =>
        this.setState({
          date: this.state.date.add(1, 'days'),
          text: "",
          picture: "",
          modalErrors: [],
        }) 
    );   
  }

  cancelSubmit(event) {
    this.setState({ modalErrors: [] });
  }

  getLocationForDate(date) {
    // Falls outside mission
    if(date < moment("2013-06-12") || date > moment("2015-06-11")) {
      let loc = CONSTANTS.locations.get("Other - Specify");
      loc.shortName = "Other - Specify";
      return loc;
    }
    for(let [shortName, dateRange] of CONSTANTS.locationDate) {
      if(date >= dateRange.start && date <= dateRange.end) {
        let loc = CONSTANTS.locations.get(shortName);
        loc.shortName = shortName;
        return loc;
      }
    }
    return null;

  }

  validate() {
    const location = this.state.location;

    if (location.shortName !== 'Other - Specify') {
      return {textLength: this.state.text.length === 0};
    }

    return {
      textLength: this.state.text.length === 0,
      placeName: location.placeName.length === 0,
      localityName: location.localityName.length === 0,
      administrativeArea: location.administrativeArea.length !== 2,
    };
  }

  render() {
    const errors = this.validate();

    const isNextDayEnabled = !Object.keys(errors).some(x => errors[x]);

    const modalErrorList = this.state.modalErrors.map(error => <li key={error}>{error}</li>);

    return (
      <div>
        <div className="app-header">

          <span className="inline-left">
            <h1>Journal Logger</h1>
            <h4>Easily turn text into DayOne JSON entries.</h4>
          </span>

          <span className="inline-right">
            <h4>Previous Entry: </h4>
            {this.getMostRecentEntryDate()}<br />
            <button 
              className="btn btn-info"
              onClick={() => this.setState({showMostRecentEntry: true})}
            >
              View Entry
            </button>
          </span>

        </div>

        <div className='input-page'>          
          <div className="intro-text">
            Fill in the metadata for the entry, type the text, then hit "Next Day" to save as JSON.
          </div>

          <ModalConfirmSubmit
            show={this.state.modalErrors.length > 0}
            onSubmit={this.nextEntry}
            onCancel={this.cancelSubmit}
          >
            <h2 className="header-text centered-text">Confirm Submission</h2>
            Are you sure you'd like to submit your entry? The following issues were found:
            <ul>{modalErrorList}</ul>
          </ModalConfirmSubmit>

          <EntryViewer 
            show={this.state.showMostRecentEntry}
            entry={this.state.mostRecentEntry}
            onCancel={() => this.setState({showMostRecentEntry: false})}
          />

          <div>
            <InputParams
              initialDate={this.state.date}
              initialLocation={this.state.location}
              initialPicture={this.state.picture}

              onLocationChange={this.updateLocation}
              onPictureChange={this.updatePicture}
              onDateChange={this.updateDate}

              errors={errors}
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
              onClick={this.tryNextEntry}
              disabled={!isNextDayEnabled}
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