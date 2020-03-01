//library dependencies
import React, {Component} from 'react';
import {Grid, withStyles, InputLabel, Input, FormHelperText, FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

//style
import './style.scss'

//custom component
import CustomTag from '../../../../../../../../components/CustomTag';
import CustomIcon from '../../../../../../../../components/CustomIcon';
import NonCreatableRemoteDataSingleSelectDropdown
  from '../../../../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown'
import CreatableRemoteDataSingleSelectDropdown
  from '../../../../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown'

//icon
import edit_icon from '../../../../../../../../../assets/media/icons/editIcon.svg';
import close_icon from '../../../../../../../../../assets/media/icons/croosIcon.png';
import display_picture from '../../../../../../../../../assets/media/icons/profile-girl.svg';
import {validateName, validateDesignation} from '../../../../../../../../Utilities';
import {
  COUNTRY, CITY, EMPLOYER_UPDATE_BASIC_PROFILE_DETAILS, JOB_ROLE, ORGANISATION, EMPLOYER_GET_BASIC_PROFILE_DETAILS,
  SERVER_API_URL,
} from '../../../../../../../../../config/constants';
import {apiCall, handleLocalStorage, fileValidation} from '../../../../../../../../Utilities';
import * as actions from '../../../../../../../../actions/homePageEmp/'

//customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  cssError: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
});

class PersonalDetailEdit extends Component {
  constructor(props) {
    super(props)
    this.resetErrors()
    this.state = {
      ...this.props.basicDetails,
      name_error: '',
      current_employer_error: '',
      current_designation_error: '',
      current_country_error: '',
      current_city_error: '',
      currentCountryOption: {},
      selected_image: null,
      image_name: null,
      allFieldsStatus: {
        name: false,
        current_employer: false,
        current_designation: false,
        current_country: false,
        current_city: false
      }
    }
  }

  /**
   * To reset the error field
   */
  resetErrors = () => {
    this.setState({
      name_error: '',
      current_employer_error: '',
      current_designation_error: '',
      current_country_error: '',
      current_city_error: '',
    })
  };
  /**
   * on change in input fields of form
   * @param e
   * @param validatorAfterSave
   */
  handleInput = (e, validatorAfterSave = null) => {
    const {allFieldsStatus} = this.state;
    const {name} = e.target;
    allFieldsStatus[name] = true; //change the touch status of field
    this.setState({
      [name]: e.target.value,
      allFieldsStatus
    }, () => {
      if (validatorAfterSave) {
        this.validateFields(name);
      }
    })
  };

  /**
   * On change in the Drop Down  Fields "CreatableRemoteDataSingleSelectDropdown"
   * @param option
   * @param name
   * @param validatorAfterSave
   */
  setDropdownOption = (option, name, validatorAfterSave = null) => {
    const {allFieldsStatus} = this.state;
    allFieldsStatus[name] = true; //change the touch status of field
    const opt = option ? {key: option.value, value: option.label} : '';
    this.setState({
      [name]: opt,
      [`${name}_error`]: '',
      currentCountryOption: name == 'current_country' ? option : this.state.currentCountryOption,
      allFieldsStatus
    }, () => {
      this.validateFields(name);
    })
  };

  /**
   * On click of Discard change button
   * @param e
   */
  discardChanges = (e) => {
    this.resetErrors();
    this.setState({
      ...this.props.basic_details,
      selected_image: null,
      image_name: null,
    })
    this.props.onclick();
  };

  /**
   * TO validate all field
   * @returns {Promise<boolean>}
   */
  validateNameForm = async () => {
    let errorValue = '';
    if (this.state.name == "") {
      errorValue = "Kindly specify your name";
    }
    else if (this.state.name.length < 2 || this.state.name.length > 40) {
      errorValue = "Name is minimum 2 or maximum 40 characters"
    }
    else if (await validateName(this.state.name, 40) === false) {
      errorValue = "Numeric and special Characters(except one dot and one space) are not allowed";
    }
    this.setParticularField('name', errorValue);
    return errorValue ? true : false
  };

  /**
   * TO validate current designation form
   * @returns {Promise<boolean>}
   */
  validateCurrentDesignationForm = async () => {
    let errorValue = "";
    if (!this.state.current_designation || !this.state.current_designation.value) {
      errorValue = "Kindly specify your current designation";
    }
    else if (await validateDesignation([this.state.current_designation.value], 'current_designation') === false) {
      errorValue = "Only one special character(dot) is allowed"
    }
    this.setParticularField('current_designation', errorValue);
    return errorValue ? true : false;
  };

  /**
   * TO validate current employer form
   * @returns {Promise<boolean>}
   */
  validateCurrentEmployerForm = async () => {
    let errorValue = "";
    if (!this.state.current_employer || !this.state.current_employer.value) {
      errorValue = "Kindly specify your current company name";
    }
    else if (await validateDesignation([this.state.current_employer.value], 'current_employer') === false) {
      errorValue = "Only Alphabets, Dots And Spaces Are Allowed. Must Start With An Alphabet"
    }
    this.setParticularField('current_employer', errorValue);
    return errorValue ? true : false;
  };

  /**
   * TO validate the country field
   * @returns {Promise<boolean>}
   */
  validateCountryForm = async () => {
    let errorValue = "";
    if (!this.state.current_country) {
      errorValue = "Kindly specify your location";
    }
    else if (await validateDesignation([this.state.current_country.value], 'current_country') === false) {
      errorValue = "Only Alphabets, Dots And Spaces Are Allowed. Must Start With An Alphabet"
    }
    this.setParticularField('current_country', errorValue);
    return errorValue ? true : false;
  };

  /**
   * To validate the city field
   * @returns {Promise<boolean>}
   */
  validateCityForm = async () => {
    let errorValue = "";
    if (!this.state.current_city) {
      errorValue = "Kindly specify your city";
    }
    else if (await validateDesignation([this.state.current_city.value], 'current_city') === false) {
      errorValue = "Only Alphabets, Dots And Spaces Are Allowed. Must Start With An Alphabet"
    }
    this.setParticularField('current_city', errorValue);
    return errorValue ? true : false;
  };

  /**
   * To update the state with error of particular field
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    })
  };

  /**
   * TO validate all the fields, calling particular function
   * @param fieldName
   */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'name':
        this.validateNameForm();
        break;
      case 'current_designation':
        this.validateCurrentDesignationForm();
        break;
      case 'current_employer':
        this.validateCurrentEmployerForm();
        break;
      case 'current_country':
        this.validateCountryForm();
        break;
      case 'current_city':
        this.validateCityForm();
        break;
    }
  };

  /**
   * TO remove the error on focus the field
   * @param e
   */
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };

  /**
   * On click to upload the profile image
   * @param e
   * @returns {Promise<*>}
   */
  fileSelectedHandler = async (e) => {
    const selectedFile = e.target.files[0]
    const previewSrc = URL.createObjectURL(event.target.files[0])
    if (!fileValidation(event.target.files[0], 2, ['jpg', 'gif', 'png'])) {
      return this.props.toast("Uploaded image cannot be more than 2 MB", {})
    }

    this.setState({
      'selected_image': selectedFile,
      'image_name': selectedFile.name,
      previewSrc
    })
  };
  /**
   * On click to remove the profile image
   * @returns {Promise<void>}
   */
  removeImage = async () => {
    this.setState({
      image_name: null,
      selected_image: null,
      profile_pic: null,
      previewSrc: null,
    });
  };

  /**
   * on click of save button,calling an api,after validate
   * @returns {Promise<void>}
   */
  handleSave = async () => {
    let {allFieldsStatus} = this.state;
    await this.validateNameForm();
    await this.validateCurrentDesignationForm()
    await this.validateCurrentEmployerForm()
    await this.validateCountryForm()
    await this.validateCityForm()
    const {name_error, current_employer_error, current_designation_error, current_country_error, current_city_error} = this.state;
    if (!name_error && !current_employer_error && !current_designation_error && !current_country_error && !current_city_error) {
      let finalData = new FormData();
      finalData.append("first_name", this.state.name)
      finalData.append("profile_pic_data", this.state.selected_image ? this.state.selected_image : this.state.profile_pic)
      finalData.append("country", this.state.current_country.key)
      finalData.append("city", this.state.current_city.key)
      finalData.append("current_designation", this.state.current_designation.key)
      finalData.append("current_employer", this.state.current_employer.key)
      try {
        const header = {
          'authorization': handleLocalStorage("get", "employerLogin")
        }
        let response = await apiCall("post", finalData, EMPLOYER_UPDATE_BASIC_PROFILE_DETAILS, header)
        if (response.status) {
          let getResponseData = await apiCall("get", finalData, EMPLOYER_GET_BASIC_PROFILE_DETAILS, header)
          if (getResponseData && getResponseData.status) {
            let data = getResponseData.data;
            const basicDetails = {
              profile_pic: data.profile_pic_url,
              name: data.first_name,
              current_country: data.country,
              current_city: data.city,
              current_employer: data.current_employer,
              current_designation: data.current_designation
            }
            this.props.updateEmpBasicDetails(basicDetails)
            this.props.onclick()
          }
        }
      }
      catch (e) {
      }
    }
  };

  render() {
    const {name, current_employer, current_designation, current_country, current_city, image_name, previewSrc, profile_pic} = this.state;
    const {name_error, current_employer_error, current_designation_error, current_country_error, current_city_error} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <div className="edit-details-header">
          <div className="save-discard">
            <CustomTag text="Save" className="save" onclick={this.handleSave}/>
            <CustomTag text="Discard Changes" className="discard-changes" onclick={this.discardChanges}/>
          </div>
          <div className="edit-basic-details">
            Edit Basic Details
          </div>
        </div>
        <div className="peronal-details-form">
          <form>
            <Grid container spacing={32} alignItems="center">
              <Grid item xs={12} md={6}>
                <div className="profile-picture-container">

                  <div className="profile-rectangle">
                    <div class="remove-profile-icon ">
                      <img height={'27px'} width={'27px'}
                           src={close_icon}
                           onClick={this.removeImage}
                           height={27}
                           width={27}
                      />
                    </div>
                    <CustomIcon
                      icon={previewSrc ? previewSrc : profile_pic ? SERVER_API_URL + profile_pic : display_picture}
                      iconStyle="profile-img"/>
                  </div>
                  <input name="selected_image" type="file"
                         accept="image/*"
                         onChange={this.fileSelectedHandler}
                         style={{display: 'none'}}
                         ref={fileInput => this.fileInput = fileInput}
                  />
                  <div className="profile-oval"
                       onClick={() => this.fileInput.click()}
                  >
                    <CustomIcon icon={edit_icon} iconStyle=""/>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  error={name_error !== ""}
                  className="form-child"
                >
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    }}
                    shrink={true}
                    htmlFor="name">Name</InputLabel>
                  <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.handleInput}
                    onBlur={() => this.validateFields('name')}
                    onFocus={this.removeErrorFocus}
                    autoComplete="off"
                  />
                  <FormHelperText className="field_error">{name_error}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={32} className="mt-8">
              <Grid item xs={12} md={6}>
                <InputLabel
                  style={{marginTop: 0}}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  {'Current Employer'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={ORGANISATION}
                  queryParams={{search: ''}}
                  defaultValue={current_employer ? {value: current_employer.key, label: current_employer.value} : ''}
                  getSelectedOption={(option) => this.setDropdownOption(option, 'current_employer')}
                  isClearable={true}
                  error={current_employer_error ? current_employer_error : false}
                />
                {current_employer_error ? <FormHelperText error={current_employer_error} id="firstName_error">
                            <span className="field_error">
                              {current_employer_error}
                            </span>
                </FormHelperText> : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  style={{marginTop: 0}}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  {'Current Designation'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={JOB_ROLE}
                  queryParams={{search: ''}}
                  defaultValue={current_designation ? {
                    value: current_designation.value,
                    label: current_designation.value
                  } : ''}
                  getSelectedOption={(option) => this.setDropdownOption(option, 'current_designation')}
                  isClearable={true}
                  error={current_designation_error ? current_designation_error : false}
                />
                {current_designation_error ? <FormHelperText error={current_designation_error} id="firstName_error">
                            <span className="field_error">
                              {current_designation_error}
                            </span>
                </FormHelperText> : null}
              </Grid>
            </Grid>
            <Grid container spacing={32} className="mt-24" justify="space-between">
              <Grid item xs={12} md={6} style={{marginBottom: 0}}>
                <InputLabel
                  style={{marginTop: 0}}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  {'Country'}
                </InputLabel>
                <NonCreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={COUNTRY}
                  queryParams={{search: ''}}
                  defaultValue={current_country ? {value: current_country.key, label: current_country.value} : ''}
                  getSelectedOption={(option) => this.setDropdownOption(option, 'current_country')}
                  isClearable={false}
                  error={current_country_error}
                />
                {current_country_error ? <FormHelperText error={current_country_error} id="firstName_error">
                            <span className="field_error">
                              {current_country_error}
                            </span>
                </FormHelperText> : null}
              </Grid>
              <Grid item xs={12} md={6} style={{marginBottom: 0}}>
                <InputLabel
                  style={{marginTop: 0}}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  {'Current City'}
                </InputLabel>
                <NonCreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={CITY}
                  queryParams={{
                    country: this.state.currentCountryOption.hasOwnProperty('label') ? this.state.currentCountryOption.label : '',
                    state: '',
                    search: ''
                  }}
                  defaultValue={current_city ? {value: current_city.key, label: current_city.value} : ''}
                  getSelectedOption={(option) => this.setDropdownOption(option, 'current_city')}
                  isClearable={false}
                  error={current_city_error}
                />
                {current_city_error ? <FormHelperText error={current_city_error} id="firstName_error">
                            <span className="field_error">
                              {current_city_error}
                            </span>
                </FormHelperText> : null}
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

PersonalDetailEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    basicDetails: state.empHomePage.personalDetails.basicDetails
  }
}

const mapDispatchToProps = dispatch => ({
  updateEmpBasicDetails: bindActionCreators(
    actions.updateEmpBasicDetails,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalDetailEdit))
