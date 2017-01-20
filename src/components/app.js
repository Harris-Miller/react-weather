import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updatingSearchText, searchCity, foundCity, selectCity, fetchForecast } from '../actions';
import CitySelector from './city-selector';
import CityResults from './city-results';
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

    this.selectCity = city => {
      this.props.dispatch(foundCity([])); // to clear the search results
      this.props.dispatch(selectCity(city));
    }
  }

  componentWillReceiveProps(nextProps) {
    // there as got to be a better way to go about this
    if (nextProps.textToSearch !== this.props.textToSearch) {
      const { dispatch, textToSearch } = nextProps;
      dispatch(searchCity(textToSearch));
    }

    if (!nextProps.selectedCities.equals(this.props.selectedCities)) {
      console.log(nextProps.selectedCities);
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <h1>Welcome to the Pairin Weather Search App!</h1>
            <h3>Do a search for your city below to view the weather!</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <CitySelector onChange={this.onCitySelectChange} />
            <span>{this.props.textToSearch}</span>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            {
              !!this.props.cityResults.size && <CityResults cityResults={this.props.cityResults} selectCity={this.selectCity} />
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { searchByCity } = state;

  return {
    textToSearch: searchByCity.textToSearch || '',
    isFetchingCitySearch: searchByCity.isFetching || false,
    cityResults: new immutable.List(searchByCity.cityResults || []),
    selectedCities: new immutable.List()
  };
};

export default connect(mapStateToProps)(App);
