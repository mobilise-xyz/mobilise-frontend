import React from 'react';
import Layout from '../../Layout';
import AvailabilitySelector from './AvailabilitySelector';
import ContactPreferencesForm from '../../forms/ContactPreferencesForm';

const SettingsPage = () => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>
      {/*  Only render availability if you are a volunteer */}
      {!isAdmin ? (
        <>
          <h3>Availability</h3>
          <AvailabilitySelector />
        </>
      ) : null}
      <hr />
      <h3 className="pt-5">Contact Preferences</h3>
      <ContactPreferencesForm />
    </Layout>
  );
};

export default SettingsPage;
