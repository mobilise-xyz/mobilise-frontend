import React from 'react';
import CardLayout from '../CardLayout';
import SignUpForm from '../forms/SignUpForm/SignUpForm';

export default class SignUpPage extends React.Component {
  state = {};

  // TODO: TIGER Privacy and Data security form.
  render() {
    return (
      <CardLayout title="Sign up">
        <SignUpForm />
      </CardLayout>
    );
  }
}
