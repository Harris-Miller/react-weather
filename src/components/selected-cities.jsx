import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Badge, Glyphicon, Panel } from 'react-bootstrap';
import noop from '../utils';

class SelectedCities extends Component {
  static propTypes = {
    cities: ImmutablePropTypes.map.isRequired,
    removeCity: PropTypes.func
  };

  static defaultProps = {
    removeCity: noop
  };

  removeCity(zwm) {
    this.props.removeCity(zwm);
  }

  render() {
    return (
      <div>
        {this.props.cities.size ? <Panel>
          <h3>Selected Cities</h3>
          {this.props.cities.entrySeq().toArray().map(([zmw, city]) => (
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

export default SelectedCities;
