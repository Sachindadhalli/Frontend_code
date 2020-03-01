//library dependencies
import React, { Component } from 'react';

//style
import './style.scss';

//custom component
import EmployerExperienceEdit from './components/EmployerExperienceEdit';
import EmployerExperiencePreview from './components/EmployerExperiencePreview';

class EmployerExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_view_mode:
        this.props.experience && this.props.experience.is_view_mode
          ? this.props.experience.is_view_mode
          : false,
      is_current_job_view: this.props.is_current_job_view || false,
      experience: this.props.experience,
      experience_id: this.props.experience_id || null,
    };
  }

  /**
   * TO change the view to editable
   * @param updatedData
   */
  changeViewMode = (updatedData = null) => {
    this.setState({
      is_view_mode: !this.state.is_view_mode,
    });
    if (updatedData) this.props.updateTheParentData(updatedData);
  };

  componentWillReceiveProps(nextProps) {
    // on change in value,receiving next props value

    this.setState({
      experience: nextProps.experience,
      is_current_job_view: nextProps.is_current_job_view,
      experience_id: nextProps.experience_id,
      is_view_mode:
        nextProps.experience && nextProps.experience.is_view_mode
          ? nextProps.experience.is_view_mode
          : false,
    });
  }

  render() {
    const { experience, is_view_mode, experience_id } = this.state;
    return (
      <div>
        {is_view_mode ? (
          <EmployerExperiencePreview
            onclick={(updatedData = null) => this.props.changeViewMode(updatedData)}
            experience={experience}
          />
        ) : (
          <EmployerExperienceEdit
            key={experience_id}
            onclick={updatedData => this.props.changeViewMode(updatedData)}
            experience={experience}
            experience_id={experience_id}
            deleteExperiences={expId => {
              this.props.deleteExperiences(expId);
            }}
          />
        )}
      </div>
    );
  }
}

export default EmployerExperience;
