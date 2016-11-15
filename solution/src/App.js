import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from './ducks/events';
import * as fromTime from './ducks/time';
import Rcslider from 'rc-slider';
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
    const mapEl = document.getElementById('container__loaded__map');
    this.map = new window.google.maps.Map(mapEl, {
      zoom: 16,
      center: { lat: 29.650134, lng: -82.335046 },
      disableDefaultUI: true,
      zoomControl: true,
    });
  }
  render() {
    const { initialProps } = this.state;
    const { fetchEventsErrorMessage, isFetchingEvents, time } = this.props;
    const visibility = (initialProps || isFetchingEvents ||
      fetchEventsErrorMessage !== null) ? 'hidden' : 'visible';
    window.console.log(time);
    return (
      <div id="container">
        { isFetchingEvents && <div>Loading...</div> }
        { fetchEventsErrorMessage !== null && <div>Failed...</div> }
        <div id="container__loaded" style={{visibility}}>
          <div id="container__loaded__time">
            <Rcslider
              min={0}
              max={23}
              vertical={true}
              tipFormater={null}
              value={time}
            />
          </div>
          <div id="container__loaded__map" />
        </div>
      </div>
    );
  }
}
App.propTypes = {
  events: PropTypes.array.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsErrorMessage: PropTypes.string,
  isFetchingEvents: PropTypes.bool.isRequired,
  setTime: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
export default connect(
  (state) => ({
    events: fromEvents.getEvents(state),
    fetchEventsErrorMessage: fromEvents.getFetchEventsErrorMessage(state),
    isFetchingEvents: fromEvents.getIsFetchingEvents(state),
    time: fromTime.getTime(state),
  }),
  {
    fetchEvents: fromEvents.fetchEvents,
    setTime: fromTime.setTime,
  }
)(App);
