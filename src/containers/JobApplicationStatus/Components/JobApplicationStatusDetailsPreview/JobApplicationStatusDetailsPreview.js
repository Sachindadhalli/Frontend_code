//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withStyles} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//style
import './styles.scss';
//custom component
import CustomIcon from '../../../../components/CustomTag';
import EmployeeSideNav from '../../../../components/EmployeeSideNav';
import PostJobPreview from '../../../CreateJob/components/PostJobPreview';

//material ui style classes customizations
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},
  userTable: {boxShadow: 'none'}
});

class JobApplicationStatusDetailsPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_of_user: 'jobApplicationStatus'
    };
  }

  /**
   * @function to redirect to job-application-status page
   */
  handleNavigationClick = () => {
    this.props.history.push({pathname: '/job-application-status'})
  };

  render() {
    return (
      <div className="sub-user-page">
        <EmployeeSideNav history={this.props.history} selected={3}>
          <div className="sub-user-wrapper px-20 px-sm-40 pb-20">
            <div className="sub-user-container">
              <div>
                <div className="sub-user-text">Job Application Status Details</div>
                <div className="sub-user-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    arial-label="Breadcrumb"
                  >
                    <Link color="inherit" style={{fontSize: "16px", color: "#656565"}} href=""
                          onClick={this.handleNavigationClick}>
                      Job Application Status
                    </Link>
                    <Link color="inherit" href="/job-application-status">
                      <CustomIcon text="Job Details" className="nav-create-a-job-text"/>
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
            <div>
              <PostJobPreview {...this.props} TypeOfUser={this.state.type_of_user}></PostJobPreview>
            </div>
          </div>
        </EmployeeSideNav>
      </div>
    );
  }
}

JobApplicationStatusDetailsPreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobApplicationStatusDetailsPreview);
