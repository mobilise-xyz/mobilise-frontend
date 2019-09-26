import React from 'react';
import CardLayout from '../CardLayout';
import PasswordResetForm from '../forms/PasswordResetForm/PasswordResetForm';

const PasswordResetPage = props => {
  const { location } = props;
  const token = new URLSearchParams(location.search).get('token');
  return (
    <CardLayout title="Password Reset">
      <PasswordResetForm token={token} />
    </CardLayout>
  );
};

export default PasswordResetPage;
