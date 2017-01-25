import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Card } from 'material-ui';

class CityResults extends Component {
  constructor(props, context) {
    super(props, context);

    this.selectCity = (e, city) => {
      e.preventDefault();
      this.props.selectCity(city.zmw);
    };
  }

  render() {
    return (
      <Card>
        <h3>Results will display below<br/><small>(click to display forecast)</small></h3>
        <ul>
          {this.props.cityResults.map(city => (
            <li key={city.zmw}>
              <a onClick={e => this.selectCity(e, city)}>{city.name}</a>
            </li>
          )).valueSeq()}
        </ul>
      </Card>
    );
  }
}

CityResults.PropTypes = {
  cityResults: ImmutablePropTypes.list.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CityResults;
