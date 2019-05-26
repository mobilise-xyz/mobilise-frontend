import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header';
import './Layout.css';

// This class defines the layout for each page i.e. Header at the top, content in the middle.
const Layout = ({ children }) => (
  <div>
    <Header />
    {/* Use pt-5 utility class to create some space between the header and content. */}
    <Container className="pt-5">{children}</Container>
    <div className="corner-triangle" />
  </div>
);

export default Layout;
