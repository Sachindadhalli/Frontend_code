//library dependencies
import React from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';

//style
import './style.scss';

//icon
import close from '../../../../../assets/media/images/close.png';

//custom component
import SaveAndCancelButton from '../../../../components/SaveAndCancelButton';
import CustomComponents from '../../../../components/CustomComponents/CustomComponents';

//utilities
import {validateEmail} from '../../../../Utilities';

/**
 * passing valid email id to the parent component
 * @param props
 * */

 function AddEmail (props) {
  const { handleSubmit, toggleAddEmailPop} = props; //receiving props from redux form
  let addEmailSaveButtonRef='';
    return (
      <div className="add-email-modal-container">
        <div className="add-email-modal-wraper">
          <div className="close-icon">
            <img src={close} className="close" alt="close" onClick={toggleAddEmailPop}/>
          </div>
          <div className="add-email-modal">
            <div className="add-email-modal-text"> Add Email</div>
            <form onSubmit={handleSubmit((values)=>props.addNewEmail(values.new_email))}>
              <Field name="new_email" label="Email" type="TextField" component={CustomComponents}
                     styleClass={{root: "email-field"}}/>
              <button type="submit" style={{display: 'none'}} ref={addEmailSaveButton =>
                addEmailSaveButtonRef = addEmailSaveButton}></button>
            </form>
            <SaveAndCancelButton cancelText="Cancel" saveText="Save" onSave={() => addEmailSaveButtonRef.click()}
                                 onCancel={toggleAddEmailPop}/>
          </div>
        </div>
      </div>
    );
}

const selector = formValueSelector('AddEmail');

const mapStateToProps = (state) => {
  return {initialValues: {"new_email": ""}, "new_email": selector(state, 'new_email'),}
};

AddEmail = reduxForm({
    form: "AddEmail",
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (values.new_email === "" || values.new_email === undefined) errors['new_email'] = "Kindly specify your Email Id";
      else if (!validateEmail(values.new_email)) errors['new_email'] = "Kindly enter a valid Email Id";
      return errors;
    }
  }
)(AddEmail);

export default connect(mapStateToProps)(AddEmail);
