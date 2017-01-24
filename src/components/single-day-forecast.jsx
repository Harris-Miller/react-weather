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

  // this chould work, but for whatever reason doesn't!!
  // when called, `this` is undefined, that shouldn't be the case, but it is
  // get conditions() {
  //   return this.props.forecast.conditions;
  // }

  getConditions() {
    return this.props.forecast.conditions;
  }

  getDegreeSymbol() {
    return this.props.display === 'F' ? '°F' : '°C';
  }

  render() {
    return (
      <div>
        <div>{this.getDate().weekday_short} {this.getDate().month} / {this.getDate().day}</div>
        <div>
          <span className="temp-high">{this.getHigh()} {this.getDegreeSymbol()}</span> | <span className="temp-low">{this.getLow()} {this.getDegreeSymbol()}</span>
        </div>
        <div><img src={this.props.forecast.icon_url} /></div>
        <div>{this.getConditions()}</div>
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
