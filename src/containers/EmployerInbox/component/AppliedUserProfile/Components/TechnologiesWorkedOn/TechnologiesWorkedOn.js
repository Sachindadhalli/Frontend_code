//library dependency
import React, {Component} from 'react';

//custom components
import CollapsibleComponent
  from '../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';

//styles
import './styles.scss';

class TechnologiesWorkedOn extends Component {
  render() {
    const {technologies} = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle='Technologies I have worked on'>
          {technologies.length !== 0 &&
          <div className="technology-worked-on">
            <div className="label-value-body">
              <div className="label-value-wrapper">
                <table width="100%">
                  <tr className="label-styles-L">
                    <th width={"34%"} className={"td-padding-20px"}>Technology</th>
                    <th className={"td-padding-20px"}>Experience</th>
                  </tr>
                  {technologies.map((values, index) => {
                    return <tr className="value-styles-L" key={index}>
                      <td className={"td-padding-20px"}>{values.technology}</td>
                      <td
                        className={"td-padding-20px"}>{values.experience_in_years + " Years " + values.experience_in_months + " Months"}</td>
                    </tr>
                  })}
                </table>
              </div>
            </div>
          </div>}
        </CollapsibleComponent>
      </div>
    );
  }
}

export default TechnologiesWorkedOn;
