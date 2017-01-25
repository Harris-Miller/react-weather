import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Badge, Glyphicon, Panel } from 'react-bootstrap';
import noop from '../utils';

class SelectedCities extends Component {

  mapCities(exp) {
    return this.props.cities.entrySeq().toArray().map(exp);
  }

  removeCity(zwm) {
    this.props.removeCity(zwm);
  }

  render() {
    return (
      <div>
        {this.props.cities.size ? <Panel>
          <h3>Selected Cities</h3>
          {this.mapCities(([zmw, city]) => (
            <span key={zmw}>
              <Button bsStyle="primary" onClick={() => this.removeCity(zmw)}>
                {city.location.city}, {city.location.state} <Badge><Glyphicon glyph="remove" /></Badge>
              </Button>
              <span>&nbsp;</span>
            </span>
          ))}
        </Panel> : ''}
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
};

export default SelectedCities;
