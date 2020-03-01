// library dependencies
import React, {Component} from 'react';
import {withStyles, Checkbox} from '@material-ui/core';

//style
import './style.scss';

//icon
import edit from '../../../../../../../../../assets/media/icons/edit.svg';
import deleteIcon from '../../../../../../../../../assets/media/icons/deleteIcon.svg';
import selectedCircle from '../../../../../../../../../assets/media/icons/selectedcircle.svg';
import unselected from '../../../../../../../../../assets/media/icons/unselected.svg'
import Visibility from '@material-ui/icons/Visibility';

//custom component
import CustomIcon from './../../../../../../../../components/CustomIcon/CustomIcon'

// material ui style customizations
const styles = theme => ({
  colorPrimary: {color: '#b5b5b5', cursor: 'pointer',}
});

class QuestionnaireCard extends Component {
  state = {activeOrgValueSelected: ''};

  componentWillReceiveProps(newProps) {
    this.setState({activeOrgValueSelected: newProps.activeOrgValue,})
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="Questionnaire-card">
        <div className="heading">
          <div className="title">
            <Checkbox
              style={{marginLeft: '-16px', marginTop: '15px'}}
              defaultChecked={false}
              checked={this.props.isActive === this.props.questionnaireData.key}
              value={this.props.questionnaireData.key}
              icon={<CustomIcon icon={unselected}/>}
              checkedIcon={<CustomIcon icon={selectedCircle}/>}
              onChange={(e) => this.props.onOrganisationRadioChange(e.target.checked ? this.props.questionnaireData.key : '')}
            />
            <span className="title-span-style"> {this.props.questionnaireData.value}</span>
          </div>
          <div className="icons">
            <div>
              <Visibility className={classes.colorPrimary}
                             onClick={() => this.props.previewQuestionnaireCard(this.props.questionnaireData.key)}/>
            </div>
            <div><CustomIcon icon={edit} iconStyle="icon-style-question-card"
                             onclick={() => this.props.editQuestionnaire(this.props.questionnaireData.key)}></CustomIcon>
            </div>
            <div><CustomIcon icon={deleteIcon} iconStyle="icon-style-question-card"
                             onclick={() => this.props.deleteQuestionnaire((this.props.questionnaireData.key))}></CustomIcon>
            </div>
          </div>
        </div>
        <div className="content">
          <label>Total Questions</label>
          <div> {this.props.questionnaireData.count}</div>
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(QuestionnaireCard);
