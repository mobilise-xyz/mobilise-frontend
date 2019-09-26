import React from 'react';
import CardLayout from '../CardLayout';
import PasswordResetForm from '../forms/PasswordResetForm/PasswordResetForm';

export default class PasswordResetPage extends React.Component {
  state = {};

  render() {
    const { location } = this.props;
    const token = new URLSearchParams(location.search).get('token');
    return (
      <CardLayout title="Password Reset">
        <PasswordResetForm token={token} />
      </CardLayout>
    );
  }
}
