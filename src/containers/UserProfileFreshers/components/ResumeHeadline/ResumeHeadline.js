import React, { Component } from 'react';
import './style.scss';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import { Input } from '@material-ui/core';
import AutoCompleteSearch from '../../../../components/AutoCompleteSearch';
import Grid from '@material-ui/core/Grid';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CustomTag from '../../../../components/CustomTag';
import calculateTotalCount from '../../../../Utilities';

class ResumeHeadline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search',
      editMode: true,
      resume_headline: '',
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, resume_headline } = this.props;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Resume Headline"
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
          {/* <div className="headline">
                <span className="title">
                  <h2>Resume Headline</h2>
                </span>
                <span className="btn btn-no float-right">Cancel</span>
                <span className="btn float-right mr-md">Save</span>
              </div>
              <hr />
              <div className="section-body">
                <div className="mt-mdpxs hide-overflw w-full float-left">
                  <span className="btn float-right">Clear All</span>
                  <span className="btn float-right mr-md">Reload</span>
                </div>
                <textarea
                  className="w-full mt-md"
                  name=""
                  defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
                />
                <hr />
                <p className="pb-md1">
                  <small className="float-right">
                    Maximum Character Limit: <span className="text-tom">300</span>
                  </small>
                </p>
              </div> */}
          {this.state.editMode ? (
            <div className="profile-summary-div">
              <Grid container spacing={16}>
                <Grid item xs={12} md={12}>
                  <textarea
                    className="resume-headline-text"
                    defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
                  />
                  <div className="character-info-section">
                    {/* <CustomTag text="Maximum Character Limit: 300" className="character-left" />
                    <CustomTag text={250 - calculateTotalCount()} className="count" /> */}
                    <CustomTag text="Minimum Character left : " className="character-left" />
                    <CustomTag
                      text={resume_headline === '' ? 1000 : 1000 - resume_headline.length}
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
                  <LabelValueComponent type={'OnlyText'} value={resume_headline} />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </CollapsibleComponentUserProfile>
    );
  }
}

export default ResumeHeadline;
