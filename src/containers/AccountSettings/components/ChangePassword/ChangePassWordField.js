//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
//styles
import './styles.scss';
//custom components
import CustomComponents from '../../../../components/CustomComponents/CustomComponents';
//utilities
import {handleLocalStorage, validatePassword} from '../../../../Utilities';

class ChangePasswordField extends Component {
  headers = {
    authorization: handleLocalStorage('get', 'employerLogin'),
    'Content-Type': 'application/json',
  };

  render() {
    const {handleSubmit, submit} = this.props;
    return (
      <div className="change-password-field-main">
        <div className="change-password-field-text-password-save">
          <div className="change-password-field-text-password">Password</div>
          <div className="change-password-buttons-wrapper">
            <div className="discard-changes-btn" onClick={() => this.props.onDiscardChanges()}>Cancel</div>
            <div
              className="change-password-field-text-save"
              onClick={() => {
                submit('ChangePasswordField');
              }}
            >
              Save
            </div>
          </div>
        </div>
        <div className="change-password-field-input-textfields">
          <form onSubmit={handleSubmit}>
            <div className="change-password-field-current-password">
              <Field
                name="old_password"
                label="Current Password"
                type="TextField"
                component={CustomComponents}
                styleClass={{password: true}}
              />
            </div>
            <div className="change-password-field-new-password">
              <Field
                name="new_password"
                label="New Password"
                type="TextField"
                component={CustomComponents}
                styleClass={{password: true}}
              />
            </div>
            <div className="change-password-field-confirm-password">
              <Field
                name="confirm_password"
                label="Confirm Password"
                type="TextField"
                component={CustomComponents}
                styleClass={{password: true}}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('ChangePasswordField');

const mapStateToProps = state => {
  return {
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
    new_password: selector(state, 'new_password'),
    old_password: selector(state, 'old_password'),
    confirm_password: selector(state, 'confirm_password'),
  };
};

ChangePasswordField = reduxForm({
  form: 'ChangePasswordField',
  enableReinitialize: true,
  validate: values => {
    const errors = {};
    if (!values.new_password) {
      errors['new_password'] = 'Kindly enter a password';
    }
    else {
      if (!validatePassword(values.new_password)) {
        errors['new_password'] = 'Password should be combination of atleast 1 Alphabet and 1 Number and should be between 8 to 20 characters';
      } else {
        errors['new_password'] = "";
      }
    }

    if (!values.old_password) {
      errors['old_password'] = 'Kindly enter a password';
    }
    else {
      if (!validatePassword(values.old_password)) {
        errors['old_password'] = 'Password should be combination of atleast 1 Alphabet and 1 Number and should be between 8 to 20 characters';
      }
    }

    if (!values.confirm_password) {
      errors['confirm_password'] = 'Kindly enter a password';
    }
    else {
      if (!validatePassword(values.confirm_password)) {
        errors['confirm_password'] = 'Password should be combination of atleast 1 Alphabet and 1 Number and should be between 8 to 20 characters';
      }
    }

    if (values.confirm_password !== values.new_password) {
      errors['confirm_password'] = "Entered password doesn’t match, kindly enter it again";
    }

    if (!values.old_password && values.new_password && values.confirm_password) {
      errors['old_password'] = 'Kindly enter the old password';
    }

    if (!values.new_password && values.old_password && values.confirm_password) {
      errors['new_password'] = 'Kindly enter a new password';
    }

    if (!values.confirm_password && values.new_password && values.old_password) {
      errors['confirm_password'] = 'Kindly enter the password again';
    }
    return errors;
  },
  asyncBlurFields: ['old_password', 'new_password', 'confirm_password']
})(ChangePasswordField);

export default connect(mapStateToProps)(ChangePasswordField);
