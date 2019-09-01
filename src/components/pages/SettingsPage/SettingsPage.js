import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../Layout';
import AvailabilityForm from '../../forms/AvailabilityForm/AvailabilityForm';
import MetricForm from '../../forms/MetricForm';
import ChangePasswordForm from '../../forms/ChangePasswordForm';
import ContactPreferencesForm from '../../forms/ContactPreferencesForm';
import ErrorBoundary from '../../ErrorBoundary';
import MyEmergencyContacts from './MyEmergencyContacts';

const SettingsPage = () => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>
      <Container>
        <ErrorBoundary>
          {/*  Only render availability if you are a volunteer */}
          {!isAdmin ? (
            <>
              <h3>Availability</h3>
              <AvailabilityForm />
              <hr />
            </>
          ) : (
            <>
              <h3>Metric</h3>
              <ErrorBoundary>
                <MetricForm />
              </ErrorBoundary>
              <hr />
            </>
          )}
        </ErrorBoundary>
        <h3 className="pt-5">Contact Preferences</h3>
        <ErrorBoundary>
          <ContactPreferencesForm />
        </ErrorBoundary>
        <h3 className="pt-5">Change Password</h3>
        <ErrorBoundary>
          <ChangePasswordForm />
        </ErrorBoundary>
        {!isAdmin ? (
          <ErrorBoundary>
            <MyEmergencyContacts />
          </ErrorBoundary>
        ) : null}
      </Container>
    </Layout>
  );
};

export default SettingsPage;
