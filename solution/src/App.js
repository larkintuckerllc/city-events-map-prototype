import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from './ducks/events';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.initMap = this.initMap.bind(this);
  }
  componentWillMount() {
    this.setState({ initialProps: true });
  }
  componentDidMount() {
    const { fetchEvents } = this.props;
    fetchEvents();
    window.initMap = this.initMap;
    if (!window.google) {
      const scriptEl = document.createElement('script');
      scriptEl.setAttribute('async', true);
      scriptEl.setAttribute('src',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGQ5X1QBHNCiX9A2P5XCl69uCLS0W5fTw&callback=initMap');
      document.body.appendChild(scriptEl);
    }
  }
  componentWillReceiveProps() {
    this.setState({ initialProps: false });
  }
  componentWillUnmount() {
    this.map = null;
  }
  initMap() {
    const mapEl = document.getElementById('map');
    this.map = new window.google.maps.Map(mapEl, {
      zoom: 16,
      center: { lat: 29.650134, lng: -82.335046 },
      disableDefaultUI: true,
      zoomControl: true,
    });
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
        <div id="map" style={{visibility}} />
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
