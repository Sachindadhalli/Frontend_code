//library dependencies
import React, {Component} from 'react';
import {withStyles, FormControl, TextField, FormHelperText} from "@material-ui/core";

//style
import './style.scss';

//custom component
import SaveAndCancelButton from '../../../../../../components/SaveAndCancelButton/SaveAndCancelButton';
import CreatableRemoteDataSingleSelectDropdown
  from "../../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown";

//utilities
import {CREATE_ORGANISATION, ORGANISATION} from '../../../../../../../config/constants';

//customised material ui style
const styles = (theme) => ({formControl: {width: "47.61%"}});

// To validate the website name
function isUrlValid(userInput) {
  let res = userInput.match(/(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g);
  if (res === null) return false;
  else return true;
}

class AddOrganisationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation_name: {key: '', value: ''},
      key: "",
      organisation_name_error: "",
      organisation_descreption: '',
      organisation_descreption_error: "",
      website_name: '',
      website_name_error: "",
      saveText: "Save",
      current_employer_error: '',
      current_employer: false,
      allFieldsStatus: {website_name: false, organisation_descreption: false, organisation_name: false}
    }
  }

  componentWillMount() {
    // receiving a props edit view , to auto populate data in organisation component to edit
    // reset the form for add new organisation

    if (this.props.editView) {
      if (this.props) {
        this.setState({
          organisation_name: this.props.editData.organisation_name,
          organisation_descreption: this.props.editData.description,
          website_name: this.props.editData.url,
          key: this.props.editData.key
        }, () => {
        })
      }
    } else this.setState({organisation_name: "", organisation_descreption: "", website_name: "", key: ""})
  }

  /**
   * To handle change in input of all fields of form
   * @param: event, validatorAfterSave
   * @return: update the state and call a function to validate fields
   * */
  handleInput = (e, validatorAfterSave = null) => {
    const {allFieldsStatus} = this.state;
    const {name} = e.target;
    allFieldsStatus[name] = true;
    this.setState({[name]: e.target.value, allFieldsStatus}, () => {
      if (validatorAfterSave) this.validateFields(name);
    })
  };

  /**
   * To handle validations before save
   * @return:  if form is validate call a function to save the details
   * */
  checkValidation = async () => {
    const isValid = await this.handleSaveOrganisation();
    if (!isValid) {
    } else this.props.saveOrganisation(this.state)
  };

  /**
   * To validate all fields one by one
   * @param: fieldName
   * @return:  call a particular function for particular field
   * */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'organisation_name':
        this.validateOrganisationName();
        break;
      case 'organisation_descreption':
        this.validateOrganisationDescription();
        break;
      case 'website_name':
        this.validateOrganisationWebsite();
        break;
    }
  };

  /**
   * To validate the organisation name
   * @return:  update the state with error message
   * */
  validateOrganisationName = async () => {
    let errorValue = "";
    if (!this.state.organisation_name || !this.state.organisation_name.value) {
      errorValue = "Kindly specify your company name";
    }
    this.setParticularField('organisation_name', errorValue);
    return !!errorValue;
  };

  /**
   * To validate the organisation Description
   * @return:  update the state with error message
   * */
  validateOrganisationDescription = () => {
    let errorValue = "";
    if (!this.state.organisation_descreption) {
      errorValue = "Kindly specify your organisation description";
    } else if (this.state.organisation_descreption.length > 500) {
      errorValue = "Maximum 500 characters limit exceeded"
    }
    this.setParticularField('organisation_descreption', errorValue);
    return !!errorValue;
  };

  /**
   * To validate the website name
   * @return:  update the state with error message
   * */
  validateOrganisationWebsite = async () => {
    let errorValue = "";
    if (!isUrlValid(this.state.website_name)) errorValue = "Kindly specify correct website link";
    this.setParticularField('website_name', errorValue);
    return !!errorValue;
  };

  /**
   * To reset the error message on focus
   * @return:  call a function to remove error message
   * */
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };

  /**
   * To displaying the error message
   * @return:  update the state with remove error message
   * */
  setParticularField = (name, value) => {
    this.setState({[name + '_error']: value})
  };

  /**
   * To validate all fields of form
   * @return:  call a function to validate the field
   * */
  FormValidate = () => {
    const fields = ['website_name', 'organisation_descreption', 'organisation_name'];
    fields.map(async value => {
      await this.validateFields(value)
    })
  };

  /**
   * on click of Save button ,validating all field
   * @return: {boolean}
   * */
  handleSaveOrganisation = async () => {
    await this.FormValidate();
    const field_error = ['organisation_name_error', 'website_name_error', 'organisation_descreption_error'];
    let isValid = true;
    field_error.map(value => {
      if (this.state[value] !== '') {
        isValid = false;
        return isValid
      }
    });
    return isValid
  };

  /**
   * To save the detail of organisation
   * @return:  call back a function  to save the organisation
   * */
  saveData = () => {
    const sendingData = {organisation_response: {...values,}};
    this.props.saveOrganisation(sendingData);
  };

  /**
   * To save the  organisation name from selected dropdown value
   * @return: update the state and validate organisation name field
   * */
  setValuesInStateOrganisation = (value, label) => {
    const {allFieldsStatus} = this.state;
    allFieldsStatus[label] = true;
    this.setState({[label]: value, allFieldsStatus},
      () => {
        this.validateOrganisationName()
      }
    )
  };

  render() {
    const {saveText} = this.state;
    const {classes} = this.props;
    return (
      <div className="my-organisation">
        <div className="add-organisation">Add Organisation</div>
        <div className="organisation-style">
          <div className="delete-all-information-root">
            <div className="align-item-space-between">
              <FormControl className={classes.formControl}>
                <label className="status-label-text">Organisation Name</label>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={ORGANISATION}
                  queryParams={{search: ''}}
                  defaultValue={this.state.organisation_name ? {
                    label: this.state.organisation_name.value,
                    value: this.state.organisation_name.key
                  } : ''}
                  getSelectedOption={(option) => this.setValuesInStateOrganisation({
                    key: option ? option.value : "",
                    value: option ? option.label : ""
                  }, "organisation_name")}
                  isClearable={true}
                  error={this.state.organisation_name_error}
                />
                {this.state.organisation_name_error &&
                <FormHelperText style={{color: "#f0582b"}}>{this.state.organisation_name_error}</FormHelperText>}
              </FormControl>
              <FormControl className={classes.formControl}>
                <label className="status-label-text">Organisation Description</label>
                <TextField
                  name="organisation_descreption"
                  style={{margin: 0}}
                  fullWidth
                  margin="normal"
                  value={this.state.organisation_descreption}
                  onChange={(value) => this.handleInput(value, false)}
                  onBlur={() => this.validateFields('organisation_descreption')}
                  onFocus={this.removeErrorFocus}
                  error={this.state.organisation_descreption_error}
                  InputLabelProps={{shrink: true,}}
                />
                {this.state.organisation_descreption_error &&
                <FormHelperText style={{color: "#f0582b"}}>{this.state.organisation_descreption_error}</FormHelperText>}
              </FormControl>
            </div>
            <div className="second-div-35-top-margin">
              <FormControl className={classes.formControl}>
                <label className="status-label-text">Website Name</label>
                <TextField
                  name="website_name"
                  style={{margin: 0}}
                  fullWidth
                  margin="normal"
                  value={this.state.website_name}
                  onChange={(value) => this.handleInput(value, false)}
                  onBlur={() => this.validateFields('website_name')}
                  onFocus={this.removeErrorFocus}
                  error={this.state.website_name_error}
                  InputLabelProps={{shrink: true,}}
                />
                {this.state.website_name_error &&
                <FormHelperText style={{color: "#f0582b"}}>{this.state.website_name_error}</FormHelperText>}
              </FormControl>
            </div>
          </div>
        </div>
        <div className="form-hr-line">
        </div>
        {!this.props.firstOrganisation ?
          <div style={{paddingBottom: "10px"}}>
            <SaveAndCancelButton
              cancelText="Cancel"
              saveText={saveText}
              onCancel={this.props.cancel}
              onSave={this.checkValidation}
            />
          </div> :
          <div className="first-organisation-save-btn">
            <button className="shenzyn-btn filled-primary-button  px-40 mr-20"
                    saveText={saveText}
                    onClick={() => this.props.saveOrganisation(this.state)}>
              Save
            </button>
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(AddOrganisationComponent);
