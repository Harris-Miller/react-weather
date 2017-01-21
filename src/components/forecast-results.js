import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleDayForecast from './single-day-forecast';

class ForecastResults extends Component {
  getForecasts() {
    return this.props.forecasts.toJS();
  }

  mapForecasts(exp) {
    const forecasts = this.getForecasts();
    return Object.keys(forecasts).filter(zmw => forecasts[zmw]).map(zmw => exp([zmw, forecasts[zmw]]));
  }

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
        {this.mapForecasts(([zmw, forecast]) => (
          <Row key={zmw}>
            <Col md={2}>{forecast.location.city}, {forecast.location.state}</Col>
            {forecast.forecast.simpleforecast.forecastday.map(forecastday => (
              <Col md={2} key={forecastday.date.epoch}>
                <SingleDayForecast forecast={forecastday} display={this.props.display} />
              </Col>
            ))}
            <Col md={2}>
              <a onClick={e => this.removeForecast(e, zmw)}>Remove</a>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

ForecastResults.PropTypes = {
  forecasts: ImmutablePropTypes.map.isRequired,
  display: PropTypes.string.isRequired,
  removeForecast: PropTypes.func
};

export default ForecastResults;
