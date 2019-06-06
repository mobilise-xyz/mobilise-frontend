import React from 'react';
import Layout from '../../Layout';
import AvailabilitySelector from './AvailabilitySelector';
import ContactPreferencesForm from '../../forms/ContactPreferencesForm';

const SettingsPage = () => (
  <Layout>
    <h3>Availability</h3>
    <AvailabilitySelector />
    <hr />
    <h3 className="pt-5">Contact Preferences</h3>
    <ContactPreferencesForm />
  </Layout>
);

export default SettingsPage;
