//library dependency
import React, {Component} from "react";
import PropTypes from "prop-types";
import {v4} from 'uuid';
import {withStyles} from "@material-ui/core/styles";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//custom components
import PersonalDetails from "./components/PersonalDetails";
import ContactDetails from "./components/ContactDetails";
import EmployerExperience from "./components/EmployerExperience";

//styles
import "./style.scss";

//utilities
import {EMPLOYER_GET_WORK_EXP_DETAILS, EMPLOYER_DELETE_WORK_EXP_DETAILS} from "../../../../../config/constants";
import apiCall from "../../../../Utilities/apiCall";
import handleLocalStorage from "../../../../Utilities/handleLocalStorage";
import handleLocalStorageAsync from "../../../../Utilities/handleLocalStorageAsync";
import * as HomePageEmpActions from '../../../../actions/homePageEmp/'

const AUTHENTIICATION_HEADER = {
  'authorization': handleLocalStorage("get", "employerLogin"),
  'Content-Type': 'application/json',
};

// customized a material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
});

class EmployerPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience_count: 1,
      all_experiences: this.props.workExp,
      basic_details: {
        first_name: '', last_name: '', name: '', current_employer: '', current_designation: '',
        country: '', city: ''
      },
      contact_details: {
        business_email: 'parvez@selekt.in', secondary_email: 'parvez@gmail.com',
        mobile: {code: '+91', number: '8898029645'}, facebook_url: 'www.facebook.com/parvez',
        linkedin_url: 'www.linkedin.com/in/parvezmullah'
      }
    }
  }

  /**
   * To update the state with All previous saved experiences
   * @param name
   * @param data
   */
  setInformation = (name, data) => {
    this.setState({[name]: data,})
  };
  /**
   * to get the details of all work experiences of employer
   * @return {Promise<void>}
   */
  getWorkExpDetails = async () => {
    const token = await handleLocalStorageAsync('get', 'employerLogin');
    const AUTHENTIICATION_HEADER = {'authorization': token, 'Content-Type': 'application/json',};
    try {
      const responseData = await apiCall('get', {}, EMPLOYER_GET_WORK_EXP_DETAILS, AUTHENTIICATION_HEADER);
      if (responseData.status) {
        let finalData = this.prepareData(responseData.data);
        this.setInformation('all_experiences', finalData)
      }
    }
    catch (exc) {
    }
  };

  /**
   *
   * @param newData
   * @returns {Promise<void>}
   */
  setBasicDetails = async (newData) => {
  };

  componentWillMount() {

    //initially getting all work experiences previously added
    this.getWorkExpDetails();
  }

  /**
   * on click og add more employment button
   */
  addMorEmployment = () => {
    this.setState({
      all_experiences: [...this.state.all_experiences, {
        id: null, job_profile: '',
        current_designation: null, current_employer: null, joined_on: null, left_on: null, is_view_mode: false
      }]
    })
  };
  /**
   *on Click of edit button changing the view
   * @param key
   * @param updatedData
   */
  changeViewMode = (key, updatedData = null) => {
    if (updatedData) {
      this.setState({all_experiences: updatedData});
      return;
    }
    let {all_experiences} = this.state;
    if (all_experiences[key].id) {
      all_experiences[key].is_view_mode = !(all_experiences[key].is_view_mode);
      this.setState({all_experiences: all_experiences});
    } else {
      all_experiences.splice(key, 1);
      this.setState({all_experiences: all_experiences});
    }
  };
  /**
   * to prep
   * @param updatedData
   * @return {Array}
   */
  prepareData = (updatedData) => {
    let finalData = [];
    for (let exp of updatedData) {
      let expNew = {
        is_view_mode: true,
        current_designation: exp.designation,
        current_employer: exp.employer,
        job_profile: exp.job_profile,
        joined_on: exp.join_in,
        left_on: exp.left_on,
        is_current_job_view: exp.is_current_job,
        id: exp.id
      };
      finalData.push(expNew)
    }
    return finalData
  };

  /**
   * on click of delete icon ,deleting the Experience
   * @param key
   * @return {Promise<void>}
   */
  deleteExperiences = async (key) => {
    if (typeof key === "number") {
      let {all_experiences} = this.state;
      let responseStatus = true;
      if (all_experiences[key] && all_experiences[key].id) {
        let deleteResponse = await apiCall('get', {id: all_experiences[key].id}, EMPLOYER_DELETE_WORK_EXP_DETAILS, AUTHENTIICATION_HEADER);
        responseStatus = deleteResponse.status;
      }
      if (responseStatus) {
        all_experiences.splice(key, 1);
        this.setState({all_experiences: all_experiences})
      }
    } else {
      let {all_experiences} = this.state;
      all_experiences.splice(all_experiences.length - 1, 1);
      this.setState({all_experiences: all_experiences})
    }
  };

  render() {
    const {basic_details, contact_details, all_experiences} = this.state;
    const {toast} = this.props;
    return (
      <div className="employer-my-details">
        <PersonalDetails basic_details={basic_details} setBasicDetails={this.setBasicDetails} toast={toast}/>
        <div className="hr-line" />
        <ContactDetails contact_details={contact_details}/>
        <div className="hr-line" />
        <div className="employer-your-experience pt-sm-32 pb-sm-44 px-sm-44 pt-16 pb-24 px-20">
          <div className="employer-your-experience-text">
            Your Work Experience
          </div>
          <div className="employer-past-employment">
            {
              all_experiences.map((experience, key) => (
                <EmployerExperience
                  key={key+'_exp'}
                  experience_id={key}
                  deleteExperiences={this.deleteExperiences}
                  experience={experience}
                  changeViewMode={(updatedData = null) => this.changeViewMode(key, updatedData)}
                />
              ))
            }
            <div className="add-more-employement">
              <div className="button" onClick={this.addMorEmployment}>
                Add more Employment
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmployerPersonalDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    workExp: JSON.parse(JSON.stringify(state.empHomePage.personalDetails.workExp))
  }
};
const mapDispatchToProps = dispatch => ({
  updateEmpWorkExp: bindActionCreators(
    HomePageEmpActions.updateEmpWorkExp,
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployerPersonalDetails));
