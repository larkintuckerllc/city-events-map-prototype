import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from '../../ducks/events';
import * as fromTime from '../../ducks/time';
import Display from './Display';
import Time from './Time';
import './index.css';

class Map extends Component {
  constructor() {
    super();
    this.initMap = this.initMap.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }
  componentWillMount() {
    this.markers = [];
    this.map = null;
  }
  componentDidMount() {
    window.initMap = this.initMap;
    if (!window.google) {
      const scriptEl = document.createElement('script');
      scriptEl.setAttribute('async', true);
      scriptEl.setAttribute('src',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGQ5X1QBHNCiX9A2P5XCl69uCLS0W5fTw&callback=initMap');
      document.body.appendChild(scriptEl);
    }
  }
  componentWillUnmount() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.map = null;
  }
  initMap() {
    const mapEl = document.getElementById('map_root__map');
    this.map = new window.google.maps.Map(mapEl, {
      zoom: 16,
      center: { lat: 29.650134, lng: -82.335046 },
      disableDefaultUI: true,
      zoomControl: true,
    });
    this.updateMarkers();
  }
  updateMarkers() {
    const { events, time } = this.props;
    const currentEvents = [];
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.start <= time && event.end >= time) {
        currentEvents.push(event);
      }
    }
    for (let i = 0; i < currentEvents.length; i++) {
      const event = currentEvents[i];
      if (this.markers.find(o => o.id === event.id) === undefined) {
        const marker = new window.google.maps.Marker({
          position: {
            lat: event.lat,
            lng: event.lng,
          },
          map: this.map,
        });
        marker.id = event.id;
        this.markers.push(marker);
      }
    }
    for (let i = this.markers.length - 1; i >= 0; i--) {
      const marker = this.markers[i];
      if (currentEvents.find(o => o.id === marker.id) === undefined) {
        marker.setMap(null);
        this.markers.splice(i, 1);
      }
    }
  }
  render() {
    const { setTime, time } = this.props;
    if (this.map !== null) {
      this.updateMarkers();
    }
    return (
      <div id="map_root">
        <div id="map_root__map" />
        <Display time={time} />
        <Time setTime={setTime} time={time} />
      </div>
    );
  }
}
Map.propTypes = {
  events: PropTypes.array.isRequired,
  setTime: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
export default connect(
  (state) => ({
    events: fromEvents.getEvents(state),
    time: fromTime.getTime(state),
  }),
  {
    setTime: fromTime.setTime,
  }
)(Map);
