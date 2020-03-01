import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import './styles.scss';
import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent';
import Location from '../../../../../assets/media/icons/location.svg';
import Clock from '../../../../../assets/media/icons/clock.svg';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import ChipsComponents from '../../../../components/ReusableComponents/ChipsComponents';
import ProjectView from '../../../UserProfileFreshers/components/UserProjects/components/ProjectView';
import ProjectEdit from '../../../UserProfileFreshers/components/UserProjects/components/ProjectEdit';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import Moment from 'react-moment';

const styles = theme => ({});

class UserProjectsView extends React.Component {
  state = {
    editMode: false,
  };
  checkValidationsOnSave = e => {
    this.projectReference.checkForErrors();
  };
  render() {
    const { classes, projects } = this.props;
    return (
      <CollapsibleComponentUserProfile
        onSaveClick={this.checkValidationsOnSave}
        collapsibleTitle="Project"
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
          <ProjectEdit
            onRef={ref => (this.projectReference = ref)}
            {...{
              classes,
            }}
          />
        ) : (
          <ProjectView
            {...{
              projects,
            }}
          />
        )}{' '}
      </CollapsibleComponentUserProfile>
    );
  }
}

UserProjectsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProjectsView);
