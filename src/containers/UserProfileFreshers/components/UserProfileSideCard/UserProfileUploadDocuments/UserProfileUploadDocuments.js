import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb/CustomBreadcrumb';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew/AutoCompleteNew';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// import InputLabel from '@material-ui/core/InputLabel';
import './style.scss';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
//import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import { fileValidation, apiCall, browserValidation } from '../../../../../Utilities';
import LinkedInIcon from '../../../../../../assets/media/icons/LinkedInIcon.svg';
import linkedin from '../../../../../../assets/media/icons/linkedin.svg';
import {
  SERVER_API_URL,
  SERVER_API_PATH,
  AADHAR_UPDATE,
  EMPLOYER_LOGIN_REDIRECT_URL,
} from '../../../../../../config/constants';
import ChipsForFields from '../../../../../components/EmployerJobPage/components/SectorsRoles/ChipsForFields/ChipsForFields';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {},
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
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
  padding: {},
  ...customisedMaterial,
});

class UserProfileUploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aadhar_file_name: null,
      aadhar_file: null,
      file_error: '',
      resume_file_name: null,
      resume_file: null,
      resume_error: '',
      value: 'search',
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  checkFileSizeFF(files) {
    const filesize = files[0].size;
    return filesize / (1024 * 1024) > 2;
  }

  checkFileSizeIE(file) {
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
        aadhar_file_name: '',
      });
    }
    if (files && files[0]) {
      if (!fileValidation(files[0], 2, ['png', 'pdf'])) {
        return this.setState({
          file_error: 'Only PDF and PNG type files are allowed',
          aadhar_file_name: '',
        });
      }
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
                //console.log("Not uploaeded")
              }
            })
            .catch(e => {
              // console.log(e)
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
      file_error: '',
    });
  }
  removeElementFromState = (fieldName, key) => {
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    fieldDataFromState.splice(key, 1);
    this.setState({ [fieldName]: fieldDataFromState });
  };
  onSignWithLinkedIn = () => {
    let y = window.outerHeight / 2 + window.screenY - 640 / 2;
    let x = window.outerWidth / 2 + window.screenX - 512 / 2;
    this.windowStatus = window.open(
      EMPLOYER_LOGIN_REDIRECT_URL,
      'name',
      `width=512,height=600,left=${x},top=${y}`,
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="user-video-resume-card">
        {/* <div className="employer-sign-in-social-login1">
          <div className="social-buttons1"> */}
        <span className="linkedin-sign-in1" onClick={this.onSignWithLinkedIn}>
          <div className="linkedin-icon1">
            <div className="rectangle1">
              <CustomIcon icon={linkedin} iconStyle="Shape" />
            </div>
          </div>
          <div className="Sign-in-with1">Verify Linkedin Profile</div>
        </span>
        {/* </div>
        </div> */}

        <div className="employee-sign-in-or1">
          <div className="or1">or</div>
        </div>
        <div
          //style={{ paddingTop: '30px', paddingBottom: '30px', paddingRight: '20px' }}
          className="aadhar-resume-box"
        >
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="contained-button-file" style={{ width: '132px', height: '0px' }}>
                  <Button variant="contained" component="span" className="default_button">
                    Upload Aadhar
                  </Button>
                </label>
                {this.state.aadhar_file_name ? (
                  <span id="aadhar-upload">
                    {this.state.aadhar_file_name}
                    <CustomIcon icon={close} onClick={this.onFileClear} />
                  </span>
                ) : null}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple={false}
                  type="file"
                  onChange={e => {
                    this.onFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}
                />

                <span className="field_error">
                  {/* {this.state.file_error !== '' ? <CustomIcon icon={error} /> : null} */}
                  {this.state.file_error}
                </span>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div
          //style={{ paddingTop: '30px', paddingBottom: '30px', paddingRight: '20px' }}
          className="aadhar-resume-box"
        >
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <label htmlFor="contained-button-file" style={{ width: '132px', height: '0px' }}>
                  <Button variant="contained" component="span" className="default_button">
                    Attach Resume
                  </Button>
                </label>
                {this.state.aadhar_file_name ? (
                  <span id="aadhar-upload">
                    {this.state.aadhar_file_name}
                    <CustomIcon icon={close} onClick={this.onFileClear} />
                  </span>
                ) : null}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple={false}
                  type="file"
                  onChange={e => {
                    this.onFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}
                />

                <span className="field_error">
                  {/* {this.state.file_error !== '' ? <CustomIcon icon={error} /> : null} */}
                  {this.state.file_error}
                </span>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfileUploadDocuments);
