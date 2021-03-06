import React, { Component, PropTypes } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleDayForecast from './single-day-forecast';
import noop from '../utils';

class ForecastResults extends Component {
  static propTypes = {
    forecasts: ImmutablePropTypes.map.isRequired,
    display: PropTypes.string.isRequired,
    removeForecast: PropTypes.func
  };

  static defaultProps = {
    removeForecast: noop
  };

  removeForecast(e, zmw) {
    e.preventDefault();
    this.props.removeForecast(zmw);
  }

  // normally, I'd map the JSON return for forecast
  // into an object and do most of these calculations a head of time
  // but for the sake of time, I'm not going to write that function
  render() {
    return (
      <div>
        {this.props.forecasts.entrySeq().toArray().map(([zmw, forecast]) => (
          <Panel key={zmw}>
            <Row>
              <Col md={2}>{forecast.location.city}, {forecast.location.state}</Col>
              {forecast.forecast.simpleforecast.forecastday.map(forecastday => (
                <Col md={2} key={forecastday.date.epoch}>
                  <SingleDayForecast forecast={forecastday} display={this.props.display} />
                </Col>
              ))}
              <Col md={2}>
                <button onClick={e => this.removeForecast(e, zmw)}>Remove</button>
              </Col>
            </Row>
          </Panel>
        ))}
      </div>
    );
  }
}

export default ForecastResults;
