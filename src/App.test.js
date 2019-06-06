import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import ShiftsPage from './components/pages/ShiftsPage';
import MyShiftsPage from './components/pages/MyShiftsPage';
import NewShiftPage from './components/pages/NewShiftPage/NewShiftPage';
import LoginPage from './components/pages/LoginPage';
import NotFound from './components/pages/NotFound';
import SettingsPage from './components/pages/SettingsPage';
import SignUpPage from './components/pages/SignUpPage';
import AvailabilityPage from './components/pages/SettingsPage/AvailabilitySelector';

describe('<App />', () => {
  let app;

  beforeEach(() => {
    app = <App />;
  });

  it('renders as expected', () => {
    expect(shallow(app)).toMatchSnapshot();
  });

  it('routes to login', () => {
    expect(
      shallow(app)
        .find('Route[exact=true][path="/login"]')
        .first()
        .prop('component')
    ).toBe(LoginPage);
  });

  it('routes to signup', () => {
    expect(
      shallow(app)
        .find('Route[exact=true][path="/signup"]')
        .first()
        .prop('component')
    ).toBe(SignUpPage);
  });

  it('routes to 404 page', () => {
    expect(
      shallow(app)
        .find('Route[exact=true][path="/404"]')
        .first()
        .prop('component')
    ).toBe(NotFound);
  });

  it('privately routes to shifts page', () => {
    expect(
      shallow(app)
        .find('PrivateRoute[exact=true][path="/"]')
        .first()
        .prop('component')
    ).toBe(ShiftsPage);
  });

  it('privately routes to my shifts page', () => {
    expect(
      shallow(app)
        .find('PrivateRoute[exact=true][path="/shifts"]')
        .first()
        .prop('component')
    ).toBe(MyShiftsPage);
  });

  it('privately routes to new shift page', () => {
    expect(
      shallow(app)
        .find('PrivateRoute[exact=true][path="/new-shift"]')
        .first()
        .prop('component')
    ).toBe(NewShiftPage);
  });

  it('privately routes to availability page', () => {
    expect(
      shallow(app)
        .find('PrivateRoute[exact=true][path="/availability"]')
        .first()
        .prop('component')
    ).toBe(AvailabilityPage);
  });

  it('privately routes to settings page', () => {
    expect(
      shallow(app)
        .find('PrivateRoute[exact=true][path="/settings"]')
        .first()
        .prop('component')
    ).toBe(SettingsPage);
  });

  it('redirects invalid URL to 404 page', () => {
    shallow(app).find('Redirect[from="/invalid"][to="404"]');
  });
});
