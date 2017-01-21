import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updatingSearchText, searchCity, selectCity, fetchForecast, removeForecast, updateTempDisplay } from '../actions';
import CitySelector from './city-selector';
import CityResults from './city-results';
import ForecastResults from './forecast-results';
import TempDisplaySelect from './temp-display-select';
import { throttle } from 'lodash';
import immutable from 'immutable';

class App extends Component {
  constructor() {
    super();

    const throttledSearchResponse = throttle(value => {
      this.props.dispatch(updatingSearchText(value));
    }, 600);

    this.onCitySelectChange = value => {
      throttledSearchResponse(value);
    };
  }

  selectCity(city) {
    this.props.dispatch(selectCity(city));
  }

  removeForecast(zmw) {
    this.props.dispatch(removeForecast(zmw));
  }

  changeTempDisplay(display) {
    this.props.dispatch(updateTempDisplay(display));
  }

  componentWillReceiveProps(nextProps) {
    // there has got to be a better way to go about this
    if (nextProps.textToSearch !== this.props.textToSearch) {
      const { dispatch, textToSearch } = nextProps;
      dispatch(searchCity(textToSearch));
    }

    if (!nextProps.selectedCities.equals(this.props.selectedCities)) {
      const { dispatch, selectedCities } = nextProps;
      dispatch(fetchForecast(selectedCities));
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h1>Welcome to the Pairin Weather Search App!</h1>
            <h3>Do a search for your city below to view the weather!</h3>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={4}>
                <TempDisplaySelect display={this.props.display} changeTempDisplay={this.changeTempDisplay.bind(this)} />
              </Col>
              <Col md={4}>
                <CitySelector onChange={this.onCitySelectChange} />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <ForecastResults forecasts={this.props.selectedCities} display={this.props.display} removeForecast={this.removeForecast.bind(this)} />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
          {
            !!this.props.cityResults.size && <CityResults cityResults={this.props.cityResults} selectCity={this.selectCity.bind(this)} />
          }
        </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { searchByCity, forecast, displayTemp } = state;

  return {
    textToSearch: searchByCity.get('textToSearch') || '',
    cityResults: searchByCity.get('cityResults') || new immutable.List(),
    selectedCities: forecast.get('selectedCities') || new immutable.Map(),
    display: displayTemp.get('display')
  };
};

export default connect(mapStateToProps)(App);
