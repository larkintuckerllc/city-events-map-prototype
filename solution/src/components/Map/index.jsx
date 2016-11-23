import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from '../../ducks/events';
import * as fromTime from '../../ducks/time';
import Display from './Display';
import Time from './Time';
import style from'./index.css';

class Map extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.initMap = this.initMap.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }
  componentWillMount() {
    this.markers = [];
    this.map = null;
    this.infoWindow = null;
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
      const marker = this.markers[i];
      window.google.maps.event.clearInstanceListeners(marker);
      marker.setMap(null);
    }
    this.infoWindow = null;
    this.map = null;
  }
  handleClick(event, marker) {
    const start = event.start;
    const startHour = start === 0 ? 12 : (start < 13 ? start : start - 12);
    const startPeriod = start < 12 ? 'AM' : 'PM';
    const end = event.end;
    const endHour = end === 0 ? 12 : (end < 13 ? end : end - 12);
    const endPeriod = end < 12 ? 'AM' : 'PM';
    this.infoWindow.setContent([
      `<div><b>${event.name}</b></div>`,
      `<div><b>Start:</b> ${startHour} ${startPeriod}</div>`,
      `<div><b>End:</b> ${endHour} ${endPeriod}</div>`,
      `<div><b><a href="${event.url}" target="_blank">Details</a></b></div>`,
    ].join('\n'));
    this.infoWindow.open(this.map, marker);
  }
  initMap() {
    const mapEl = document.getElementById(style.rootMap);
    this.map = new window.google.maps.Map(mapEl, {
      zoom: 16,
      center: { lat: 29.650134, lng: -82.335046 },
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      }
    });
    this.infoWindow = new window.google.maps.InfoWindow({
      maxWidth: 200,
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
        marker.addListener('click', () => this.handleClick(event, marker));
        marker.id = event.id;
        this.markers.push(marker);
      }
    }
    for (let i = this.markers.length - 1; i >= 0; i--) {
      const marker = this.markers[i];
      if (currentEvents.find(o => o.id === marker.id) === undefined) {
        window.google.maps.event.clearInstanceListeners(marker);
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
      <div id={style.root}>
        <div id={style.rootMap} />
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
