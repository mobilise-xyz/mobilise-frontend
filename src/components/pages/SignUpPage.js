import React from 'react';
import CardLayout from '../CardLayout';
import SignUpForm from '../forms/SignUpForm/SignUpForm';

export default class SignUpPage extends React.Component {
  state = {};

  render() {
    return (
      <CardLayout title="Sign up">
        <SignUpForm />
      </CardLayout>
    );
  }
}
