import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

class CitySelector extends Component {
  constructor(props) {
    super(props);

    this.selectCity = this.selectCity.bind(this);

    this.state = {
      data: []
    }
  }

  selectCity([selection]) {
    this.props.selectCity(selection.id);
    this.setState({ data: [] });
  }

  componentWillReceiveProps(nextProps) {
    // we need to re-create the array every time the props.searchResults change
    if (!this.props.searchResults.equals(nextProps.searchResults)) {
      this.setState({
        data: this.props.searchResults.map(city => ({
          id: city.zmw, label: city.name
        })).valueSeq().toJS()
      });
    }
  }

  render() {
    return (
      <div>
        <Typeahead
          bsSize="lg"
          placeholder="Search for a city..."
          onInputChange={this.props.onChange}
          onChange={this.selectCity}
          options={this.state.data}
        />
      </div>
    );
  }
}

CitySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchResults: ImmutablePropTypes.map.isRequired,
};

export default CitySelector;
