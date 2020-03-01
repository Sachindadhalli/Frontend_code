import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent';
import Location from '../../../../../assets/media/icons/location.svg';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import LanguageComponent from '../../../../components/ReusableComponents/LanguageComponent';
import PersonalDetailsView from '../../../UserProfileFreshers/components/UserPersonalDetails/components/PersonalDetailsView';
import PersonalDetailsEdit from '../../../UserProfileFreshers/components/UserPersonalDetails/components/PersonalDetailsEdit';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';

const styles = theme => ({});

class UserPersonalDetailsView extends React.Component {
  state = {
    editMode: false,
  };
  render() {
    const {
      classes,
      permanent_address,
      personal_details,
      rightHalf,
      fullWidth,
      allDropDownWidth,
    } = this.props;
    //console.log(personal_details, this.props)
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Personal Details"
        // onSaveClick={this.checkValidationsOnSave}
        showEdit={!this.state.editMode}
        //To edit the component on click of Edit button
        onEditClick={() => {
          this.setState({ editMode: true });
        }}
        onclick={() => {
          this.setState({ editMode: false });
        }}
      >
        {this.state.editMode ? (
          <PersonalDetailsEdit
            // onRef={ref => (this.desiredCareerReference = ref)}
            {...{
              classes,
              permanent_address,
              rightHalf,
              fullWidth,
              allDropDownWidth,
            }}
          />
        ) : (
          <PersonalDetailsView
            {...{
              classes,
              personal_details,
            }}
          />
        )}{' '}
      </CollapsibleComponentUserProfile>
    );
  }
}

UserPersonalDetailsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPersonalDetailsView);
