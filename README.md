# City Events Map Prototype

## Lesson 8

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

With the event information available in the *App* component, we
now integrate the Google Maps JavaScript API that we explored in
an earlier lesson.

One of the challenges of using the Google Maps JavaScript API is that
the interface to it is JavaScript, e.g., one creates and interacts with a
*Map* object. While this sort of interface is very different than the
more familiar React pattern (rendering JSX), React (with the component
lifecycle methods) handles it well.

First, we will do the more familiar work.

**Assignment (5 Min): Using the solution from the previous lesson,
Update the "index.css" file in the "src" folder to:**

```
html, body {
  margin: 0;
  height: 100%;
  padding: 0;
  font-family: sans-serif;
}
#root, #container, #map {
  height: 100%;
}
```

**Assignment (5 Min): Create a container for the map by updating
the "render" method in "App.js" file in the "src" folder as follows:**

Replace:

```
<div style={{visibility}}>Hello World</div>
```

with

```
<div id="map" style={{visibility}} />
```

Next we need to create the callback method (for the initial loading of
the Google API).

**Assignment (5 Min): Create Google API callback by updating
"App.js" file in the "src" folder as follows:**

Add the following method above the "render" method.

```
initMap() {
  const mapEl = document.getElementById('map');
  this.map = new window.google.maps.Map(mapEl, {
    zoom: 16,
    center: { lat: 29.650134, lng: -82.335046 },
    disableDefaultUI: true,
    zoomControl: true,
  });
}
```

Add the following constructor as the top of the *App* component:

```
constructor() {
  super();
  this.initMap = this.initMap.bind(this);
}
```

**note:** The pattern in this constructor is commonly used bind the
*this* value to the object; used when passing a method to other functions.

Finally, we need to load the Google API.

**Assignment (5 Min): Load the Google API by updating
"App.js" file in the "src" folder as follows:**

Add the following at the end of the *componentDidMount* method:

```
window.initMap = this.initMap;
if (!window.google) {
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('async', true);
  scriptEl.setAttribute('src',
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGQ5X1QBHNCiX9A2P5XCl69uCLS0W5fTw&callback=initMap');
  document.body.appendChild(scriptEl);
}
```

Add the following method after the *componentWillReceiveProps* method:

```
componentWillUnmount() {
  this.map = null;
}
```

At this point, we have integrated the Google Maps API into our React app.

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
