//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

//custom components
import LabelValueComponent
  from '../../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent
  from '../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';

//styles
import './styles.scss';

class ProfileSummary extends Component {
  render() {
    const {profile_summary} = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle="Profile Summary">
          <div className="profile-summary-div">
            <Grid container spacing={16}>
              <Grid item xs={12} md={12}>
                <LabelValueComponent type={"OnlyText"} value={profile_summary}/>
              </Grid>
            </Grid>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default ProfileSummary;
