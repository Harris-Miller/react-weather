import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { noop } from '../utils';

class WeatherNavbar extends Component {
  static propTypes = {
    display: PropTypes.string,
    changeTempDisplay: PropTypes.func
  };

  static defaultProps = {
    display: 'F',
    changeTempDisplay: noop
  };

  changeTempDisplay = e => {
    this.props.changeTempDisplay(e.target.value);
  };

  /**
   * Note:
   * Not using react-bootstrap.NavItem in some places here because it doesn't play well with react.router.Link
   * Also, the temperature selection is not a stand-alone component because it is aware that it exists in the Navbar
   *   That should be designed better, but I'm using bootstrap here and don't feel like doing crazy customization for a demo
   */
  render() {
    const isFahrenheit = this.props.display === 'F';

    return (
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
          <Nav pullRight>
            <li>
              <Button onClick={this.changeTempDisplay} value="F" bsStyle={isFahrenheit ? 'primary' : 'default'} className="navbar-btn">Fahrenheit</Button>
              <Button onClick={this.changeTempDisplay} value="C" bsStyle={!isFahrenheit ? 'primary' : 'default'} className="navbar-btn">Celsuis</Button>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default WeatherNavbar;
