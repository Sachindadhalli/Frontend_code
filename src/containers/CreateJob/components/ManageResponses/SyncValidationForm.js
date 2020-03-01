import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector} from 'redux-form';
import './style.scss';
import { handleLocalStorage } from '../../../../Utilities';

const header ={
    'authorization': handleLocalStorage("get", "employerLogin"),
    'Content-Type': 'application/json',
  }

let backupLatAndLong = {
    lat: null,
    lng: null
}

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function showResults(values) {
  await sleep(500);
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

class SyncValidationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
        emails: [],
        questionnaires: [{key: 1, value:'Questionnaire1' },{key: 2, value:'Questionnaire2' }, {key: 3, value:'Questionnaire3' },],
        add_email_popup: false,
        saveText: "Next",
        is_map_open: false,
        selected_location: null,
        venue: "",
        address_url:"",
    }
    this.header ={
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
    }
}

  cshowResults = (values) =>{
    showResults(values)
  }

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props
  return (
    <form onSubmit={handleSubmit(this.cshowResults)}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Field name="age" type="number" component={renderField} label="Age"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
  }
  
}

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(SyncValidationForm)
