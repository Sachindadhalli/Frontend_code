import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
// import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import UserBasicDetailsView from '../../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import BoxInternship from '../../UserEmployment/components/BoxInternship';
import BoxTraining from '../../UserEmployment/components/BoxTraining';
import NonCreatableSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown';

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
const allDropDownWidth = {
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
const experiences_year = [];
for (let i = 1; i <= 30; i++) {
  //experiences_year.push(i.toString());
  experiences_year.push({ key: i, value: i });
}
class Certification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certification_name: '',
      certification_body: '',
      certification_name_error: '',
      certification_body_error: '',
      year: '',
      year_error: '',
    };
    // this.checkForErrors = this.checkForErrors.bind(this);
  }
  resetErrors = () => {
    this.setState({
      certification_name_error: '',
      certification_body_error: '',
      year_error: '',
    });
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        // debugger;
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'certification_name':
        this.validateCertificationNameForm();
        break;
      case 'certification_body':
        this.validateCertificationBodyForm();
        break;
      case 'year':
        this.validateYearForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateCertificationNameForm = async () => {
    let errorValue = '';
    if (!this.state.certification_name) {
      errorValue = 'Kindly specify your Certification Name';
    }
    this.setParticularField('certification_name', errorValue);
    return errorValue ? true : false;
  };
  validateCertificationBodyForm = async () => {
    let errorValue = '';
    if (!this.state.certification_body) {
      errorValue = 'Kindly specify your Certification body';
    }
    this.setParticularField('certification_body', errorValue);
    return errorValue ? true : false;
  };
  validateYearForm = async () => {
    let errorValue = '';
    if (!this.state.year) {
      errorValue = 'Kindly specify your Year';
    }
    this.setParticularField('year', errorValue);
    return errorValue ? true : false;
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  render() {
    const { classes, index } = this.props;
    const {
      certification_name,
      certification_body,
      year,
      certification_name_error,
      certification_body_error,
      year_error,
    } = this.state;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <div className="training-box" key={index}>
        <div style={{ textAlign: 'right' }}>
          <CustomIcon
            icon={deleteIcon}
            className="delete-icon"
            // onclick={e => {
            //   this.props.deleteQualifications(qualification_id);
            // }}
          />
        </div>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="certification_name"
          >
            Certification Name
          </InputLabel>
          <Input
            name="certification_name"
            type="text"
            value={this.state.certification_name}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('certification_name')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={certification_name_error ? certification_name_error : false}
          />
          {certification_name_error ? (
            <FormHelperText error={certification_name_error} id="firstName_error">
              <span className="field_error">{certification_name_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="certification_body"
          >
            Certification Body
          </InputLabel>
          <Input
            name="certification_body"
            type="text"
            value={this.state.certification_body}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('certification_body')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={certification_body_error ? certification_body_error : false}
          />
          {certification_body_error ? (
            <FormHelperText error={certification_body_error} id="firstName_error">
              <span className="field_error">{certification_body_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="yr form-child" style={{ marginTop: '30px' }}>
          <FormControl
            style={{ width: '100%' }}
            className={'one-forth-form one-forth-form-left ' + classes.formControl}
          >
            <InputLabel
              shrink={true}
              style={{ marginTop: '-13px' }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Years
            </InputLabel>

            <NonCreatableSingleSelectDropdown
              // isSearchable={false}
              // getSelectedOption={option => this.setYears(option)}
              // defaultValue={year ? { key: year, label: year } : {}}
              options={experiences_year}
              isClearable={false}
              error={year_error}
            />
            {year_error ? (
              <FormHelperText error={year_error} id="firstName_error">
                <span className="field_error">{year_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div style={{ textAlign: 'right' }}>
          {/* {index !== 0 ? ( */}
          <FormControl style={{ marginLeft: '11px' }} className="shape-minus">
            <div className="shape" onClick={this.props.removeCertificate}>
              <div className="minus">-</div>
            </div>
          </FormControl>
          {/* ) : null} */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Certification);
