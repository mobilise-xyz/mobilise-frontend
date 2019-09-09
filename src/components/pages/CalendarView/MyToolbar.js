import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import shiftsActions from '../../../_actions/shifts.actions';

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

  exportCalendar = () => {
    const { dispatch } = this.props;
    const { uid, isAdmin } = JSON.parse(localStorage.getItem('user'));
    if (isAdmin) {
      dispatch(shiftsActions.getCalendarForAll());
    } else {
      dispatch(shiftsActions.getCalendarForUser(uid));
    }
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
        <Col style={{ textAlign: 'right' }}>
          <Button type="button" onClick={this.exportCalendar}>
            Export
          </Button>
        </Col>
      </Row>
    );
  }
}

export default connect()(MyToolbar);
