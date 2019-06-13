import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Token, Typeahead } from 'react-bootstrap-typeahead';
import './RolesForm.css';

class RolesForm extends React.Component {
  state = {
    inputIsSelected: false
  };

  handleRemove = onRemove => {
    const { inputIsSelected } = this.state;
    if (inputIsSelected) {
      return;
    }
    onRemove();
  };

  _renderToken = (option, props, index, handleRoleNumber, roles) => {
    if (roles.length === 0) {
      return null;
    }
    const roleName = option.customOption ? option.label : option;
    const roleToChange = roles.find(r => r.roleName === roleName);
    if (!roleToChange) {
      return null;
    }
    return (
      <Token key={index} onRemove={() => this.handleRemove(props.onRemove)}>
        <Row>
          <Col md="auto" className="role-name">
            {roleName}
          </Col>
          <Col className="role-num-col">
            <Form.Control
              name={roleName}
              type="number"
              className="role-num-form"
              min={1}
              onChange={handleRoleNumber}
              value={roleToChange.number}
              onFocus={() => this.setState({ inputIsSelected: true })}
              onBlur={() => this.setState({ inputIsSelected: false })}
            />
          </Col>
        </Row>
      </Token>
    );
  };

  render() {
    const { roles, roleOptions, handleChange, handleRoleNumber } = this.props;
    return (
      <Form.Group controlId="rolesForm">
        <Form.Label>Roles</Form.Label>
        <Typeahead
          className="typeahead"
          id="roles"
          placeholder="Add available roles for shift"
          newSelectionPrefix="Add new role:  "
          options={roleOptions.map(r => r.roleName)}
          allowNew
          multiple
          onChange={handleChange}
          selected={roles.map(r => r.roleName)}
          selectHintOnEnter
          onKeyDown={this.onKeyDown}
          renderToken={(option, props, index) =>
            this._renderToken(option, props, index, handleRoleNumber, roles)
          }
        />
      </Form.Group>
    );
  }
}

export default RolesForm;
