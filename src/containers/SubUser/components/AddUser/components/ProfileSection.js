//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Modal, TextField, withStyles} from '@material-ui/core';
import {Field, formValueSelector, reduxForm} from 'redux-form';
//styles
import './style.scss';
//utilities
import {VALIDATE_SUB_USER_EMAIL} from '../../../../../../config/constants';
import {apiCall, handleLocalStorage, validateEmail} from '../../../../../Utilities'
//custom components
import CustomComponents from '../../../../../components/CustomComponents/CustomComponents';
import ConformationDialog from '../../../../../components/ConformationDialog';

//material ui theme customization
const styles = theme => ({
  container: {display: 'flex', flexWrap: 'wrap'},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

/**
 * This component responsible subuser add and edit the subuser email id
 */
class ProfileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_role: '',
      sub_user_name: '',
      email_error: '',
      status: '',
      isDeletedEmail: false,
      isconfirm: false,
    }
  }

  /**
   * @function to close confirmation modal(popup)
   */
  existingEmailDialog = () => {
    this.setState({isDeletedEmail: false});
    this.props.cancelPopup();
  };

  /**
   * @function to update the subuser status(type of subuser) in the component state
   */
  onClickConfirm = () => {
    this.setState({isDeletedEmail: false, status: 'active'})
  };

  /**
   * @function to verify email from the backend, whether given email id is already exist or not
   * @param event: input field events object
   */
  emailVerification = (event) => {
    if (!validateEmail(event.target.value)) {
      this.setState({
        sub_user_name: '', job_role: '', email_error: '',
      }, () => {
        //throwing the error to the parent
        this.props.isEmailValid(this.state.email_error, this.state.isconfirm = true)
      });
    } else {
      let headers = {
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
      };
      let dataTobeSend = {business_email_id: event.target.value};
      apiCall('get', dataTobeSend, VALIDATE_SUB_USER_EMAIL, headers).then(res => {
        if (res.status) {
          this.setState({
            sub_user_name: res.data.name,
            job_role: res.data.role,
            email_error: '',
            status: res.data.sub_user_status,
            isDeletedEmail: true,
          }, () => {
            this.props.isEmailValid(this.state.email_error, this.state.isconfirm = false)
          })
        } else {
          this.setState({
            sub_user_name: '',
            job_role: '',
            email_error: res.message
          }, () => {
            this.props.isEmailValid(this.state.email_error, this.state.isconfirm = true)
          })
        }
      })
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.singleUserData && nextProps.singleUserData.email) {
      this.props.initialize({
        "email": nextProps.singleUserData.email || ''
      });
      //update subuser name and designation in component state
      this.setState({
        sub_user_name: nextProps.singleUserData.name,
        job_role: nextProps.singleUserData.designation
      })
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="flex-container">
        <form className="container">
          <div className="each-row">
            {this.state.status !== 'deleted' ? <div className="each-col">
              <Field
                name="email"
                label="Email"
                type="TextField"
                component={CustomComponents}
                styleClass={{root: "email-field"}}
                isDisabled={match.params.userId || this.state.status === 'active' ? true : false}
                width='100%'
                className="email"
                onChange={this.emailVerification}
              />
              <p className="error-message">{this.state.email_error ? this.state.email_error : ''}</p>
            </div> : <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.isDeletedEmail}
              onClose={this.existingEmailDialog}
              eachUser={this.state}
            >
              <ConformationDialog
                actionType={this.state.actionType}
                conformationStatus={this.onClickConfirm}
                handleClose={this.existingEmailDialog} Text="Confirm"
                headingText="The subuser you are trying to add is deleted, please confirm if you want to add them again?" />
            </Modal>}
          </div>
          {this.state.job_role ? <div className="each-row">
            <div className="each-col">
              <TextField
                disabled
                id="standard-error"
                label="Name"
                style={{width: '100%'}}
                value={this.state.sub_user_name}
              />
            </div>
            <div className="each-col">
              <TextField
                disabled
                id="standard-error"
                label="Job Role"
                style={{width: '100%'}}
                value={this.state.job_role}
              />
            </div>
          </div> : null}

        </form>
      </div>
    );
  }
}

const selector = formValueSelector('ProfileSection');

const mapStateToProps = (state) => {
  return { "email": selector(state, 'email') }
};

ProfileSection = reduxForm({
  form: "ProfileSection",
  enableReinitialize: true,
  validate: (values) => {//Validations of email in redux form
    const errors = {};
    if (values.email === "" || values.email === undefined) {
      errors['email'] = "Kindly specify your Email Id"
    }
    else if (!validateEmail(values.email)) {
      //Throw an error, if give email is not valid
      errors['email'] = "Kindly enter a valid Email Id"
    }
    return errors;
  }
})(ProfileSection);

ProfileSection.propTypes = { classes: PropTypes.object.isRequired };

export default connect(mapStateToProps)(withStyles(styles)(ProfileSection));
