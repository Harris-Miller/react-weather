import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import noop from '../utils';

class SelectedCities extends Component {

  render() {

  }
}

SelectedCities.propTypes = {
  cities: ImmutablePropTypes.map.isRequiredm
  removeCity: PropTypes.func
};

SelectedCities.defaultTypes = {
  removeCity: noop
}

export default SelectedCities;
