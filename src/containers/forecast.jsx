import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { updateTempDisplay } from '../actions';
import { mapStateToProps } from '../reducers';

const Forecast = () => (
  <Row>
    <Col sm={12}>
      <h1>TODO: Forecast</h1>
    </Col>
  </Row>
);

export default connect(mapStateToProps)(Forecast);
