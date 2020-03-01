//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, formValueSelector, submit, change} from 'redux-form';
import {bindActionCreators} from 'redux';
import {TextField, Modal, FormHelperText, FormControl} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import {toast} from "react-toastify";

//style
import './style.scss';

//custom component
import CustomComponents from '../../../../components/CustomComponents/CustomComponents'
import AddEmail from './../AddEmail'
import PostJobMap from '../PostJobMap';
import CustomTag from '../../../../components/CustomTag'
import NonCreatableSingleSelectDropdown
  from "../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown";

//utilities
import {apiCall, handleLocalStorage, FormatToYMD, FormatToHMS,isEmptyObject} from '../../../../Utilities';
import {POST_JOB, POST_JOBS_GET_DETAILS, POST_JOBS_EMAIL_EXIST} from '../../../../../config/constants'

toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});
let backupLatAndLong = {lat: null, lng: null};

// email dropdown component
const emailDropdown = ({emails, defaultValue, input, error, meta}) => (
  <div style={{width: '47.4%', marginRight: '55px', marginTop: '-10px'}}>
    <label className="select-email"> Select from existing email id(s)</label>
    <div style={{marginTop: '-3px'}}>
      <NonCreatableSingleSelectDropdown
        isSearchable={false}
        {...input}
        getSelectedOption={(option) => input.onChange(option.label)}
        options={emails}
        defaultValue={input.value ? {label: input.value, value: input.value} : {
          label: emails[0].value,
          value: emails[0].key
        }}
        isClearable={false}
        error={meta.error}
      />
      <FormHelperText><span className="field_error">{meta.error}</span></FormHelperText>
    </div>
  </div>
);

class ManageResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      questionnaires: [{key: 1, value: 'Questionnaire1'}, {key: 2, value: 'Questionnaire2'}, {
        key: 3,
        value: 'Questionnaire3'
      },],
      add_email_popup: false,
      saveText: "Next",
      is_map_open: false,
      selected_location: null,
      venue: "",
      address_url: ""
    };
    this.header = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    }
  }

  /**
   * on click save as draft button
   * @return: call an api to save data and redirect to employer saved jobs
   * */
  saveAsDraft = async () => {
    try {
      const sendingData = {
        manage_response: {
          email_or_walkin: this.props.email_or_walkin,
          selected_email: this.props.selected_email,
          forward_application_to_email: this.props.forward_application_to_email,
          reference_code: this.props.reference_code,
          date_from: this.props.date_from ? FormatToYMD(this.props.date_from) : null,
          date_to: this.props.date_to ? FormatToYMD(this.props.date_to) : null,
          time_from: FormatToHMS(this.props.time_from).includes("NaN:NaN:NaN") ? null : FormatToHMS(this.props.time_from),
          time_to: FormatToHMS(this.props.time_to).includes("NaN:NaN:NaN") ? null : FormatToHMS(this.props.time_to),
          venue: this.props.venue,
          address_url: this.props.address_url
        },
        id: this.props.match.params.jobId || ""
      };
      const headers = {
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
      };
      const data = await apiCall('post', sendingData, POST_JOB, headers);
      if (data.status) {
        this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/manage-responses`, 'employer-saved-jobs'));
      }
    } catch (e) {
    }
  };
  /**
   * To get latitude an longitude
   * @param: x,y,lat,lng
   * @return: update into variable
   * */
  getLatitudeAndLongitude = ({x, y, lat, lng, event}) => {
    backupLatAndLong.lat = lat;
    backupLatAndLong.lng = lng;
  };
  /**
   * To update latitude an longitude
   * @param: newlocation(object)
   * @return: update state and call a function to toggle map
   * */
  setLatitudeAndLongitude = (newLocation) => {
    this.setState({selected_location: newLocation}, () => {
      this.getLocationText()
    });
    this.toggleMapPop();
  };
  /**
   * To get location
   * @return: call an api and change location on map
   * */
  getLocationText = async () => {
    const {selected_location} = this.state;
    const sendingData = {
      latlng: `${selected_location.lat},${selected_location.lng}`,
      key: 'AIzaSyBzc7ZO-NXQLEOIkjYngOb9APg35c-WljM'
    };
    const responseLocation = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: sendingData});
    try {
      this.props.change('venue', responseLocation.data.results[0].formatted_address);
      this.props.change('address_url', `https://www.google.com/maps/@${selected_location.lat},${selected_location.lng}`);
    } catch (exc) {
    }
  };
  /**
   * To open a popup for map
   * @return: update a state
   * */
  toggleMapPop = () => {
    this.setState({is_map_open: !this.state.is_map_open})
  };
  /**
   * on change of email
   * @param: name,value
   * @return: update a state
   * */
  setParticularState = (name, value) => {
    this.setState({[name]: value})
  };
  /**
   * To open or close map
   * @return: update a state
   * */
  toggleAddEmailPop = () => {
    const {add_email_popup} = this.state;
    this.setState({add_email_popup: !add_email_popup})
  };

  /**
   * to get all email ids from an api
   * @return: update a state
   * */
  getEmailIds = async () => {
    const sendingData = {};
    const receiveingData = await apiCall('get', sendingData, POST_JOBS_EMAIL_EXIST, this.header);
    if (receiveingData.status) {
      let emailsData = [];
      //converting emails data into object of array having key and value
      receiveingData.data.map((value, index) => {
        if (value !== '')
          emailsData.push({key: index + 1, value: value});
      });
      this.setParticularState("emails", emailsData)
    }
  };
  /**
   * on click of save button ,calling an api
   * @param: values
   * @return: redirect to next tab after successfully saved
   * */
  saveData = async (values) => {
    const sendingData = {
      manage_response: {
        ...values,
        date_from: FormatToYMD(values.date_from),
        date_to: FormatToYMD(values.date_to),
        time_from: FormatToHMS(values.time_from),
        time_to: FormatToHMS(values.time_to),
      },
      id: this.props.match.params.jobId
    };
    this.setParticularState("saveText", "Submitting");
    let receivingData = {};
    try {
      receivingData = await apiCall('post', sendingData, POST_JOB, this.header);
    } catch (exc) {
    }
    this.setParticularState("saveText", "Next");
    if (receivingData.status) {
      if (receivingData.status) this.props.history.push(this.props.match.url.replace('manage-responses', 'my-organisation'));
    }
  };
  /**
   * To add new email in dropdown for forward application
   * @param: email
   * @return: validate  email and saved
   * */
  addNewEmail = async (email) => {
    const AfterTrimEmail = email.trim();
    const {emails} = this.state;
    let emailExist = 0;
    emails.map(value => {
      if (value.value === AfterTrimEmail) {
        emailExist = -1
      }
    });
    let index = emails.length + 1;
    if (emailExist === 0) {
      emails.push({key: index, value: AfterTrimEmail});
      this.setParticularState("emails", emails);
      this.toggleAddEmailPop();
    } else toast("Email already Exist", {})
  };

  componentDidMount() {

    // creating reference of this component, to save data as draft
    this.props.onRef(this)
  }

  componentWillUnMount() {
    // removing reference of this component
    this.props.onRef(null)
  }

  componentWillMount() {

    // initially calling the function to get data from an api
    this.getInitialisedData();
  }

  /**
   * To get data of previous job id from an api
   * @return: calling a function to get data and emails
   * */
  getInitialisedData = () => {
    const {manage_responses_from_previous_job} = this.props;
    if (manage_responses_from_previous_job !== null && manage_responses_from_previous_job !== undefined &&
      manage_responses_from_previous_job !== [] && !isEmptyObject(manage_responses_from_previous_job)) {
      this.getDataFromRedux(manage_responses_from_previous_job);
      this.getEmailIds();
    } else {
      this.changeReduxStore(this.props.match.params.jobId);
      this.getEmailIds();
    }
  };
  /**
   * To get data from redux
   * @param: manage_responses_from_previous_job
   * @return: update a redux store with initial data
   * */
  getDataFromRedux = (manage_responses_from_previous_job) => {
    const fieldValues = ["email_or_walkin", "selected_email", "venue", "forward_application_to_email", "reference_code",
      "questioner_id", "address_url", "date_from", "date_to"];
    const recievedData = manage_responses_from_previous_job;
    fieldValues.map(singleField => {
      this.props.change(singleField, recievedData[singleField])
    });
    const TimeFields = ["time_to", "time_from"];
    TimeFields.map(singleField => {
      this.props.change(singleField, new Date("2014-08-18T" + recievedData[singleField]))
    })
  };

  /**
   * To get data from an api
   * @param: id
   * @return: update redux store with coming data
   * */
  changeReduxStore = async (id = this.props.match.params.jobId) => {
    const newSendingData = {id: id};
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    const jobData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, headers);
    if (jobData.status) {
      const fieldValues = ["email_or_walkin", "selected_email", "venue", "forward_application_to_email",
        "reference_code", "questioner_id", "address_url", "date_from", "date_to"];
      const recievedData = jobData.data.manage_response;
      try {
        fieldValues.map(singleField => {
          this.props.change(singleField, recievedData[singleField])
        })
      } catch (exc) {
      }
      const TimeFields = ["time_to", "time_from"];
      try {
        TimeFields.map(singleField => {
          this.props.change(singleField, new Date("2014-08-18T" + recievedData[singleField]))
        })
      } catch (exc) {
      }
    }
  };

  render() {
    const {emails, add_email_popup, saveText} = this.state;
    const {email_or_walkin, handleSubmit, valid, forward_application_to_email} = this.props;
    return (

      <div className="manage-responses">
        <form onSubmit={handleSubmit(this.saveData)}>
          <Field name="username"
                 label="Reference code"
                 type="TextField"
                 component={CustomComponents}
                 styleClass={{root: "left-half reference-code hidden-field"}}/>
          <Field
            name={''}
            label="Manage all Responses"
            type="FormLabel"
            styleClass={{field: "manage-all-responses", root: "manage-all-responses-text"}}
            component={CustomComponents}
          />
          <div className="receive-responses">
            <Field
              label="Receive responses on"
              type="FormLabel"
              styleClass={{field: "receive-responses-on"}}
              component={CustomComponents}
            />
            <Field
              name={'email_or_walkin'}
              type="Radio"
              className="email-walkin"
              styleClass={{field: "email-or-walking-radio"}}
              component={CustomComponents}
              radioButtons={[{
                name: "email_drive",
                value: "email",
                default_checked: true,
                label: "Email",
                styleClass: "radio-item"
              }, {
                name: "walkin_drive",
                value: "walkin",
                default_checked: false,
                label: "Walk-in",
                styleClass: "radio-item"
              }]}
            />
          </div>
          {
            email_or_walkin === "email" ?
              <div style={{marginTop: '-6px'}}>

                <Field
                  name="forward_application_to_email"
                  label="Forward applications to Email ID"
                  type="CheckBox"
                  checked={forward_application_to_email}
                  styleClass={{label: "forward-application"}}
                  component={CustomComponents}
                />
                {
                  forward_application_to_email ?
                    <div className="email-div">
                      <Field
                        name="selected_email"
                        label="Select from existing email id(s)"
                        type="DropDown"
                        emails={emails}
                        defaultValue={{key: 1, value: emails[1]}}
                        styleClass={{root: "left-half"}}
                        component={emailDropdown}
                      />
                      <Field
                        name='add_another_email'
                        label="Add another Email id"
                        type="Button"
                        styleClass={{field: "add-create-button-add-mail"}}
                        component={CustomComponents}
                        onButtonClick={this.toggleAddEmailPop}
                      />
                    </div> :
                    null
                }

              </div> :
              <div>
                <div className="walk-in-date-time">
                  <div className="walk-in-dates-times">
                    <Field
                      label="Walk-In date"
                      type="FormLabel"
                      styleClass={{root: "left-half", field: "walk-in-date"}}
                      component={CustomComponents}
                    />
                    <div>
                      <Field
                        name="date_from"
                        label="From"
                        type="DatePicker"
                        placeholder="Coin Name"
                        component={CustomComponents}
                        styleClass={{root: "half marginright"}}
                      />
                      <Field
                        name="date_to"
                        label="To"
                        type="DatePicker"
                        component={CustomComponents}
                        styleClass={{root: "half"}}
                      />
                    </div>
                  </div>

                  <div className="date-and-time walk-in-dates-times">
                    <Field
                      label="Walk-In time"
                      type="FormLabel"
                      styleClass={{field: "walk-in-date"}}
                      component={CustomComponents}
                    />
                    <div>
                      <Field
                        name="time_from"
                        label="From"
                        type="TimePicker"
                        placeholder="Coin Name"
                        component={CustomComponents}
                        styleClass={{root: "half marginright"}}
                      />
                      <Field
                        name="time_to"
                        label="To"
                        type="TimePicker"
                        placeholder="Coin Name"
                        component={CustomComponents}
                        styleClass={{root: "half"}}
                      />
                    </div>
                  </div>
                </div>
                <Field
                  name="venue"
                  label="Venue"
                  type="TextArea"
                  placeholder="Type Address or Venue here"
                  component={CustomComponents}
                  styleClass={{root: 'third-forth venue-margin'}}
                />
                <Field
                  name="address_url"
                  label="Paste the Address URL"
                  type="TextField"
                  placeholder="https://www.google.com/maps/place/Marol+Police+Camp/@19...L"
                  component={CustomComponents}
                  styleClass={{
                    root: 'third-forth search-placeholder-walkin',
                    field: 'third-forth',
                    endorment: "search-on-google-map"
                  }}
                  endorment={<CustomTag text="search-on-google-map" onclick={this.toggleMapPop}/>}
                />
              </div>
          }
          <Field
            name="reference_code"
            label="Reference code"
            type="TextField"
            component={CustomComponents}
            styleClass={{root: "left-half reference-code"}}
          />
          <div className="hr-line"></div>
          <button type="submit" style={{visibility: 'hidden'}}
                  ref={saveButton => this.saveButton = saveButton}
                  disabled={saveText === "Submitting"}
          >
          </button>
          <div className="next-manage-response-details">
            <button
              className="shenzyn-btn filled-primary-button px-48"
              saveText="Next"
              onClick={() => {
                this.saveButton.click()
              }}>
              Next
            </button>
          </div>
        </form>
        <Modal open={add_email_popup}>
          <AddEmail toggleAddEmailPop={this.toggleAddEmailPop} addNewEmail={this.addNewEmail}/>
        </Modal>
        <Modal
          open={this.state.is_map_open}
        >
          <PostJobMap
            getLatitudeAndLongitude={this.getLatitudeAndLongitude}
            selected_location={this.state.selected_location}
            toggleMapPop={this.toggleMapPop}
            setLatitudeAndLongitude={this.setLatitudeAndLongitude}
            venue={this.props.venue}
          />
        </Modal>
      </div>
    );
  }
}

const from = new Date();
var to = new Date();
from.setDate(from.getDate() + 1);
to.setDate(from.getDate() + 1);
const selector = formValueSelector('ManageResponses');
const mapStateToProps = (state) => {
  const manage_responses_from_previous_job = state.postJobModal.manage_response;
  return {
    manage_responses_from_previous_job: manage_responses_from_previous_job,
    initialValues: {
      "email_or_walkin": "email",
      "selected_email": "",
      "venue": '',
      "forward_application_to_email": false,
      "reference_code": '',
      "address_url": '',
      "time_from": new Date('2014-08-18T09:00:00'),
      "time_to": new Date('2014-08-18T09:00:00'),
      "date_from": null,
      "date_to": null,
      ...manage_responses_from_previous_job
    },
    "selected_email": selector(state, 'selected_email'),
    "email_or_walkin": selector(state, 'email_or_walkin'),
    "reference_code": selector(state, "reference_code"),
    "forward_application_to_email": selector(state, "forward_application_to_email"),
    "venue": selector(state, "venue"),
    "address_url": selector(state, "address_url"),
    "date_from": selector(state, "date_from"),
    "date_to": selector(state, "date_to"),
    "time_from": selector(state, "time_from"),
    "time_to": selector(state, "time_to"),
  }
};

const validate = (values) => {
  const errors = {};
  if (values.email_or_walkin === 'email') {

  } else {
    if (values.venue === "") {
      errors['venue'] = "Kindly Mention venue details for the walk-in";
    } else if (values.venue && values.venue.length >= 255) {
      errors['venue'] = "venue address must of maximum 255 characters";
    }


    if (values.date_from == null || values.date_from === '') {

      errors['date_from'] = "Kindly select a valid date range"
    }
    if (values.date_to == null || values.date_to === '') {
      errors['date_to'] = "Kindly select a valid date range"
    }
    if (values.time_from == null || values.time_from === '' || values.time_from == 'Invalid Date') {
      errors['time_from'] = "Kindly select a specific time"
    }
    if (moment(values.date_from).format('DD') == moment(values.date_to).format('DD')
      && moment(values.date_from).format('MM') == moment(values.date_to).format('MM')
      && moment(values.date_from).format('YYYY') == moment(values.date_to).format('YYYY')
      && (new Date(values.time_from).getTime()) >= (new Date(values.time_to).getTime())) {
      errors['time_to'] = " To Time’ must be greater than ‘From Time’ "
    }
    if (values.time_to == null || values.time_to === '' || values.time_to == 'Invalid Date') {
      errors['time_to'] = "Kindly select a specific time"
    }
    if (moment(values.date_from).isAfter(values.date_to, "day") || moment(values.date_from).isBefore(new Date(), "day")) {
      errors['date_from'] = "‘To Date’ must be greater than ‘From Date’"
    }
    if (moment(values.date_to).isBefore(values.date_from, "day") || moment(values.date_to).isBefore(new Date(), "day")) {
      errors['date_to'] = "‘To Date’ must be greater than ‘From Date’"
    }
  }
  if (values.reference_code && values.reference_code.length < 4) {
    errors['reference_code'] = "Kindly enter a valid code"
  }
  if (!(/^[A-Za-z0-9]{0,10}$/.test(values.reference_code))) {
    errors['reference_code'] = "Kindly enter a reference code in alphanumeric style only"
  }
  return errors
};

ManageResponses = reduxForm({
  form: "ManageResponses",
  onSubmit: submit,
  enableReinitialize: true,
  validate
})(ManageResponses)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({change}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageResponses);


