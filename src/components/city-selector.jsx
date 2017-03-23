import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Typeahead } from 'react-bootstrap-typeahead';

class CitySelector extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    searchResults: ImmutablePropTypes.list.isRequired,
    selectCity: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
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

  selectCity = ([selection]) => {
    this.props.selectCity(selection.id);
    this.setState({ data: [] });
  };

  // the Typeahead compnent is not that great, doesn't work the way I want it too
  // going to leave it in for now while I complete other parts of the site
  // will come back to looking into replacing it with a better functioning component
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

export default CitySelector;
