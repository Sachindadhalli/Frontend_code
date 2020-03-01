import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import './styles.scss';
import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent';
import Location from '../../../../../assets/media/icons/location.svg';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import DesiredCareerProfileEdit from '../../../UserProfileFreshers/components/UserDesiredCareerProfile/components/DesiredCareerProfileEdit';
import DesiredCareerProfileView from '../../../UserProfileFreshers/components/UserDesiredCareerProfile/components/DesiredCareerProfileView';

const styles = theme => ({});

// class DesiredCareerProfileView extends React.Component {
//   state = {
//     desired_profile: [],
//   };
//   render() {
//     const { desired_profile } = this.state;
//     return (
//       <div className="align-in-collapse">
//         <div>
//           <Grid container spacing={16}>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Industry"
//                 value={desired_profile.industry ? desired_profile.industry : '-'}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Functional Area"
//                 value={desired_profile.functional_area ? desired_profile.functional_area : '-'}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Role"
//                 value={desired_profile.role ? desired_profile.role : '-'}
//               />
//             </Grid>
//           </Grid>
//         </div>
//         <div>
//           <Grid container spacing={16}>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Job Type"
//                 value={desired_profile.job_type ? desired_profile.job_type : '-'}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Employment Type"
//                 value={desired_profile.employment_type ? desired_profile.employment_type : '-'}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Desired Shift"
//                 value={desired_profile.shift ? desired_profile.shift : '-'}
//               />
//             </Grid>
//           </Grid>
//         </div>
//         <div>
//           <Grid container spacing={16}>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Availability to Join"
//                 value={desired_profile.availability ? desired_profile.availability : '-'}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Expected Salary"
//                 value={
//                   desired_profile.expected_salary
//                     ? desired_profile.expected_salary['currency'] +
//                       ' ' +
//                       desired_profile.expected_salary['value'] +
//                       ' Lacs'
//                     : '-'
//                 }
//               />
//             </Grid>
//           </Grid>
//         </div>
//         <div>
//           <Grid container spacing={16}>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Desired Location"
//                 value={desired_profile.desired_location ? desired_profile.desired_location : '-'}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <LabelValueComponent
//                 label="Desired Industry"
//                 value={desired_profile.desired_industry ? desired_profile.desired_industry : '-'}
//               />
//             </Grid>
//           </Grid>
//         </div>
//       </div>
//       //);
//     );
//   }
// }
class UserDesiredCareerProfileView extends React.Component {
  state = {
    editMode: false,
  };
  checkValidationsOnSave = e => {
    this.desiredCareerReference.checkForErrors();
  };
  render() {
    const { classes, desired_profile } = this.props;
    return (
      <div className="label-value-body">
        <CollapsibleComponentUserProfile
          collapsibleTitle="Desired Career Profile"
          onSaveClick={this.checkValidationsOnSave}
          //To display edit button
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
            <DesiredCareerProfileEdit
              onRef={ref => (this.desiredCareerReference = ref)}
              {...{
                classes,
              }}
            />
          ) : (
            <DesiredCareerProfileView desired_profile={desired_profile} />
          )}{' '}
        </CollapsibleComponentUserProfile>
      </div>
    );
  }
}

UserDesiredCareerProfileView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDesiredCareerProfileView);
