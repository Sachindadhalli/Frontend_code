import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import './styles.scss';
import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent';
import Clock from '../../../../../assets/media/icons/clock.svg';
import Location from '../../../../../assets/media/icons/location.svg';
import Calender from '../../../../../assets/media/icons/calendar.svg';
import LinkIcon from '../../../../../assets/media/icons/link.png';
import UserIcon from '../../../../../assets/media/icons/user.png';
import WorkExperience from '../../../../../assets/media/icons/work-exp.svg';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import MyAchievementView from '../../../UserProfileFreshers/components/UserMyAchievement/components/MyAchievementView';
import MyAchievementEdit from '../../../UserProfileFreshers/components/UserMyAchievement/components/MyAchievementEdit';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';

const styles = theme => ({});

const allDropDownWidth = {
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};

class UserMyAchievementView extends React.Component {
  state = {
    editMode: false,
  };
  render() {
    const { classes, achievements, training_internship } = this.props;
    const { course_name, role_dsc } = this.state;
    const {
      month,
      year,
      month1,
      year1,
      start_date,
      com_date,
      start_date_error,
      com_date_error,
    } = this.state;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="My Achievements"
        //To edit the component on click of Edit button
        showEdit={!this.state.editMode}
        onEditClick={() => {
          this.setState({ editMode: true });
        }}
        onclick={() => {
          this.setState({ editMode: false });
        }}
      >
        {this.state.editMode ? (
          <MyAchievementEdit
            // onRef={ref => (this.desiredCareerReference = ref)}
            {...{
              classes,
              course_name,
              role_dsc,
              month,
              year,
              month1,
              year1,
              start_date,
              com_date,
              start_date_error,
              com_date_error,
              rightHalf,
              leftHalf,
              fullWidth,
              allDropDownWidth,
            }}
          />
        ) : (
          <MyAchievementView {...{ classes, achievements, training_internship }} />
        )}{' '}
      </CollapsibleComponentUserProfile>
    );
  }
}

UserMyAchievementView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UserMyAchievementView;
