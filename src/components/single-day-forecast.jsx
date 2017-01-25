import React, { Component, PropTypes } from 'react';

class SingleDayForcast extends Component {
  render() {
    const date = this.props.forecast.date;
    const high = this.props.display === 'F' ? this.props.forecast.high.fahrenheit : this.props.forecast.high.celsius;
    const low = this.props.display === 'F' ? this.props.forecast.low.fahrenheit : this.props.forecast.low.celsius;
    const conditions = this.props.forecast.conditions;
    const degreeSymbol = this.props.display === 'F' ? '°F' : '°C';

    return (
      <div>
        <div className="text-center">{date.weekday_short} {date.month} / {date.day}</div>
        <div className="text-center">
          <span className="temp-high">{high} {degreeSymbol}</span> | <span className="temp-low">{low} {degreeSymbol}</span>
        </div>
        <div className="text-center"><img src={this.props.forecast.icon_url} /></div>
        <div className="text-center">{conditions}</div>
      </div>
    );
  }
}

SingleDayForcast.PropTypes = {
  forecast: PropTypes.object.isRequired,
  display: PropTypes.string.isRequired,
  removeCity: PropTypes.func
};

export default SingleDayForcast;
