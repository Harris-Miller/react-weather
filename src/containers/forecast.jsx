import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateTempDisplay } from '../actions';
import { mapStateToProps } from '../reducers';

class Forecast extends Component {
  render() {
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

export default connect(mapStateToProps)(Forecast);
