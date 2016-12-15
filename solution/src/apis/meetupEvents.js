import jsonp from 'jsonp-promise';
import { ServerException } from '../util/exceptions';

const FIND_EVENTS_GAINESVILLE_ENDPOINT =
  'https://api.meetup.com/find/events?photo-host=public&sig_id=76796872&lon=-82.325029&lat=29.651020&sig=58a22f934f91330d4279ccbebcc9c7b67a0f1496';
// eslint-disable-next-line
export const getMeetupEvents = () => {
  return jsonp(FIND_EVENTS_GAINESVILLE_ENDPOINT)
    .promise
    .then(
      (response) => {
        const events = [];
        for (let i = 0; i < response.data.length; i += 1) {
          const meetupEvent = response.data[i];
          if (
            meetupEvent.time !== undefined &&
            meetupEvent.venue !== undefined
            && meetupEvent.venue.lat !== undefined
          ) {
            events.push({
              id: meetupEvent.id,
              name: meetupEvent.name,
              url: meetupEvent.link,
              start: meetupEvent.time,
              lat: meetupEvent.venue.lat,
              lng: meetupEvent.venue.lon,
            });
          }
        }
        return events;
      },
      (error) => {
        throw new ServerException(error.message);
      },
    );
};
