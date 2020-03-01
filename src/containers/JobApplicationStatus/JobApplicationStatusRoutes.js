//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
//custom components
import JobApplicationStatus from './Components/JobApplicationStatusContainer';
import JobApplicationStatusDetailsPreview from './Components/JobApplicationStatusDetailsPreview/JobApplicationStatusDetailsPreview';

class JobApplicationStatusRoutes extends Component {
  render() {
    const {url} = this.props.match;
    return (
      <div className="nested-container">
        <Switch>
          <Route exact path={url} component={JobApplicationStatus}/>
          <Route path={`${url}/:jobId?/job-application-status-preview`} component={JobApplicationStatusDetailsPreview}/>
        </Switch>
      </div>
    )
  }
}

JobApplicationStatusRoutes.PropTypes = {classes: PropTypes.object,};

export default JobApplicationStatusRoutes;
