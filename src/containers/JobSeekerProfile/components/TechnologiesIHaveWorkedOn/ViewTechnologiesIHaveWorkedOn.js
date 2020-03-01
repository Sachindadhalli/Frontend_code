//library dependency
import React, {Component} from 'react';

//custom components
import CustomIcon from '../../../../components/CustomIcon';

//styles
import './styles.scss';

//utilities

//icons
import editIcon from '../../../../../assets/media/icons/edit.svg'
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg'


class ViewTechnologiesIHaveWorkedOn extends Component {
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
      ]
    }
  }


  render() {
    const {technologies} = this.state;
    return (
      <div className='view-technology-worked-on-main-conatiner'>
        {technologies.length !== 0 &&
        <div className="technology-worked-on">
          <div className="label-value-body">
            <div className="label-value-wrapper">
              <table width="100%">
                <tr className="label-styles-L">
                  <th width={"34%"} className={"td-padding-20px"}>Technology</th>
                  <th className={"td-padding-20px"}>Experience</th>
                  <th></th>
                </tr>
                {technologies.map((values, index) => {
                  return <tr className="value-styles-L" key={index}>
                    <td className={"td-padding-20px"}>{values.technology.value}</td>
                    <td
                      className={"td-padding-20px"}>{values.experience.years + " Years " + values.experience.months + " Months"}</td>
                    <td>
                      <div className='icons-alignments'>
                        <CustomIcon icon={editIcon}/>
                        <CustomIcon icon={deleteIcon}/>
                      </div>
                    </td>
                  </tr>
                })}
              </table>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default ViewTechnologiesIHaveWorkedOn;
