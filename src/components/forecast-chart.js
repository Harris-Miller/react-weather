import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactHighcharts from 'react-highcharts';

const configConstants = {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Hourly Temperature'
  },
  subtitle: {
    text: 'Source: wunderground.com'
  }
};

class HighLowChart extends Component {
  constructor() {
    super();

    this.config = {};
    this.setHasData();
  }

  setHasData(props = { forecasts: {} }) {
    this.hasData = !!props.forecasts.size;
  }

  generateYAxisConfig() {
    const display = this.props.display;
    return {
      yAxis: {
        title: {
          text: `Temperature ${display === 'F' ? '°F' : '°C'}`
        }
      }
    };
  }

  setConfig() {
    const config = Object.assign({}, configConstants, this.generateYAxisConfig());

    // temp
    Object.assign(config, {
      xAxis: {
        categories: ['Fri', 'Sat', 'Sun', 'Mon']
      },
      series: [{
        data: [54, 43, 46, 55]
      }, {
        data: [25, 26, 29, 28]
      }]
    });

    this.config = config;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.forecasts.toJS());
    if (!nextProps.forecasts.equals(this.props.forecasts)) {
      this.setHasData(nextProps);
      this.setConfig();
    }
  }

  render() {
    return (
      <div>
        {this.hasData && <ReactHighcharts config={this.config} />}
      </div>
    );
  }
};

HighLowChart.PropTypes = {
  forecasts: ImmutablePropTypes.map.isRequired,
  display: PropTypes.string.isRequired,
};

export default HighLowChart;
