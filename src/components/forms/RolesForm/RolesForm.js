import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import './RolesForm.css';

class RolesForm extends React.Component {
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
      <Token key={index} onRemove={props.onRemove}>
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
        <Typeahead // TODO make async & SORT OUT CSS so letters like g dont get cut off.
          id="roles"
          placeholder="Add available roles for shift"
          newSelectionPrefix="Add new role:  "
          options={roleOptions.map(r => r.name)}
          allowNew
          multiple
          onChange={handleChange}
          selected={roles.map(r => r.name)}
          selectHintOnEnter
          renderToken={(option, props, index) =>
            this._renderToken(option, props, index, handleRoleNumber, roles)
          }
        />
      </Form.Group>
    );
  }
}

export default RolesForm;
