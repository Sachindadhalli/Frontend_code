//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

const RoutePublic = ({component: Component, isAuthenticated, to, ...rest}) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? <Redirect to={to}/> : <Component {...props} />)}
  />
);
/**
 * Defining props
 * @type {{component: *, isAuthenticated: *, to: shim}}
 */
RoutePublic.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  to: PropTypes.string,
};

RoutePublic.defaultProps = {
  to: '/private',
};

export default RoutePublic;
