import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';
import { fileValidation, browserValidation, apiCall } from '../../../../Utilities';
import { AADHAR_UPDATE } from '../../../../../config/constants';
import ProjectEdit from './components/ProjectEdit';
import ProjectView from './components/ProjectView';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {},
  label: {
    color: '#656565',
  },
  greenLabel: {
    color: '#0f0',
  },
  greenUnderline: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  greenInkbar: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  helperText: {
    color: '#656565',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 70,
  },
  input: {
    display: 'none',
  },
  formControl: {
    marginBottom: '5px',
  },
  padding: {},
  ...customisedMaterial,
});
const allDropDownWidth = {
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
class UserProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_details: '',
      role_dsc: '',
      file_error: '',
      aadhar_file_name: null,
      start_date: this.getValueFromProp('start_date'),
      com_date: this.getValueFromProp('com_on'),
      start_date_error: '',
      com_date_error: '',
    };
    this.onFileUpload = this.onFileUpload.bind(this);
  }
  checkFileSizeFF(files) {
<<<<<<< HEAD
=======
    // debugger;
>>>>>>> user-profile-integration
    const filesize = files[0].size;
    return filesize / (1024 * 1024) > 2;
  }

  checkFileSizeIE(file) {
    // debugger;
    const myFSO = new ActiveXObject('Scripting.FileSystemObject');
    const filepath = file.value;
    const thefile = myFSO.getFile(filepath);
    const size = thefile.size / (1024 * 1024);
    return size > 2;
  }
  onFileUpload = async event => {
    const { target } = event;
    const { files } = target;
    const filesize = files[0].size / (1024 * 1024);
    if (filesize > 2) {
      return this.setState({
        file_error: 'Document size cannot be more than 2 MB',
      });
    }
    if (files && files[0]) {
      if (!fileValidation(files[0], 2, ['png', 'pdf'])) {
        return this.setState({
          file_error: 'Only PDF and PNG type files are allowed',
        });
      }

      //console.log(files);
      const reader = new FileReader();

      reader.onloadstart = () => this.setState({ loading: true });

      reader.onload = event => {
        if (browserValidation() == 'IE' && this.checkFileSizeIE(files)) {
          this.setState({
            file_error: 'Document size cannot be more than 2 MB',
          });
        } else if (this.checkFileSizeFF(files)) {
          this.setState({
            file_error: 'Document size cannot be more than 2 MB',
          });
        } else {
          let formData = new FormData();
          formData.append('document', files[0]);
          apiCall('post', formData, AADHAR_UPDATE)
            .then(res => {
              if (true) {
                this.setState({
                  aadharFileName: res.data,
                });
              } else {
                //console.log('Not uploaeded');
              }
            })
            .catch(e => {
              //console.log(e);
            });

          this.setState(
            {
              aadhar_file_name: files[0].name,
              // aadhar_file: files[0],
              file_error: '',
            },
            () => {
              event.target.value = null;
            },
          );
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  onFileClear(e) {
    this.setState({
      aadhar_file_name: null,
      aadhar_file: null,
    });
  }
  getValueFromProp = key => {
    if (!this.props.experience) return null;
    return this.props.experience[key] ? this.props.experience[key] : null;
  };
  validateStartDateForm = async () => {
    let errorValue = '';
    if (!this.state.start_date) {
      errorValue = 'Kindly specify your joined date';
    }
    this.setParticularField('start_date', errorValue);
    return errorValue ? true : false;
  };
  //Validate left on Form
  validateCompleteDateForm = async () => {
    let errorValue = '';

    let com_date = new Date(this.state.com_date).getTime(),
      start_date = new Date(this.state.start_date).getTime();
    if (!this.state.com_date) {
      errorValue = 'Kindly specify your left date';
    } else if (com_date <= start_date) {
      errorValue = 'Left date must be greater than the joined date';
    }
    this.setParticularField('com_date', errorValue);

    return errorValue ? true : false;
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'start_date':
        this.validateStartDateForm();
        break;
      case 'com_date':
        this.validateCompleteDateForm();
        break;
    }
  };
  handleInput = (e, validatorAfterSave = null) => {
    // const { allFieldsStatus } = this.state;
    const { name } = e.target;

    // allFieldsStatus[name] = true; //change the touch status of field
    let value = e.target.value;
    if (['start_date', 'com_date'].includes(e.target.name)) {
      value = new Date(value);
    }
    this.setState(
      {
        [name]: value,
        // allFieldsStatus
      },
      () => {
        if (validatorAfterSave) {
          this.validateFields(name);
        }
      },
    );
  };
  checkValidationsOnSave = e => {
    this.projectReference.checkForErrors();
  };
  render() {
    const { classes } = this.props;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        onSaveClick={this.checkValidationsOnSave}
        collapsibleTitle="Projects"
        showAddButtow={false}
      >
        <ProjectEdit
          onRef={ref => (this.projectReference = ref)}
          {...{
            classes,
            dropdown,
            rightHalf,
            fullWidth,
            allDropDownWidth,
          }}
        />
      </CollapsibleComponentUserProfile>
    );
  }
}
export default withStyles(styles)(UserProjects);
