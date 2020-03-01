//library dependencies
import React, {Component} from 'react';
//style
import './styles.scss';
//custom component
import LandingButtons from '../../../../components/LandingButtons/LandingButtons';

class JobByTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [
        {"name": "Web Engineer", "type": false},
        {"name": "Mobile Engineer", "type": false},
        {"name": "Game Engineer", "type": false},
        {"name": "System Engineer", "type": false},
        {"name": "Embedded Software Engineer", "type": false},
        {"name": "Infrastructure Engineer", "type": false},
        {"name": "DevOps Engineer", "type": false},
        {"name": "PM/Leader", "type": false},
        {"name": "QA/Tester", "type": false},
        {"name": "Designer", "type": false},
        {"name": "Modeler", "type": false},
        {"name": "Planner", "type": false},
        {"name": "Motion Designer", "type": false},
        {"name": "3DGC Designer (backgrounds, characters)", "type": false},
        {"name": "Web Designer", "type": false},
        {"name": "Effect Designer", "type": false},
        {"name": "2D/3D Animator", "type": false},
        {"name": "Others", "type": false}],
      changeButtonType: false,
    };
  }

  /**
   * on click of button job by tittle
   */
  changeButton = () => {
    this.setState({
      changeButtonType: true
    })
  };
  /**
   * on mouse out and over,toggling
   * @param index
   */
  toggle = (index) => {
    let data = this.state.data1;
    let flag = false;
    for (let i = 0; i < data.length; i++) {
      if (i === index) {
        data[i]["type"] = !data[i]["type"];
        this.setState({data1: data});
        break;
      }
    }
  };

  render() {
    return (
      <div className="job-by-title-main-cotainer">
        <div className="job-by-title-heading-text">Job By Title</div>
        <div className="job-by-title-buttons-div">
          {this.state.data1.map((buttonName, index) =>
            <div className="job-by-title-landing-buttons" key={index}>
              <LandingButtons
                onMouseOver={() => this.toggle(index)}
                onMouseOut={() => this.toggle(index)}
                buttonType={buttonName.type === true ? "solid-btn" : "default-btn"}
                buttonText={buttonName.name}
                className="job-by-title-button"
                onClick={this.changeButton}
              />
            </div>)
          }
        </div>
      </div>
    );
  }
}

export default JobByTitle;
