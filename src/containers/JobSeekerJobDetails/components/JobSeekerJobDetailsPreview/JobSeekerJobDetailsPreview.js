//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Link} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//styles
import './styles.scss';

//custom components
import EmployeeSideNav from '../../../../components/EmployeeSideNav';
import CustomIcon from '../../../../components/CustomTag';
import PostJobPreview from '../../../CreateJob/components/PostJobPreview';

//used to overrides material ui theme style
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},
  userTable: {boxShadow: 'none'}
});

class JobSeekerJobDetailsPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {type_of_user: 'jobSeeker'};
  }

  /**
   * redirect to job page whenever jobs navigation text is clicked
   * @param e
   */
  handleNavigationClick = (e) => {
    e.preventDefault();
    this.props.history.push({pathname: '/jobs'})
  };

  render() {
    return (
      <div className="sub-user-page">
        <EmployeeSideNav history={this.props.history} selected={2}>
          <div className="sub-user-wrapper px-20 px-sm-40 pb-20">
            <div className="sub-user-container">
              <div>
                <div className="sub-user-text">Job Details</div>
                <div className="sub-user-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    arial-label="Breadcrumb"
                  >
                    <Link color="inherit" style={{fontSize: "16px", color: "#656565"}} href=""
                          onClick={this.handleNavigationClick}>
                      Job Listing
                    </Link>
                    <Link color="inherit" href="" onClick={this.handleNavigationOnClick}>
                      <CustomIcon text="Job Details" className="nav-create-a-job-text"/>
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
            <div>
              <PostJobPreview {...this.props} TypeOfUser={this.state.type_of_user}/>
            </div>
          </div>
        </EmployeeSideNav>
      </div>

    );
  }
}

JobSeekerJobDetailsPreview.propTypes = {classes: PropTypes.object.isRequired,};

export default withStyles(styles)(JobSeekerJobDetailsPreview);
