import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from './ducks/events';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.setState({ initialProps: true });
  }
  componentDidMount() {
    const { fetchEvents } = this.props;
    fetchEvents();
  }
  componentWillReceiveProps() {
    this.setState({ initialProps: false });
  }
  render() {
    const { initialProps } = this.state;
    const { fetchEventsErrorMessage, isFetchingEvents } = this.props;
    const visibility = (initialProps || isFetchingEvents ||
      fetchEventsErrorMessage !== null) ? 'hidden' : 'visible';
    return (
      <div id="container">
        { isFetchingEvents && <div>Loading...</div> }
        { fetchEventsErrorMessage !== null && <div>Failed...</div> }
        <div style={{visibility}}>Hello World</div>
      </div>
    );
  }
}
App.propTypes = {
  events: PropTypes.array.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsErrorMessage: PropTypes.string,
  isFetchingEvents: PropTypes.bool.isRequired,
};
export default connect(
  (state) => ({
    events: fromEvents.getEvents(state),
    fetchEventsErrorMessage: fromEvents.getFetchEventsErrorMessage(state),
    isFetchingEvents: fromEvents.getIsFetchingEvents(state),
  }),
  {
    fetchEvents: fromEvents.fetchEvents,
  }
)(App);
