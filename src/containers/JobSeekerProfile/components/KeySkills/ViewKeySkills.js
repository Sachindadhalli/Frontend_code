//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

//custom components
import ChipsComponents from '../../../../components/ReusableComponents/ChipsComponents/ChipsComponents';

//styles
import './styles.scss';

//utilities
import {USER_PROFILE_TECHNOLOGIES_GET} from '../../../../../config/constants'
import {apiCall, handleLocalStorage} from "../../../../Utilities";

//icons

class ViewKeySkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: ['Android Development', 'Sketch App', 'Adobe Suite', 'Android Development', 'Sketch App', 'Adobe Suite'],
      skills_objects: []
    }
  }

  componentWillMount() {
    /**
     * after component will mount call get key skills api
     */
    // this.getKeySkillsApi();
  };

  /**
   * called user profile key skill api and update data in state variable
   * @returns {Promise<void>}
   */
  getKeySkillsApi = async () => {
    let headers = {'authorization': handleLocalStorage('get', 'employeeLogin'), 'Content-Type': 'application/json'};
    try {
      const key_skills = await apiCall('get', {}, USER_PROFILE_TECHNOLOGIES_GET, headers);
      if (key_skills.status) {
        let array_skills = [];
        key_skills.data.forEach((data) => {
          array_skills.push(data.value)
        });
        this.setState({skills_objects: key_skills.data, skills: array_skills})
      }
    } catch (e) {
    }
  };


  render() {
    const {skills} = this.state;
    return (
      <div className='view-key-skills-wrapper'>
        <Grid container spacing={16}>
          <Grid item xs={12} md={12}>
            <ChipsComponents values={skills}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewKeySkills;
