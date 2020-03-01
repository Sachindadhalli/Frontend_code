//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//styles
import './style.scss';
//custom components
import Header from '../../components/Header/Header';
import StepRouter from './StepRouter';

/**
 * Here differentiating the ui of filled steps and not filled steps
 * @param props
 * @return {XML}
 * @constructor
 */
const Stepper = props => {
  const url = props.location.pathname;
  let steps = props.labels.slice();
  if (url.includes("/jobseeker-signup/education")) {
    /*
    If url includes education, means user completed 1st step(personal details),
     2nd step is in progress and third step is not yet touched so 3rd step is none.
     */
    steps[0].stage = "completed step";
    steps[1].stage = "inProcess step";
    if (steps[2]) steps[2].stage = "none step"
  }
  else if (url.includes("/jobseeker-signup/employment")) {
    /*
    If url includes education, means user completed 1st step(personal details),
     2nd step is in progress and third step is not yet touched so 3rd step is none.
     */
    steps[0].stage = "completed step";
    steps[1].stage = "completed step";
    if (steps[2]) steps[2].stage = "inProcess step"
  }
  else {
    /*
    If url includes education, means user completed 1st step(personal details),
     2nd step is in progress and third step is not yet touched so 3rd step is none.
     */
    steps[0].stage = "inProcess step";
    steps[1].stage = "none step";
    if (steps[2]) steps[2].stage = "none step"
  }

  // storing jobseeker type in a variable
  const lastStep =
    props.location.state && props.location.state.experienceType === 'professional' ? 2 : 1;
  return (
    <div className="stepper">
      {steps &&
      steps.map((step, key) => (
        <div key={key}>
          <div className="step-wrapper">
            <div className={step.stage}>
              {key !== lastStep && step.stage.includes('completed') ? (
                <div className="completedInner">
                </div>
              ) : step.stage.includes('inProcess') ? (
                <div className="progressInner"/>
              ) : (
                <div className="pendingInner"/>
              )}
            </div>
            {key !== lastStep ? (
              <div
                className={`divider ${
                  step.stage.includes('completed') ? 'completed-divider' : 'incomplete-divider'
                  }`}
              />
            ) : null}
          </div>
          <span className="label">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

class JobSeekerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_error: '',
      firstName: '',
      lastName: '',
      code: '',
      mobile_no: '',
      otpModal: false,
      selectedCountyCode: '',
      selectedDate: new Date(),
      currentRoute: 0,
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
      steps: [
        {label: 'Personal details', stage: 'inProcess step'},
        {label: 'Education details', stage: 'none step'},
      ],
    };

    // if experience is not there in url location state, it will redirect to the personal details
    if (!this.props.location.state || !this.props.location.state.experienceType) {
      this.props.history.push({
        pathname: '/',
      });
    }

    /*
    For Experienced jobseeker, work experience step will be added
    For Fresher, work experience step won't appear
     */
    if (this.props.location.state && this.props.location.state.experienceType === 'professional') {
      const {steps} = this.state;
      steps.push({label: 'Work experience', stage: 'none step'});
      this.setState({
        steps,
      });
    }
  }

  componentDidMount() {
    // If selected tab false, it redirects to personal details step
    const {is_job_seeker_selected_tab} = this.props;
    if (is_job_seeker_selected_tab === false) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    // while ummount, calling setIsJobSeekerSelectedTab callback function with false parameter
    this.props.setIsJobSeekerSelectedTab(false);
  }

  render() {
    const {match} = this.props;
    const {activeStep, steps} = this.state;
    return (
      <div className="job-seeker-sign-up-container">
        <Header/>
        <div className="step-wrapper-inner">
          <Stepper labels={steps} {...this.props} />
          <StepRouter {...this.props} />
        </div>
      </div>
    );
  }
}

JobSeekerWrapper.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  personalDetails: state.default.jobSeekerSignupFormData.personalDetails,
  educationalDetails: state.default.jobSeekerSignupFormData.educationalDetails,
});

export default connect(mapStateToProps)(JobSeekerWrapper);
