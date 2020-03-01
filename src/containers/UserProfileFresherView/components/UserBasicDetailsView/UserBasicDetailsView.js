import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTag from '../../../../components/CustomTag';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import customisedMaterial from '../../../../styles/customisedMaterial';
import { withStyles } from '@material-ui/core/styles';
//import './style.scss';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import BasicEdit from '../../../UserProfileFreshers/components/UserBasicDetails/components/BasicEdit';
import BasicView from '../../../UserProfileFreshers/components/UserBasicDetails/components/BasicView';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class UserBasicDetailsView extends Component {
  state = {
    editMode: false,
  };
  checkValidationsOnSave = e => {
    this.basicDetailsReference.checkForErrors();
  };
  render() {
    const { basic_profile, fresher_experienced } = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponentUserProfile
          collapsibleTitle="Basic Details"
          onSaveClick={this.checkValidationsOnSave}
          showEdit={!this.state.editMode}
          //To edit the component on click of Edit button
          onEditClick={() => {
            this.setState({ editMode: true });
          }}
          onClick={() => {
            this.setState({ editMode: false });
          }}
        >
          {this.state.editMode ? (
            <BasicEdit onRef={ref => (this.basicDetailsReference = ref)} type={'fresher'} />
          ) : (
            <BasicView basic_profile={basic_profile} fresher_experienced={true} />
          )}{' '}
        </CollapsibleComponentUserProfile>
      </div>
    );
  }
}

export default UserBasicDetailsView;
