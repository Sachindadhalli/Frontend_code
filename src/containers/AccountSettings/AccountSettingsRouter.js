//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
//styles
import './styles.scss';
//custom components
import AccountSettingsContainer from './components/AccountSettingsContainer';

class AccountSettingsRouter extends Component {
  render() {
    const {url} = this.props.match;
    return (
      <div className="nested-container">
        <Switch>
          <Route exact path={url} component={AccountSettingsContainer}/>
        </Switch>
      </div>
    )
  }
}

AccountSettingsRouter.PropTypes = {classes: PropTypes.object,};

export default AccountSettingsRouter;
