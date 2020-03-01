import React, { Component } from 'react';
import './style.scss';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import { Input } from '@material-ui/core';
import AutoCompleteSearch from '../../../../components/AutoCompleteSearch';
import Grid from '@material-ui/core/Grid';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CustomTag from '../../../../components/CustomTag';
import calculateTotalCount from '../../../../Utilities';
import CustomComponents from '../../../../components/CustomComponents/CustomComponents';
import { Field, reduxForm } from 'redux-form';
import { TextField, Modal } from '@material-ui/core';

class ProfileSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search',
      editMode: true,
      profile_summary: '',
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, profile_summary } = this.props;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Profile Summary"
        showAddButtow={false}
        showEdit={!this.state.editMode}
        onEditClick={() => {
          this.setState({ editMode: true });
        }}
        onclick={() => {
          this.setState({ editMode: false });
        }}
      >
        <div className="basic-details-main-container">
          {this.state.editMode ? (
            // <div className="section-body">
            //   <textarea
            //     className="w-full mt-md"
            //     name=""
            //     defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
            //   />
            //   <hr />
            //   <p className="pb-md1">
            //     <small className="float-right">
            //       Maximum Character Limit: <span className="text-tom">1000</span>
            //     </small>
            //   </p>
            // </div>
            <div className="profile-summary-div">
              <Grid container spacing={16}>
                <Grid item xs={12} md={12}>
                  <textarea
                    className="profile-summary-text"
                    defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
                  />
                  {/* <Field
                    //name="venue"
                    //label="Venue"
                    type="TextArea"
                    // placeholder="Type Address or Venue here"
                    defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
                    component={CustomComponents}
                    styleClass={{ root: 'third-forth venue-margin' }}
                  /> */}
                  <div className="character-info-section">
                    {/* <CustomTag text="Maximum Character Limit: 300" className="character-left" />
                    <CustomTag text={250 - calculateTotalCount()} className="count" /> */}
                    <CustomTag text="Minimum Character left : " className="character-left" />
                    <CustomTag
                      text={profile_summary === '' ? 1000 : 1000 - profile_summary.length}
                      className="count"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div className="profile-summary-div">
              <Grid container spacing={16}>
                <Grid item xs={12} md={12}>
                  <LabelValueComponent type={'OnlyText'} value={profile_summary} />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </CollapsibleComponentUserProfile>
    );
  }
}

export default ProfileSummary;
