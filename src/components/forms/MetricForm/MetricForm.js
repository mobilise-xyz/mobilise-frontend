import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Container, Form } from 'react-bootstrap';
import metricActions from '../../../_actions/metric.actions';
import PlainTextForm from '../PlainTextForm';

class MetricForm extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(metricActions.get());
  }

  handleSubmit = () => {
    const { metric, dispatch } = this.props;
    const { name, verb, value } = metric;
    dispatch(metricActions.update(name, verb, value));
  };

  render() {
    const { metric, loading } = this.props;

    if (loading === true || !metric) {
      return null;
    }

    const { name, verb, value } = metric;
    return (
      <Card className="p-3">
        <Form>
          <Form.Group>
            <Form.Label>
              Please provide a metric for your volunteers!
            </Form.Label>
            <PlainTextForm id="name" label="Name" content={name} />
            <PlainTextForm id="verb" label="verb" content={verb} />
            <PlainTextForm id="value" label="value" content={value} />
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
    );
  }
}

const mapStateToProps = state => {
  const { metric, loading } = state;
  return {
    metric,
    loading
  };
};

export default connect(mapStateToProps)(MetricForm);
