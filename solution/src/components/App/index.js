import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from '../../ducks/events';
import Map from '../Map';

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
    if (initialProps) return null;
    if (isFetchingEvents) return <div>Loading...</div>;
    if (fetchEventsErrorMessage !== null) return <div>Failed.</div>;
    return <Map />;
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
