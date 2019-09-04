import React from 'react';
import { Card } from 'react-bootstrap';
import MyEmergencyContacts from './MyEmergencyContacts';

function MyEmergencyContactsForm() {
  return (
    <Card className="p-3">
      <MyEmergencyContacts />
    </Card>
  );
}

export default MyEmergencyContactsForm;
