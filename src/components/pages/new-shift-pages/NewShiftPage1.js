import React from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import Layout from '../../Layout';
import LocationForm from '../../forms/new-shift-forms/LocationForm';
import TimeDateForm from '../../forms/new-shift-forms/TimeDateForm';

// TODO:  make a carousel maybe??
const NewShiftPage1 = () => (
  <Layout>
    <CardGroup>
      <Card>
        <Card.Body>
          <Card.Title>New Shift</Card.Title>
          <LocationForm />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <TimeDateForm />
        </Card.Body>
      </Card>
    </CardGroup>
  </Layout>
);

export default NewShiftPage1;
