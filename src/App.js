import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import history from './_helpers/history';
import PrivateRoute from './components/routes/PrivateRoute';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage from './components/pages/NewShiftPage/NewShiftPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import SignUpPage from './components/pages/SignUpPage';
import alertActions from './_actions/alert.actions';
import RecommendedShiftHelpPage from './components/pages/HelpPages/RecommendedShiftsHelpPage';
import FeedBackPage from './components/pages/HelpPages/FeedbackPage';
import Dashboard from './components/pages/Dashboard';
import SettingsPage from './components/pages/SettingsPage';
import WelcomePage from './components/pages/WelcomePage/WelcomePage';
import AdminRoute from './components/routes/AdminRoute';
import Header from './components/Header';
import HomePage from './components/pages/WelcomePage/HomePage';

// List of pathnames to compare against to decide whether or not to render the
// header.
const noHeaderPathnames = ['/welcome', '/login', '/signup', '/home'];

export class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    // Clear alerts on location change.
    history.listen(() => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Header
          loggedIn={!noHeaderPathnames.includes(location.pathname)}
          location={location}
        />
        <main>
          <Switch>
            <PrivateRoute path="/" exact component={ShiftsPage} />
            <PrivateRoute path="/shifts" exact component={MyShiftsPage} />
            <AdminRoute path="/new-shift" exact component={NewShiftPage} />
            <PrivateRoute path="/settings" exact component={SettingsPage} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/welcome" exact component={WelcomePage} />

            <PrivateRoute
              path="/help/recommended"
              exact
              component={RecommendedShiftHelpPage}
            />
            <PrivateRoute
              path="/help/feedback"
              exact
              component={FeedBackPage}
            />
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/404" exact component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default withRouter(connect(mapStateToProps)(App));
