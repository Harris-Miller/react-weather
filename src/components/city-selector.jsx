import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const CitySelector = ({ onChange }) => (
  <div>
    {/*<form onSubmit={e => e.preventDefault()}>
        <FormGroup controlId="citySearch">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="New York"
              onChange={e => onChange(e.target.value)}
            />
            <InputGroup.Addon><Glyphicon glyph="search" /></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </form>*/}
    <Typeahead
      placeholder="Search for a city..."
      onInputChange={text => onChange(text)}
      options={[{ id: 1, label: 'foo' }, { id: 2, label: 'bar' }]}
    />
  </div>
);

CitySelector.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default CitySelector;
