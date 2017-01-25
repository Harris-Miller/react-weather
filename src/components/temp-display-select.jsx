import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class TempDisplaySelect extends Component {

  isFahrenheit() {
    return this.props.display === 'F';
  }

  changeTempDisplay(e) {
    this.props.changeTempDisplay(e.target.value);
  }

  render() {
    return (
      <div>
        <Button onClick={e => this.changeTempDisplay(e)} value="F" bsStyle={this.isFahrenheit() ? 'primary' : 'default'}>Fahrenheit</Button>
        <Button onClick={e => this.changeTempDisplay(e)} value="C" bsStyle={!this.isFahrenheit() ? 'primary' : 'default'}>Celsuis</Button>
      </div>
    );
  }
}

TempDisplaySelect.PropTypes = {
  display: PropTypes.string.isRequired,
  changeTempDisplay: PropTypes.func
};

TempDisplaySelect.defaultProps = {
  display: 'F'
};

export default TempDisplaySelect;
