//library dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

//styles
import './styles.scss';

//custom components
import JobSeekerJobDetailsPreview from './components/JobSeekerJobDetailsPreview/JobSeekerJobDetailsPreview';
import SearchJob from './components/SearchJob/SearchJob'

// job listing page routing class function
class JobSeekerJobDetails extends Component {
  render() {
    const { url } = this.props.match;
    return (
      <div className="nested-container">
        <Switch>
          <Route exact path={url} component={SearchJob} />
          <Route path={`${url}/:jobId?/job-preview`} component={JobSeekerJobDetailsPreview}/>
        </Switch>
      </div>
    );
  }
}

JobSeekerJobDetails.propTypes = { classes: PropTypes.object, };

export default JobSeekerJobDetails;
