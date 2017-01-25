import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

/**
 * Note:
 * Not using react-bootstrap.NavItem here because i'm using react.router.Link
 * if I did this:
 *   <NavItem><Link />My Text</NavItem>
 * I'd get rendered:
 *   <a>
 *     <a>My Text</a>
 *   </a>
 * And that's not good
 */
export default () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">React Weather</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <li><Link to="forecast" role="button">Forecast</Link></li>
        <li><a href="#" role="button">Link 2</a></li>
        <li><a href="#" role="button">Link 3</a></li>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
