import React from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';

class ContactPreferencesForm extends React.Component {
  handleSubmit = e => {
    console.log('DO SUBMIT', e);
  };

  render() {
    return (
      <Card className="p-3">
        <Form>
          <Form.Group>
            <Form.Label>I would prefer to be contacted by...</Form.Label>
            <Form.Check type="checkbox" label="Email" />
            <Form.Check type="checkbox" label="SMS" />
            <Form.Text className="text-muted">
              This will be used by volunteer coordinators to contact you with
              information regarding a shift.
            </Form.Text>
            <Container className="pt-5 text-center">
              <Button
                variant="outline-primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Save changes
              </Button>
            </Container>
          </Form.Group>
        </Form>
      </Card>
    );
  }
}

export default ContactPreferencesForm;
