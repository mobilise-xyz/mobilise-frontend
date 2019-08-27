import React from 'react';
import CardLayout from '../CardLayout';
import SignUpForm from '../forms/SignUpForm/SignUpForm';

export default class SignUpPage extends React.Component {
  state = {};

  render() {
    const { location } = this.props;
    const token = new URLSearchParams(location.search).get('token');
    return (
      <CardLayout title="Sign up">
        <SignUpForm token={token} />
      </CardLayout>
    );
  }
}
