import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updatingSearchText, searchCity, fetchForecast, removeForecast, updateTempDisplay } from '../actions';
import { mapStateToProps } from '../reducers';
import Navbar from '../components/navbar';
import SelectedCities from '../components/selected-cities';
import CitySelector from '../components/city-selector';
import ForecastResults from '../components/forecast-results';
import ForecastChart from '../components/forecast-chart';
import { throttle } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.changeTempDisplay = this.changeTempDisplay.bind(this);
    this.onCitySelectChange = this.onCitySelectChange.bind(this);
    this.fetchForecast = this.fetchForecast.bind(this);
    this.removeForecast = this.removeForecast.bind(this);

    this.throttledSearchResponse = throttle(value => {
      this.props.dispatch(updatingSearchText(value));
    }, 600);
  }

  onCitySelectChange(value) {
    this.throttledSearchResponse(value);
  }

  fetchForecast(zmw) {
    // only if Forecast has not yet been fetched
    if (!this.props.selectedCities.has(zmw)) {
      this.props.dispatch(fetchForecast(zmw));
    }
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

    // if (!nextProps.selectedCities.equals(this.props.selectedCities)) {
    //   const { dispatch, selectedCities } = nextProps;
    //   dispatch(fetchForecast(selectedCities));
    // }
  }

  render() {
    return (
      <div>
        <Navbar display={this.props.display} changeTempDisplay={this.changeTempDisplay} />
        <Grid>
          <Row>
            <Col md={12}>
              <SelectedCities cities={this.props.selectedCities} removeCity={this.removeForecast} />
            </Col>
          </Row>
          <Row>
            {this.props.children}
          </Row>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={4} mdPush={4}>
                  <CitySelector onChange={this.onCitySelectChange} searchResults={this.props.citySearchResults} selectCity={this.fetchForecast} />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ForecastResults forecasts={this.props.selectedCities} display={this.props.display} removeForecast={this.removeForecast} />
                </Col>
              </Row>
              {/*<Row>
                <Col md={12}>
                  <ForecastChart forecasts={this.props.selectedCities} display={this.props.display} />
                </Col>
              </Row>*/}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
