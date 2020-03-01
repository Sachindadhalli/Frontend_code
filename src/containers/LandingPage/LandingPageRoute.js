//library dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route} from 'react-router-dom';

//style
import './styles.scss';

//custom component
import LandingPage from './LandingPage/LandingPage'

class LandingPageRoute extends Component {
  render () {
    const { url } = this.props.match;
    return (
      <div className="nested-container">
        <Switch>
          <Route exact path={url} component={LandingPage} />
        </Switch>
      </div>
    )
  }
}

/**
 * defining Prop Type of LandingPageRoute component
 * @type {{classes: shim}}
 */
LandingPageRoute.PropTypes = {
  classes : PropTypes.object,
};

export default LandingPageRoute;
