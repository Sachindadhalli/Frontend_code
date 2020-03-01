// export default withStyles(styles)(ProfileSummary);
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './style.scss';
import LabelValueComponent from '../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent from '../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});
class UserProfileSummaryExperienced extends Component {
  render() {
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle="Profile Summary">
        <div className="profile-summary-div">
          <Grid container spacing={16} >
            <Grid item xs={12} md={12}>
              <LabelValueComponent type={"OnlyText"} value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets." />
            </Grid>
          </Grid>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfileSummaryExperienced);
