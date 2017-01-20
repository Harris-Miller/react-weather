import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ForecastResults extends Component {
  getForecasts() {
    return this.props.forecasts.toJS();
  }

  mapForecasts(exp) {
    const forecasts = this.getForecasts();
    return Object.keys(forecasts).filter(zmv => forecasts[zmv]).map(zmv => exp([zmv, forecasts[zmv]]));
  }

  // normally, I'd map the JSON return for forecast
  // into an object and do most of these calculations a head of time
  // but for the sake of time, I'm not going to write that function
  render() {
    return (
      <ul>
        {this.mapForecasts(([zmv, forecast]) => (
          <li key={zmv}>
            <div>{forecast.location.city}, {forecast.location.state}</div>
          </li>
        ))}
      </ul>
    );
  }
}

ForecastResults.PropTypes = {
  forecasts: ImmutablePropTypes.map.isRequired,
  display: PropTypes.string.isRequired
};

export default ForecastResults;
