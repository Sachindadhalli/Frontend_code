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

class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_dsc: '',
      title: '',
      description: '',
      title_error: '',
      description_error: '',
    };
    // this.checkForErrors = this.checkForErrors.bind(this);
  }
  resetErrors = () => {
    this.setState({
      title_error: '',
      description_error: '',
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
      case 'title':
        this.validateTitleForm();
        break;
      case 'description':
        this.validateDescriptionForm();
        break;
    }
  };
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateTitleForm = async () => {
    let errorValue = '';
    if (!this.state.title) {
      errorValue = 'Kindly specify your Title';
    }
    this.setParticularField('title', errorValue);
    return errorValue ? true : false;
  };
  validateDescriptionForm = async () => {
    let errorValue = '';
    if (!this.state.description) {
      errorValue = 'Kindly specify your Description';
    }
    this.setParticularField('description', errorValue);
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
    const { role_dsc, title, description, title_error, description_error } = this.state;
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
        <div className="fres-internship">Title</div>
        {/* <Input
          id="loc"
          placeholder="E.g.  Employee of the month"
          //className="loc"
          // onChange={this.handleChange('name')}
          margin="normal"
          width="100%"
          //style={{ marginTop: '30px' }}
        /> */}
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="title"
          />
          <Input
            placeholder="E.g.  Employee of the month"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('title')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={title_error ? title_error : false}
          />
          {title_error ? (
            <FormHelperText error={title_error} id="firstName_error">
              <span className="field_error">{title_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag text={role_dsc === '' ? 50 : 50 - role_dsc.length} className="count" />
        </div>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="description"
          >
            Description
          </InputLabel>
          <Input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('description')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={description_error ? description_error : false}
          />
          {description_error ? (
            <FormHelperText error={description_error} id="firstName_error">
              <span className="field_error">{description_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag text={role_dsc === '' ? 500 : 500 - role_dsc.length} className="count" />
        </div>
        <div style={{ textAlign: 'right' }}>
          {/* {index !== 0 ? ( */}
          <FormControl style={{ marginLeft: '11px' }} className="shape-minus">
            <div className="shape" onClick={this.props.removeReward}>
              <div className="minus">-</div>
            </div>
          </FormControl>
          {/* ) : null} */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Reward);
