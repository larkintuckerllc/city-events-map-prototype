const fakeDatabase = {
  collection: [{
    id: 0,
    name: 'Code for Gainesville',
    start: 0,
    end: 0,
    lat: 29.649062,
    lng: -82.331487,
  }, {
    id: 1,
    name: 'Infinity Hall Event',
    start: 0,
    end: 0,
    lat: 29.650661,
    lng: -82.334829,
  }],
};
const delay = (ms) =>
  new Promise(resolve => window.setTimeout(resolve, ms));
// eslint-disable-next-line
export const getEvents = () =>
  delay(2000).then(() =>
    fakeDatabase.collection.map(o => ({ ...o }))
  );
