import React, { Component, PropTypes } from 'react';

class SingleDayForcast extends Component {

  getDate() {
    return this.props.forecast.date;
  }

  getHigh() {
    return this.props.display === 'F' ? this.props.forecast.high.fahrenheit : this.props.forecast.high.celsius;
  }

  getLow() {
    return this.props.display === 'F' ? this.props.forecast.low.fahrenheit : this.props.forecast.low.celsius;
  }

  getConditions() {
    return this.props.forecast.conditions;
  }

  getDegreeSymbol() {
    return this.props.display === 'F' ? 'F°' : '°C';
  }

  render() {
    return (
      <div>
        <div>{this.getDate().weekday_short} {this.getDate().month} / {this.getDate().day}</div>
        <div>{this.getHigh()} {this.getDegreeSymbol()} | {this.getLow()} {this.getDegreeSymbol()}</div>
        <div><img src={this.props.forecast.icon_url} /></div>
        <div>{this.getConditions}</div>
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
