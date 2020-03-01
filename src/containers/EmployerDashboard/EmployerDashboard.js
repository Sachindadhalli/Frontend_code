//library dependency
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

//custom components
import ReportEmployer from "./ReportEmployer";

//styles
import './styles.scss';

/**
 * employer dashboard router class function
 */
class EmployerDashboard extends Component {
  render() {
    const {url} = this.props.match;
    return (
      <div className="nested-container">
        <Switch>
          <Route exact path={url + '/'} component={ReportEmployer}/>
        </Switch>
      </div>
    )
  }
}

EmployerDashboard.PropTypes = {
  classes: PropTypes.object,
};

export default EmployerDashboard;
