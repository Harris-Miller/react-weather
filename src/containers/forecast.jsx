import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

class Forecast extends Component {

  render() {
    console.log(this.props);
    return (
      <Row>
        <Col sm={12}>
          <h1>TODO: Forecast</h1>
        </Col>
      </Row>
    );
  }
}

Forecast.propTypes = {

};

Forecast.defaultProps = {

};

export default Forecast;
