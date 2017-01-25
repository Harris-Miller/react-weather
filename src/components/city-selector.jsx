import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const CitySelector = ({ onChange }) => (
  <form onSubmit={e => e.preventDefault()}>
    <FormGroup controlId="citySearch">
      <ControlLabel>Search for a City</ControlLabel>
      <FormControl
        type="text"
        placeholder="New York"
        onChange={e => onChange(e.target.value)}
      />
    </FormGroup>
  </form>
);

CitySelector.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default CitySelector;
