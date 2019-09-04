import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../Layout';
import ErrorBoundary from '../../ErrorBoundary';
import ChangePasswordForm from '../../forms/ChangePasswordForm';

const SecurityPage = () => {
  return (
    <Layout>
      <Container>
        <h3 className="pt-5">Change Password</h3>
        <ErrorBoundary>
          <ChangePasswordForm />
        </ErrorBoundary>
      </Container>
    </Layout>
  );
};

export default SecurityPage;
