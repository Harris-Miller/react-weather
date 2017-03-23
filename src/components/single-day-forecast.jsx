import React, { PropTypes } from 'react';

const SingleDayForcast = ({ forecast, display }) => {
  const date = forecast.date;
  const high = display === 'F' ? forecast.high.fahrenheit : forecast.high.celsius;
  const low = display === 'F' ? forecast.low.fahrenheit : forecast.low.celsius;
  const conditions = forecast.conditions;
  const degreeSymbol = display === 'F' ? '°F' : '°C';

  return (
    <div>
      <div className="text-center">{date.weekday_short} {date.month} / {date.day}</div>
      <div className="text-center">
        <span className="temp-high">{high} {degreeSymbol}</span> | <span className="temp-low">{low} {degreeSymbol}</span>
      </div>
      <div className="text-center"><img src={forecast.icon_url} alt="forecast icon" /></div>
      <div className="text-center">{conditions}</div>
    </div>
  );
};

SingleDayForcast.propTypes = {
  forecast: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  display: PropTypes.string.isRequired
};

export default SingleDayForcast;
