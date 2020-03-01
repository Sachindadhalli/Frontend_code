//library dependency
import React, {Component} from 'react';

//custom components
import CreatableRemoteMultiDropDown
  from "../../../../components/MultiSelectDropdownWrapper/components/CreatableRemoteMultiDropDown/CreatableRemoteMultiDropDown";
//styles
import './styles.scss';
import {KEY_SKILLS} from "../../../../../config/constants";

//utilities

//icons


class EditKeySkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_skills: [],
      key_skills_error: ''
    }
  }

  /**
   * under process
   * @param error
   */
  onErrorChange = (error) => {

  };

  /**
   * set skills value in key skill state variable and check for errors
   * @param field_name
   * @param field_error
   * @param selected_option
   */
  setValuetoChips = (field_name, field_error, selected_option) => {
    const opt = this.state[field_name];
    if (selected_option.length > 0) {
      const new_value = selected_option[selected_option.length - 1];
      if (new_value.label.length > 20) {
        this.setState({key_skills_error: "Key Skill should be 20 character"});
        setTimeout(() => {
          this.setState({key_skills_error: ''})
        }, 3000)
      }
      else {
        for (let option of selected_option) {
          let index = opt.findIndex((option_seleced) => option_seleced.key === option.value);
          if (index > -1) {
          } else {
            opt.push({key: option.value, value: option.label})
          }
        }
        this.setState({[field_name]: opt})
      }
    }
  };


  render() {
    return (
      <div className='edit-key-skills-main-container'>
        <label className='skill-label'>Key Skills</label>
        <CreatableRemoteMultiDropDown
          isSearchable={true}
          apiUrl={KEY_SKILLS}
          queryParams={{search: ''}}
          getSelectedOption={(option) =>
            this.setValuetoChips('key_skills', 'key_skills_error', option)}
          editable={true}
          maxOptions={50}
          ShowkeySkills={true}
          defaultValue={this.state.key_skills}
          error={this.state.key_skills_error}
          gettingError={(error) => this.onErrorChange(error)}
        >
        </CreatableRemoteMultiDropDown>
      </div>
    );
  }
}

export default EditKeySkills;
