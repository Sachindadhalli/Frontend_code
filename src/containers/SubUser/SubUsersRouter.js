//module components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
//custom components
import AddUser from './components/AddUser';
import SubUsersContainer from './components/SubUsersContainer/SubUsersContainer';
//styles
import './style.scss';

class SubUsersRouter extends Component {
  render() {
    const {url} = this.props.match;
    return (
      <div className="nested-container">
        {/* Nested routing */}
        <Switch>
          <Route exact path={url} component={SubUsersContainer}/>
          <Route path={`${url}/user/:userId?`} component={AddUser}/>
        </Switch>
      </div>
    );
  }
}

SubUsersRouter.propTypes = {
  classes: PropTypes.object,
};

export default SubUsersRouter;
