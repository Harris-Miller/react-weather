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
  constructor(props, context) {
    super(props, context);
    this.config = Object.assign({}, configConstants);
    // this.assignTestData();
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

  getChart() {
    return this.refs.chart.getChart();
  }

  componentDidMount() {
    this.setYAxisTitle(this.props);
  }

  setYAxisTitle(props) {
    this.getChart().yAxis[0].update({ title: { text: `Temperature ${props.display === 'F' ? '°F' : '°C'}` } }, true);
  }

  buildDateFromFCTTime(FCTTIME) {
    // new Date(year, month[, date[, hours[, minutes[, seconds[, milliseconds]]]]]);
    return Date.UTC(
      +FCTTIME.year,
      (+FCTTIME.mon) - 1,
      +FCTTIME.mday,
      (+FCTTIME.hour)
    );
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
        data: forecast.hourly_forecast.map(hourly => [this.buildDateFromFCTTime(hourly.FCTTIME), props.display === 'F' ? +hourly.temp.english : +hourly.temp.metric])
      };
      chart.addSeries(newSeries, false);
    });

    chart.redraw();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.forecasts.equals(this.props.forecasts)) {
      this.refreshSeries(nextProps);
    }

    if (nextProps.display !== this.props.display) {
      this.setYAxisTitle(nextProps);
      this.refreshSeries(nextProps);
    }
  }

  render() {
    return (
      <div>
        <ReactHighcharts config={this.config} ref="chart" neverReflow={true}></ReactHighcharts>
      </div>
    );
  }
}

ForecastChart.PropTypes = {
  forecasts: ImmutablePropTypes.map.isRequired,
  display: PropTypes.string.isRequired
};

export default ForecastChart;
