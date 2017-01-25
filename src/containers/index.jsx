import React from 'react';
import { Col } from 'react-bootstrap';

export default () => (
  <Col sm={12}>
    <h1>Welcome to React-Weather</h1>
    <div>Use the navigation above to see the forecast of a current city, or compair the weather of multiple cities</div>
    <div>All weather data courtesy of <a href="https://www.wunderground.com/">wunderground.com</a></div>
  </Col>
);
