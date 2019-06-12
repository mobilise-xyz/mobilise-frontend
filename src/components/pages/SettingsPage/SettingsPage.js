import React from 'react';
import Layout from '../../Layout';
import AvailabilitySelector from './AvailabilitySelector';
import MetricForm from '../../forms/MetricForm';
import ContactPreferencesForm from '../../forms/ContactPreferencesForm';
import ErrorBoundary from '../../ErrorBoundary';

const SettingsPage = () => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>
      <ErrorBoundary>
        {/*  Only render availability if you are a volunteer */}
        {!isAdmin ? (
          <>
            <h3>Availability</h3>
            <AvailabilitySelector />
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
    </Layout>
  );
};

export default SettingsPage;
