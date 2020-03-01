//library dependencies
import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';

//style
import './style.scss';

//icon
import edit from '../../../../../../../../assets/media/icons/edit.svg';
import deleteicon from '../../../../../../../../assets/media/icons/deleteIcon.svg';

//custom component
import CustomIcon from './../../../../../../../components/CustomIcon/CustomIcon'


class OrganisationCard extends Component {

  state = {activeOrgValueSelected: '', selecteId: '',};

  componentWillReceiveProps(newProps) {
    this.setState({activeOrgValueSelected: newProps.activeOrgValue,})
  }
   render() {
    return (
      <div className="Organisation-container">
        <div className="heading">
          <div className="title">
            <Radio
              checked={this.props.isActive}
              value={this.props.organisation.key}
              onChange={()=> this.props.onOrganisationRadioChange()}
              name=""
              aria-label="B"
              style={{marginLeft: "-15px"}}
            />
            {this.props.organisation.organisation_name.value}
          </div>
          <div className="icons">
            <div><img src={edit} style={{cursor: 'pointer', paddingRight: '10px'}}
                      onClick={()=>this.props.editCard()}></img></div>
            <div><img src={deleteicon} style={{cursor: 'pointer', paddingRight: '10px'}}
                      onClick={()=>this.props.deleteCard()}></img></div>
          </div>
        </div>
        <div className="flex-direction-column">
          <div className="content">
            <label>Descreption</label>
            <div>  {this.props.organisation.description}</div>
          </div>
          <div className="footer" style={{"paddingTop": "30px"}}>
            <label>Website</label>
            <div> {this.props.organisation.url}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrganisationCard;
