import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../../Layout';
import PrivacyPolicy from '../../forms/PrivacyPolicy';

const PrivacyPage = () => {
  return (
    <Layout>
      <Container>
        <PrivacyPolicy defaultActiveKey="0" />
      </Container>
    </Layout>
  );
};

export default PrivacyPage;
