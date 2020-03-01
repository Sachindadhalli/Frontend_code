//library dependency
import React, {Component} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from "react-moment";
import Grid from "@material-ui/core/Grid";

//custom components
import LabelValueComponent
  from "../../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent";

//styles
import './styles.scss'

//used to override material ui custom component styles
const styles = theme => ({
  root: {display: 'flex', justifyContent: 'center', flexWrap: 'wrap'},
  chip: {
    margin: theme.spacing.unit * .5,
    background: "#eeeeee",
    color: "#757575",
    "font-family": "Roboto",
    "font-size": "14px"
  },
  tooltip: {"font-family": "Roboto", "font-size": "16px", "font-weight": 400}
});

class InboxJobSeekerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  /**
   * after clicking job card, it will redirect to user profile page with specified user id
   * @param user_id
   * @constructor
   */
  CardClickEvent = (user_id) => {
    this.props.history.push(this.props.match.url.replace(`employer-inbox/${this.props.match.params.job_id}`, `employer-inbox/${this.props.match.params.job_id}/user-details/${user_id}`))
  };

  render() {
    const {classes, data} = this.props;
    return (
      <div className="inbox-jobseeker-card" onClick={() => this.CardClickEvent(data.applicant_id)}>
        <div className="inner-allignment">
          <div className="name-profile-alignments">
            <div className="mobile-view-align">
              <div className="inbox-jobseeker-card-title Name">Name</div>
              <Tooltip disableFocusListener disableTouchListener title={data.applicant_name} placement="top"
                       className={classes.tooltip}>
                <div className="inbox-jobseeker-card-subtitle inner-name ellipse-name">
                  {data.applicant_name}
                </div>
              </Tooltip>
            </div>
            <div className="mobile-view-align">
              <div className="inbox-jobseeker-card-title Profile-Match-">Status</div>
              <div className="inbox-jobseeker-card-subtitle inner-name">{data.status}</div>
            </div>
            <div className="mobile-view-align1">
              <div className="inbox-jobseeker-card-title Profile-Match-">Profile Match %</div>
              <div className="inner-profile">{data.profile_match + "%"}</div>
            </div>
          </div>
          <div className="inbox-jobseeker-card-title job-description-title">Job Designation</div>
          <div className="inbox-jobseeker-card-subtitle job-description-subtitle">{data.job_description}</div>
          <div className="inbox-jobseeker-card-title job-description-title">Current Organisation</div>
          <div className="inbox-jobseeker-card-subtitle job-description-subtitle">{data.current_organisation}</div>
          <div className="inbox-jobseeker-card-title job-description-title">Matching Skills</div>
          <div className="inbox-jobseeker-card-subtitle">
            <div className="top-padding-10">
              {data.matching_skills.map((skill, index) => <span><Chip key={index} label={skill}
                                                                      className={classes.chip}/></span>)}
            </div>
          </div>
          <div className="inbox-jobseeker-card-title job-description-title">Other Skills</div>
          <div className="inbox-jobseeker-card-subtitle">
            <div className="top-padding-10">
              {data.other_skills.map((skill, index) => <span><Chip key={index} label={skill} className={classes.chip}/></span>)}
            </div>
          </div>
          <div style={{"padding-top": "22px"}}>
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Experience' value={data.experience}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Applied on'
                                     value={<Moment format="Do MMM YYYY">{new Date(data.applied_on)}</Moment>}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Current / Expected CTC'
                                     value={data.current_salary ? data.current_salary + " Lacs" : "NA"}/>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(InboxJobSeekerCard);
