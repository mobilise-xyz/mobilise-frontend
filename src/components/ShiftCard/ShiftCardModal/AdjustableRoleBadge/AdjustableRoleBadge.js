import React from 'react';
import * as PropTypes from 'prop-types';
import { Badge, Button, Col, Collapse, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../RoleBadges/ModalRoleBadge/RoleBadge.css';
import './AdjustableRoleBadge.css';

const DecrementButton = ({ handleUpdate, name, number }) => (
  <Button
    className="role-control-button"
    onClick={() => handleUpdate(name, number - 1)}
  >
    {<FontAwesomeIcon icon={faMinus} color="white" />}
  </Button>
);

const IncrementButton = ({ handleUpdate, name, number }) => (
  <Button
    className="role-control-button"
    onClick={() => handleUpdate(name, number + 1)}
  >
    {<FontAwesomeIcon icon={faPlus} color="white" />}
  </Button>
);

// This is the badge used in the admin shift modal that allows the user to change the role numbers for the shift.
class AdjustableRoleBadge extends React.Component {
  state = {
    show: false
  };

  toggleOpen = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  render() {
    const {
      roleName,
      number,
      handleUpdate,
      onModal,
      colour,
      volunteerNames
    } = this.props;
    const { show } = this.state;

    return (
      <div className="role-badge-container">
        <Badge
          className="role-badge adjustable"
          style={{ backgroundColor: colour, width: '100%' }}
          name={roleName}
        >
          <Row noGutters>
            <Col style={{ margin: 'auto' }}>{roleName}</Col>
            <Col>
              {onModal ? (
                <DecrementButton
                  handleUpdate={handleUpdate}
                  name={roleName}
                  number={number}
                />
              ) : null}
              {number ? (
                <Badge variant="light" className="number-badge">
                  {number}
                </Badge>
              ) : (
                number
              )}
              {onModal ? (
                <IncrementButton
                  handleUpdate={handleUpdate}
                  name={roleName}
                  number={number}
                />
              ) : null}
            </Col>
            <Col>
              <Button
                type="button"
                onClick={this.toggleOpen}
                className="role-control-button open"
              >
                <i className="material-icons md-light">menu</i>
              </Button>
            </Col>
          </Row>
        </Badge>
        <Collapse in={show}>
          <div
            className="role-list-container"
            style={{ backgroundColor: colour }}
          >
            <ListGroup className="role-list">
              {volunteerNames.map(volunteerName => (
                <ListGroup.Item className="role-list-name">
                  {volunteerName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Collapse>
      </div>
    );
  }
}

AdjustableRoleBadge.propTypes = {
  roleName: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  volunteerNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  onModal: PropTypes.bool,
  colour: PropTypes.string
};

AdjustableRoleBadge.defaultProps = { onModal: true, colour: 'info' };

export default AdjustableRoleBadge;
