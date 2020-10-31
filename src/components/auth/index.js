import React from 'react';
import { connect } from 'react-redux';
import {
  useRouteMatch,
  Switch,
  Route,
  withRouter,
  Redirect
} from 'react-router-dom';
import { login, register } from '../../redux/authReducer/authActions';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthPage = (props) => {
  let match = useRouteMatch();
  let { login, register, user } = props;
  let userType =
    new URLSearchParams(props.location.search).get('userType') || 'student';
  if (user.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Switch>
      <Route
        path={`${match.path}/signup`}
        render={() => <RegisterForm register={register} user={user} />}
      />
      <Route
        path={`${match.path}/signin`}
        render={() => <LoginForm login={login} user={user} userType={userType} />}
      />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(mapStateToProps, {
    login,
    register
  })(AuthPage)
);
