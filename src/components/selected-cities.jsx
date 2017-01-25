import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Badge, Glyphicon } from 'react-bootstrap';
import noop from '../utils';

class SelectedCities extends Component {
  getCities() {
    return this.props.cities.toJS();
  }

  mapCities(exp) {
    const cities = this.getCities();
    return Object.keys(cities).map(zmw => exp([zmw, cities[zmw]]));
  }

  removeCity(zwm) {
    this.props.removeCity(zwm);
  }

  render() {
    return (
      <div>
        {this.mapCities(([zmw, city]) => (
          <Button key={zmw} bsStyle="primary" onClick={() => this.removeCity(zmw)}>
            {city.location.city}, {city.location.state} <Badge><Glyphicon glyph="remove" /></Badge>
          </Button>
        ))}
      </div>
    );
  }
}

SelectedCities.propTypes = {
  cities: ImmutablePropTypes.map.isRequired,
  removeCity: PropTypes.func
};

SelectedCities.defaultTypes = {
  removeCity: noop
}

export default SelectedCities;
