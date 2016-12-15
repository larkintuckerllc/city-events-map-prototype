import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromDay from '../../ducks/day';
import * as fromEvents from '../../ducks/events';
import * as fromHour from '../../ducks/hour';
import Display from './Display';
import Time from './Time';
import style from './index.css';

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
    for (let i = 0; i < this.markers.length; i += 1) {
      const marker = this.markers[i];
      window.google.maps.event.clearInstanceListeners(marker);
      marker.setMap(null);
    }
    this.infoWindow = null;
    this.map = null;
  }
  handleClick(event, marker) {
    const startHour = (new Date(event.start)).getHours();
    let startClockHour;
    startClockHour = startHour;
    if (startHour === 0) {
      startClockHour = 12;
    } else if (startHour < 13) {
      startClockHour = startHour;
    } else {
      startClockHour = startHour - 12;
    }
    const startPeriod = startHour < 12 ? 'AM' : 'PM';
    this.infoWindow.setContent([
      `<div><b>${event.name}</b></div>`,
      `<div><b>Start:</b> ${startClockHour} ${startPeriod}</div>`,
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
      },
    });
    this.infoWindow = new window.google.maps.InfoWindow({
      maxWidth: 200,
    });
    this.updateMarkers();
  }
  updateMarkers() {
    const { day, events, hour } = this.props;
    const time = (new Date(day + (hour * 60 * 60 * 1000))).getTime();
    const currentEvents = [];
    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      if (event.start >= time && event.start < time + (60 * 60 * 1000)) {
        currentEvents.push(event);
      }
    }
    for (let i = 0; i < currentEvents.length; i += 1) {
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
    for (let i = this.markers.length - 1; i >= 0; i -= 1) {
      const marker = this.markers[i];
      if (currentEvents.find(o => o.id === marker.id) === undefined) {
        window.google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
        this.markers.splice(i, 1);
      }
    }
  }
  render() {
    const { setHour, hour } = this.props;
    if (this.map !== null) {
      this.updateMarkers();
    }
    return (
      <div id={style.root}>
        <div id={style.rootMap} />
        <Display hour={hour} />
        <Time setHour={setHour} hour={hour} />
      </div>
    );
  }
}
Map.propTypes = {
  day: PropTypes.number.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  setHour: PropTypes.func.isRequired,
  hour: PropTypes.number.isRequired,
};
export default connect(
  state => ({
    day: fromDay.getDay(state),
    events: fromEvents.getEvents(state),
    hour: fromHour.getHour(state),
  }),
  {
    setHour: fromHour.setHour,
  },
)(Map);
