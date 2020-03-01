//library dependency
import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

//custom components
import NonCreatableSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import CreatableRemoteDataSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown';

//styles
import './styles.scss';
import {KEY_SKILLS} from "../../../../../config/constants";

//utilities

//icons


// drop down options value
const year_options = [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}];
const month_options = [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}];

class EditTechnologiesIHaveWorkedOn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technologies: [
        {
          "technology": {"key": 1, "value": "Python"},
          "experience": {
            "years": 2,
            "months": 3
          }
        }, {
          "technology": {"key": 1, "value": "Python"},
          "experience": {
            "years": 2,
            "months": 3
          }
        }
      ],
      year: '',
      month: '',
      key_skill: '',
      key_skill_error: ''
    }
  }

  /**
   * set experience in state if specified index matches with experience array index, value will be options
   * @param options
   * @param label
   * @param index
   */
  selectedOptions = (options, label, index) => {
    let technologies = this.state.technologies;
    technologies.map((value, ind) => {
      if (ind === index) {
        value.experience[label] = options.value
      }
    });
    this.setState({technologies: technologies})
  };
  /**
   * set key skill in state if specified index matches with key skill array index, value will be options
   * @param option
   * @param field_name
   * @param index
   */
  setValuesInStateKeySkills = (option, field_name, index) => {
    let technologies = this.state.technologies;
    technologies.map((value, ind) => {
      if (ind === index) {
        value.technology = option
      }
    });
    this.setState({technologies: technologies})
  };

  render() {
    const {year, month, technologies} = this.state;
    return (
      <div className='edit-technology-worked-on-main-conatiner'>
        {technologies.map((data, index) => {
          return <Grid container spacing={16} index={index}>
            <Grid item xs={12} md={6}>
              <FormControl style={{width: '100%'}}>
                <label className='experience-radio-button-label'>Technology</label>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={KEY_SKILLS}
                  queryParams={{search: ''}}
                  defaultValue={data.technology.value ? {label: data.technology.value, value: data.technology.key} : ''}
                  getSelectedOption={(option) => this.setValuesInStateKeySkills({
                    key: option ? option.value : "",
                    value: option ? option.label : ""
                  }, "key_skill", index)}
                  isClearable={true}
                  error={''}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <label className='edit-Basic-details-dropdown-label'>Years</label>
              <div style={{width: "90%"}}>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option) => this.selectedOptions(option, 'years', index)}
                  defaultValue={data.experience.years ? {
                    value: data.experience.years,
                    label: data.experience.years
                  } : ''}
                  options={year_options}
                  error={''}
                  style={{width: "90%"}}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <label className='edit-Basic-details-dropdown-label'>Months</label>
              <div style={{width: "90%"}}>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option) => this.selectedOptions(option, 'months', index)}
                  defaultValue={data.experience.months ? {
                    value: data.experience.months,
                    label: data.experience.months
                  } : ''}
                  options={month_options}
                  error={''}
                />
              </div>
            </Grid>
          </Grid>
        })}
      </div>
    );
  }
}

export default EditTechnologiesIHaveWorkedOn;
