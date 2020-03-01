//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


//custom components
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';

//styles
import './styles.scss';
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {USER_PROFILE_RESUME_HEADLINE_GET} from "../../../../../config/constants"

//icons


class ViewResumeHeadline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume_headline: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
    }
  }

  componentWillMount() {
    /**
     * after component will mount, call get resume headline api function
     */
    // this.GetResumeHeadlineApi();
  };

  /**
   * this function will call get resume headline and update state depends on data
   * @returns {Promise<void>}
   * @constructor
   */
  GetResumeHeadlineApi = async () => {
    let headers = {'authorization': handleLocalStorage('get', 'employeeLogin'), 'Content-Type': 'application/json'};
    try {
      const resume_headline = await apiCall('get', {}, USER_PROFILE_RESUME_HEADLINE_GET, headers);
      if (resume_headline.status) {
        this.setState({resume_headline: resume_headline.resume_headline});
      }
    }
    catch (e) {
    }
  };


  render() {
    const {resume_headline} = this.state;
    return (
      <div className='view-resume-headline-main-container'>
        <Grid container spacing={16}>
          <Grid item xs={12} md={12}>
            <LabelValueComponent type={"OnlyText"} value={resume_headline}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewResumeHeadline;
