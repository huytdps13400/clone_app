import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';
import Signup from './Auth/Register';
import Dashboards from './Dashboards';
import TourGuide from './TourGuide';

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/signin'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <Route path="/dashboard" component={Dashboards} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>

      {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && (
        <TourGuide />
      )}
    </React.Fragment>
  );
};

export default Routes;
