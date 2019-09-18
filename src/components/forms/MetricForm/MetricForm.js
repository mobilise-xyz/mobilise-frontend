import React from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  CardColumns
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinBeam, faMeh } from '@fortawesome/free-regular-svg-icons';
import metricActions from '../../../_actions/metric.actions';
import authHeader from '../../../_helpers/auth-header';
import utils from '../../../_helpers/utils';
import store from '../../../_helpers/store';

class MetricForm extends React.Component {
  state = {
    name: '',
    verb: '',
    value: ''
  };

  componentDidMount() {
    const config = {
      headers: authHeader()
    };

    axios
      .get(`/metric`, config)
      .then(utils.handleResponse)
      .then(({ metric }) => {
        if (metric) {
          this.setState({
            name: metric.name,
            verb: metric.verb,
            value: metric.value.toString(10)
          });
        }
      });
  }

  handleSubmit = () => {
    const { name, verb, value } = this.state;
    store.dispatch(metricActions.update(name, verb, Number(value)));
  };

  handleDataChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { name, verb, value } = this.state;
    return (
      <Row>
        <Col>
          <Card className="p-3">
            <Form>
              <Form.Group>
                <Form.Label>Please provide a metric:</Form.Label>
                <Form.Text
                  className="text-muted"
                  style={{ paddingBottom: '10px' }}
                >
                  This will be used to provide a volunteer contribution item
                  relating to the work you do. This is previewed on the right.
                </Form.Text>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    id="name"
                    name="name"
                    defaultValue={name}
                    type="text"
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Verb</Form.Label>
                  <Form.Control
                    required
                    id="verb"
                    name="verb"
                    defaultValue={verb}
                    type="text"
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    required
                    id="value"
                    name="value"
                    defaultValue={value}
                    type="number"
                    onChange={this.handleDataChange}
                  />
                </Form.Group>
                <Container className="pt-5 text-center">
                  <Button
                    variant="outline-primary"
                    type="button"
                    onClick={this.handleSubmit}
                  >
                    Save changes
                  </Button>
                </Container>
              </Form.Group>
            </Form>
          </Card>
        </Col>
        <Col>
          <CardColumns>
            <Card>
              <Card.Header className="text-center text-primary">
                <FontAwesomeIcon
                  icon={value > 0 ? faGrinBeam : faMeh}
                  size="6x"
                />
              </Card.Header>
              <Card.Body className="text-center">
                <h1>{value}</h1>
                <Card.Text>{`${name} ${verb} last week`}</Card.Text>
              </Card.Body>
            </Card>
          </CardColumns>
        </Col>
      </Row>
    );
  }
}

export default MetricForm;
