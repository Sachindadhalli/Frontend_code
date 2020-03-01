import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import './styles.scss';
import CollapsibleComponentUserProfile from '../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
// import IconValueComponent from '../../../../../../components/ReusableComponents/IconValueComponent/IconValueComponent';
// import workExpIcon from '../../../../../../assets/media/icons/work-exp.svg';
// import company from '../../../../../../assets/media/icons/company.svg';
// import clock from '../../../../../../assets/media/icons/clock.svg';
// import Moment from 'react-moment';
import UserEmploymentExperienced from '../../UserProfileFreshers/components/UserEmployment/components/UserEmploymentExperienced';
import ExperiencedView from '../ExperiencedEmpView/components/ExperiencedView';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});
class ExperiencedEmpView extends Component {
  state = {
    editMode: false,
  };
  render() {
    const { classes, employment_details, fresher_experienced, training_internship } = this.props;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Employment"
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
          <UserEmploymentExperienced
            {...{
              classes,
            }}
          />
        ) : (
          <ExperiencedView
            {...{
              classes,
              employment_details,
            }}
          />
        )}{' '}
      </CollapsibleComponentUserProfile>
    );
  }
}

export default withStyles(styles)(ExperiencedEmpView);
