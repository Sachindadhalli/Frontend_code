import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import { withRouter } from 'react-router-dom';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import { CURRENCY } from '../../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
// import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  Input: {
    flexBasis: 200,
  },
  button: {
    margin: '11px',
    borderRadius: '20px',
  },
  input: {
    display: 'none',
  },
  formControl: {
    marginBottom: '5px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  ...customisedMaterial,
  label: {
    fontWeight: 'normal',
    fontSize: '16px',
    color: 'black',
  },
});
//const BasicDetailsEdit = ({ type }) => (
class BasicDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.resetErrors();
    this.state = { mobile_number: '', mobile_number_error: '' };
    this.checkForErrors = this.checkForErrors.bind(this);
  }
  componentDidMount() {
    if (this.props.checkForErrors == true) {
      this.checkForErrors();
    }
    this.props.onRef(this);
  }
  componentWillUnmount() {
    // debugger;
    this.props.onRef(null);
  }
  checkForErrors() {
    let error = false;
    if (typeof this.state.mobile_number === 'string' || this.state.mobile_number == '') {
      error = true;
      this.setState({
        mobile_number_error: 'Kindly specify your Mobile Number',
      });
    }
  }
  resetErrors = () => {
    this.setState({ mobile_number_error: '' });
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        //debugger;
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'mobile_number':
        this.validateMobileNumberForm();
        break;
    }
  };
  validateMobileNumberForm = async () => {
    let errorValue = '';
    if (!this.state.mobile_number) {
      errorValue = 'Kindly specify your Mobile Number';
    }
    this.setParticularField('mobile_number', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
    //debugger;
    if (event.target.value == 'advance') {
      console.log('hint1', event.target.value);
      this.props.history.push({
        pathname: 'exp-profile',
      });
    } else {
      this.props.history.push({
        pathname: 'user-profile',
      });
      console.log('hint2', event.target.value);
    }
  };
  //on discard change
  discardChanges = e => {
    this.resetErrors();
    this.setState({
      ...this.props.basic_details,
      selected_image: null,
      image_name: null,
    });
    this.props.onclick();
  };
  render() {
    const { mobile_number, mobile_number_error } = this.state;
    const { classes, type } = this.props;
    return (
      <div className={'basic-details-div'}>
        <div className="first">
          <div className="box-pro">
            <div className="fres-text">Experience</div>
            <div className="search-type-radio-buttons wrapper1">
              {/* <CustomTag text="Experience" className="exp" /> */}
              <div className="second">
                <FormControl component="fieldset" className="radio-button-control">
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className="search-radio-buttons"
                    value={type == 'fresher' ? 'search' : 'advance'}
                    //onChange={this.props.expChange}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="search" control={<Radio />} label="Fresher" />
                    <FormControlLabel value="advance" control={<Radio />} label="Experienced" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="annual-salary">
            <div className="full-form-child annual-salary-fields">
              <div className="full-form-child" style={{ marginLeft: '-14px' }}>
                <div className="save-details-header">
                  <div className="update">
                    <CustomTag text="Update" className="save" />
                  </div>
                  {/* <Input id="mobile" placeholder="Mobile Number" className="mobile" margin="normal" /> */}
                  <FormControl
                    //error={marks_error !== ''}
                    className={'form-child '}
                    // style={{ marginLeft: '35px' }}
                  >
                    <InputLabel
                      classes={{ root: classes.helperText }}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                      shrink={true}
                      htmlFor="mobile_number"
                    >
                      Mobile Number
                    </InputLabel>
                    <Input
                      name="mobile_number"
                      type="number"
                      //value={mobile_number}
                      onChange={this.handleInput}
                      onBlur={() => this.validateFields('mobile_number')}
                      onFocus={this.removeErrorFocus}
                      autoComplete="off"
                      error={mobile_number_error ? mobile_number_error : false}
                    />
                    {/* <FormHelperText className="field_error">{marks_error}</FormHelperText> */}
                    {mobile_number_error ? (
                      <FormHelperText error={mobile_number_error} id="firstName_error">
                        <span className="field_error">{mobile_number_error}</span>
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      //);
    );
  }
}
export default withStyles(styles)(BasicDetailsEdit);
