import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? <Component {...props} /> : <Redirect to="/auth/signin" />
    }
  />
);

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
