import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromCounter from './counter.js';
import './App.css';

class App extends Component {
  render() {
    const { counter, increment } = this.props;
    return (
      <div>
        <div>{counter}</div>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }
}
App.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
}
export default connect(
  (state) => ({
    counter: fromCounter.getCounter(state),
  }),
  {
    increment: fromCounter.increment,
  }
)(App);
