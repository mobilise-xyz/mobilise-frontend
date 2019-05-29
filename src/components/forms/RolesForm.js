import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';

class RolesForm extends React.Component {
  _renderToken = (option, props, index) => (
    <Token key={index} style={{}} onRemove={props.onRemove}>
      <Row>
        <Col
          md="auto"
          style={{
            padding: '0 0.2rem 0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {option.label ? option.label : option}
        </Col>
        <Col
          style={{
            padding: '0 1rem 0 0.2rem',
            width: '3.2rem'
          }}
        >
          <Form.Control
            type="number"
            style={{ height: '1.4rem', textAlign: 'center' }}
          />
        </Col>
      </Row>
    </Token>
  );

  render() {
    const { roleOptions, handleChange } = this.props;
    return (
      <Form.Group controlId="rolesForm">
        <Form.Label>Roles</Form.Label>
        <Typeahead // TODO make async & SORT OUT CSS so letters like g dont get cut off.
          renderToken={this._renderToken}
          id="roles"
          placeholder="Add available roles for shift"
          newSelectionPrefix="Add new role:  "
          options={roleOptions.map(r => r.name)}
          allowNew
          multiple
          onChange={handleChange}
        />
      </Form.Group>
    );
  }
}

export default RolesForm;
