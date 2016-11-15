# City Events Map Prototype

## Lesson 7

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

Now that have done the complicated Redux work, we will focus on displaying
the events in the *App* component.

**note:** While that Redux work was complicated this first time, as we
add more features to our application the additional Redux work follows
very repeatable patterns.

**Assignment (10 Min): Starting from the solution from the previous lesson;
connect the "App" component to the "events" Redux implementation by
updating the file "App.js" in "src" to:**

```
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromEvents from './ducks/events';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>Hello World</div>
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
```

Using *React Developer Tools* one can inspect the properties
being passed into the *App* component.

Next, we will use the properties in the *App* component.

**Assignment (5 Min): Add the following method (before *render*) to the "App"
component to populate the store with the mock data.**

```
componentDidMount() {
  const { fetchEvents } = this.props;
  fetchEvents();
}
```

Again, use *React Developer Tools* one can inspect the properties
being passed into the *App* component. *Redux DevTools* can be used
to inspect the actions.

**Assignment (5 Min): To show the loading / failed messages,
update the "render" method of the "App.js" file in the "src" folder to:**

```
render() {
  const { fetchEventsErrorMessage, isFetchingEvents } = this.props;
  const visibility = (isFetchingEvents ||
    fetchEventsErrorMessage !== null) ? 'hidden' : 'visible';
  return (
    <div id="container">
      { isFetchingEvents && <div>Loading...</div> }
      { fetchEventsErrorMessage !== null && <div>Failed...</div> }
      <div style={{visibility}}>Hello World</div>
    </div>
  );
}
```

One problem with this implementation is that when the *App* component
first loads, *events* is an empty array and *isFetchingEvents* is *false*.
To prevent rending on the first load, we will use the component's state
to delay showing the *Hello World* div until after new properties
are received.

**Assignment (5 Min): Update the "App.js" file in the "src" folder as follows:**

Add the following method before *componentDidMount*.

```
componentWillMount() {
  this.setState({ initialProps: true });
}
```

Add the following method after *componentDidMount*.

```
componentWillReceiveProps() {
  this.setState({ initialProps: false });
}
```

Add the following to the top of the *render* method:

```
const { initialProps } = this.state;
```

and update the *visibility* statement to as follows:

```
const visibility = (initialProps || isFetchingEvents ||
  fetchEventsErrorMessage !== null) ? 'hidden' : 'visible';
```

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
