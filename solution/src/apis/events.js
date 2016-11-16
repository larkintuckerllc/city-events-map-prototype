const fakeDatabase = {
  collection: [{
    id: 0,
    name: 'Code for Gainesville',
    url: 'http://www.meetup.com/Code-for-Gainesville/',
    start: 18,
    end: 21,
    lat: 29.649062,
    lng: -82.331487,
  }, {
    id: 1,
    name: 'Infinity Hall Event',
    url: 'http://www.housing.ufl.edu/area/infinity-hall/',
    start: 16,
    end: 18,
    lat: 29.650661,
    lng: -82.334829,
  }, {
    id: 2,
    name: 'A Man Called Ove - Hippodrome Theatre',
    url: 'http://thehipp.org',
    start: 18,
    end: 20,
    lat: 29.649451,
    lng: -82.323950,
  }, {
    id: 3,
    name: 'Swing Theory (Come Dance!)',
    url: 'http://www.depotpark.org/',
    start: 17,
    end: 19,
    lat: 29.644754,
    lng:-82.323211,
  }],
};
const delay = (ms) =>
  new Promise(resolve => window.setTimeout(resolve, ms));
// eslint-disable-next-line
export const getEvents = () =>
  delay(2000).then(() =>
    fakeDatabase.collection.map(o => ({ ...o }))
  );
