import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import './RolesForm.css';

class RolesForm extends React.Component {
  _renderToken = (option, props, index) => (
    <Token key={index} onRemove={props.onRemove}>
      <Row>
        <Col md="auto" className="role-name">
          {option.label ? option.label : option}
        </Col>
        <Col className="role-num-col">
          <Form.Control type="number" className="role-num-form" />
        </Col>
      </Row>
    </Token>
  );

  render() {
    const { roles, roleOptions, handleChange } = this.props;
    return (
      <Form.Group controlId="rolesForm">
        <Form.Label>Roles</Form.Label>
        <Typeahead // TODO make async & SORT OUT CSS so letters like g dont get cut off.
          renderToken={(option, props, index) =>
            this._renderToken(option, props, index)
          }
          id="roles"
          placeholder="Add available roles for shift"
          newSelectionPrefix="Add new role:  "
          options={roleOptions.map(r => r.name)}
          allowNew
          multiple
          onChange={handleChange}
          selected={roles.map(r => r.name)}
          selectHintOnEnter
          onActiveItemChange={s => console.log(s)}
        />
      </Form.Group>
    );
  }
}

export default RolesForm;
