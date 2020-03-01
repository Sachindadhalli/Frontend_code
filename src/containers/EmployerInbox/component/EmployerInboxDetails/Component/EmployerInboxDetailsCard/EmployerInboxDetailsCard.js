//library dependency
import React, {Component} from 'react';
import Moment from "react-moment";
import Grid from '@material-ui/core/Grid';

//styles
import './styles.scss'


class EmployerInboxDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  /**
   * after clicking view, it will redirect page to employer inbox applied user's details
   * @param job_id
   * @constructor
   */
  ViewClickEvent = (job_id) => {
    this.props.history.push(this.props.match.url.replace('employer-inbox', `employer-inbox/${job_id}`))
  };

  render() {
    const {data} = this.props;
    return (
      <div className="employer-inbox-card">
        <div className="employer-inbox-inner-allignment">
          <div className="employer-inbox-view-button" onClick={() => this.ViewClickEvent(data.job_id)}>
            <span style={{"cursor": "pointer"}}>View</span>
          </div>
          <div>
            <Grid container>
              <Grid item xs={6} style={{"padding": "15px"}}>
                <div className="employer-inbox-title">Job Title</div>
                <div className="employer-inbox-title-value">{data.job_title}</div>
              </Grid>
              <Grid item xs={6} style={{"padding": "15px"}}>
                <div className="employer-inbox-title">Company Name</div>
                <div className="employer-inbox-title-value">{data.company_name}</div>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container>
              <Grid item xs={6} style={{"padding": "15px"}}>
                <div className="employer-inbox-title">Experience</div>
                <div
                  className="employer-inbox-title-value">{data.experience.min + " - " + data.experience.max + " Years"}</div>
              </Grid>
              <Grid item xs={6} style={{"padding": "15px"}}>
                <div className="employer-inbox-title">Posted on</div>
                <div className="employer-inbox-title-value">{<Moment format="DD MMM YYYY">
                  {new Date(data.posted_on)}
                </Moment>}</div>
              </Grid>
            </Grid>
          </div>
          <div>
            <label style={{"padding": "15px"}} className="employer-inbox-title"> Status</label>
            <div className="employer-inbox-status-card">
              <div style={{padding: "10px", width: "100%"}}>
                <div className="status-alignment">
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.applied}</div>
                    <div className="status-text">Applied</div>
                  </div>
                  <div className="status-text-right-border">
                  </div>
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.review}</div>
                    <div className="status-text">In Review</div>
                  </div>
                  <div className="status-text-right-border">
                  </div>
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.hold}</div>
                    <div className="status-text">On Hold</div>
                  </div>
                  <div className="status-text-right-border">
                  </div>
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.shortlisted}</div>
                    <div className="status-text">Shortlisted</div>
                  </div>
                  <div className="status-text-right-border">
                  </div>
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.rejected}</div>
                    <div className="status-text">Rejected</div>
                  </div>
                  <div className="status-text-right-border">
                  </div>
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.later}</div>
                    <div className="status-text">Review Later</div>
                  </div>
                  <div className="status-text-right-border">
                  </div>
                  <div className="status-text-value-alignment">
                    <div className="status-count">{data.status.offered}</div>
                    <div className="status-text">Offered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployerInboxDetailsCard;
