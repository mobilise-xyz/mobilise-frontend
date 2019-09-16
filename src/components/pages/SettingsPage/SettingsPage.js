import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../Layout';
import AvailabilityForm from '../../forms/AvailabilityForm';
import MetricForm from '../../forms/MetricForm';
import ContactPreferencesForm from '../../forms/ContactPreferencesForm';
import ErrorBoundary from '../../ErrorBoundary';
import MyEmergencyContactsForm from '../../forms/MyEmergencyContactsForm';

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
        <hr />
        {!isAdmin ? (
          <>
            <h3 className="pt-5">My Emergency Contacts</h3>
            <ErrorBoundary>
              <MyEmergencyContactsForm />
            </ErrorBoundary>
          </>
        ) : null}
      </Container>
    </Layout>
  );
};

export default SettingsPage;
