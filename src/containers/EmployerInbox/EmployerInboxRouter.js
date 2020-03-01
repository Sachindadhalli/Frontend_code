//library dependency
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

//custom components
import InboxJobSeeker from "./component/InboxJobSeeker";
import AppliedUserProfile from "./component/AppliedUserProfile";
import EmployerInboxDetails from "./component/EmployerInboxDetails";

//styles
import './styles.scss';

/**
 * Employer inbox router file
 */
class EmployerInboxRouter extends Component {
  render() {
    const {url} = this.props.match;
    return (
      <div className="nested-container">
        <Switch>
          <Route exact path={url + '/'} component={EmployerInboxDetails}/>
          <Route exact path={url + "/:job_id"} component={InboxJobSeeker}/>
          <Route exact path={url + "/:job_id/user-details/:user_id"} component={AppliedUserProfile}/>
        </Switch>
      </div>
    )
  }
}

EmployerInboxRouter.PropTypes = {
  classes: PropTypes.object,
};

export default EmployerInboxRouter;


//library dependency
//custom components
//styles
//utilities
//icons
