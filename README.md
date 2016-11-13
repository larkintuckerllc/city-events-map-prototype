# City Events Map Prototype

## Lesson 5

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

Now that we have been introduced to all core concepts of the React / Redux
framework, we will begin to build out the "City Events Map Prototype"
application.

The application is designed to display city events (from an API) on a map
filtered by location and time. This lesson will focus on the getting
the data from the API into the Redux store.

The first step is to provide a mock API and a way to access it.

**Assignment (5 Min): Working from the solution from *Lesson 4* create
a folder called "apis" in the "src" folder with a file named "events.js"
in it with:**

```
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
```

With the API in place, we will build the Redux reducers, accessors, and
action creators that interact with the API.

**Assignment (5 Min): In the *solution* folder enter the commands:**

`npm install --save normalizr`

`npm install --save redux-thunk`

**note:** These modules are helpful with handling asynchronous APIs
that return arrays.

**Assignment (5 Min): Create a folder called "ducks" in the "src" folder
with a file named "events.js" in it with:**

**note:** At this point, we will focus on how to use this file rather than
the details of the implementation.

```
// TODO
```

// TODO: UPDATE index.js

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

Run the following command in the *solution* folder to download the
dependencies:

`npm install`

### Usage

To run the solution, use the command in the *solution* folder to build
and serve the application:

`npm run start`

and open web browser to the provided URL.
