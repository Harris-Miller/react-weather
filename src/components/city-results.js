import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';


class CityResults extends Component {
  constructor() {
    super();

    this.selectCity = (e, city) => {
      e.preventDefault();
      this.props.selectCity(city);
    }
  }

  render() {
    return (
      <ul>
        {
          this.props.cityResults.map(city => (
            <li>
              <a onClick={e => this.selectCity(e, city)}>{city.name}</a>
            </li>
          ))
        }
      </ul>
    );
  }
}

CityResults.PropTypes = {
  cityResults: ImmutablePropTypes.list.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CityResults;
