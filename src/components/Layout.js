import React from 'react';
import Header from './Header';
import { Container } from 'react-bootstrap';

// This class defines the layout for each page i.e. Header at the top, content in the middle.
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
