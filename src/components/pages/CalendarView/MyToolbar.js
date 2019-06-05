import React from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE'
};

class MyToolbar extends React.Component {
  navigate = action => {
    const { onNavigate } = this.props;
    onNavigate(action);
  };

  render() {
    const {
      localizer: { messages },
      label
    } = this.props;
    return (
      <Row className="rbc-toolbar">
        <Col>
          <ButtonGroup className="rbc-btn-group">
            <Button type="button" onClick={() => this.navigate(navigate.TODAY)}>
              {messages.today}
            </Button>
            <Button
              type="button"
              onClick={() => this.navigate(navigate.PREVIOUS)}
            >
              Last week
            </Button>
            <Button type="button" onClick={() => this.navigate(navigate.NEXT)}>
              Next week
            </Button>
          </ButtonGroup>
        </Col>

        <Col className="rbc-toolbar-label">{label}</Col>
        <Col />
      </Row>
    );
  }
}

export default MyToolbar;
