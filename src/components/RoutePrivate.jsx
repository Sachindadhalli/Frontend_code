//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';

const RoutePrivate = ({component: Component, isAuthenticated, to, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: to,
            state: {redirect: props.location.pathname, isAuthenticated},
          }}
        />
      )
    }
  />
);
/**
 * Defining props of RoutePrivate
 * @type {{component: *, isAuthenticated: *, to: shim}}
 */
RoutePrivate.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
  to: PropTypes.string,
};

RoutePrivate.defaultProps = {
  to: '/',
};

export default RoutePrivate;