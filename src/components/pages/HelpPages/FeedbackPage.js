import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import CardLayout from '../../CardLayout';
import usersActions from '../../../_actions/users.actions';

class FeedbackPage extends Component {
  state = {
    feedback: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { feedback } = this.state;
    const { dispatch } = this.props;

    // If a user is on the feedback page, they should be logged in so this should exist.
    const { uid } = JSON.parse(localStorage.getItem('user'));
    dispatch(usersActions.submitFeedback(uid, feedback));
  };

  render() {
    const { feedback } = this.state;

    return (
      <CardLayout title="Feedback">
        <p>Your feedback enables us to improve Mobilise!</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Enter your message below</Form.Label>
            <Form.Control
              name="feedback"
              value={feedback}
              as="textarea"
              rows="30"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="btn-more-info">
            Send
          </Button>
        </Form>
      </CardLayout>
    );
  }
}

export default connect()(FeedbackPage);
