import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import './RolesForm.css';

class RolesForm extends React.Component {
  _renderToken = (option, props, index, handleRoleNumber, roles) => {
    if (roles.length === 0) {
      return null;
    }
    console.log('OPTION', option);
    const roleName = option.customOption ? option.label : option;
    const roleToChange = roles.find(r => r.roleName === roleName);
    if (!roleToChange) {
      return null;
    }
    console.log('RENDER TOKEN ROLES', roles);
    console.log('ROLE TO CHANGE', roleToChange);
    console.log('RENDER TOKEN ROLENAME', roleName);
    console.log('RENDER TOKEN ROLES', roles);
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
    console.log('=== ROLES FORM HANDLE CHANGE ===', handleChange);
    console.log('ROLES FORM ROLES', roles);
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
          onActiveItemChange={s => console.log('ACTIVE ITEM CHANGE', s)}
          renderToken={(option, props, index) =>
            this._renderToken(option, props, index, handleRoleNumber, roles)
          }
        />
      </Form.Group>
    );
  }
}

export default RolesForm;
