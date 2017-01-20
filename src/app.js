import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

export default class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <h1>Welcome to the Pairin Weather Search App!</h1>
            <h3>Do a search for your city below to view the weather!</h3>
          </Col>
        </Row>
      </Grid>
    );
  }
}
