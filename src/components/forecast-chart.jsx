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
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: true
    }
  },
  xAxis: {
    title: 'Hour',
    type: 'datetime'
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%b %a %e %I %p} :: {point.y}°'
  }
};

class ForecastChart extends Component {
  static propTypes = {
    forecasts: ImmutablePropTypes.map.isRequired,
    display: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.config = { ...configConstants };
    // this.assignTestData();
  }

  componentDidMount() {
    this.setYAxisTitle(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.forecasts.equals(this.props.forecasts)) { // eslint-disable-line react/prop-types
      this.refreshSeries(nextProps);
    }

    if (nextProps.display !== this.props.display) {
      this.setYAxisTitle(nextProps);
      this.refreshSeries(nextProps);
    }
  }

  setYAxisTitle(props) {
    this.getChart().yAxis[0].update({ title: { text: `Temperature ${props.display === 'F' ? '°F' : '°C'}` } }, true);
  }

  getChart() {
    return this.chart.getChart();
  }

  assignTestData() {
    Object.assign(this.config, {
      yAxis: {
        title: {
          text: 'This will be replaced'
        }
      },
      series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
    });
  }

  removeAllSeries() {
    const chart = this.getChart();
    while (chart.series.length) {
      chart.series[0].remove(false);
    }
  }

  refreshSeries(props) {
    const chart = this.getChart();

    // frist, remove all existing series, as we want to redraw them
    this.removeAllSeries();

    props.forecasts.forEach(forecast => {
      const newSeries = {
        name: `${forecast.location.city}, ${forecast.location.state}`,
        data: forecast.hourly_forecast.map(hourly => [hourly.FCTTIME.epoch * 1000, props.display === 'F' ? +hourly.temp.english : +hourly.temp.metric])
      };
      chart.addSeries(newSeries, false);
    });

    chart.redraw();
  }

  render() {
    return (
      <div>
        <ReactHighcharts config={this.config} ref={node => this.chart = node} neverReflow />
      </div>
    );
  }
}

export default ForecastChart;
