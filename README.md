# City Events Map Prototype

## Lesson 5

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

Now that we have some familiarity with React and how to develop
(build) it locally, we need to get up to speed with Redux. Again, Redux,
is a popular implementation of the Flux architecture that is often paired
with React to form a complete application framework.

**note:** It is important to note that React does not require
Redux; nor does Redux require React.

**Assignment (1 Hr): Read through the following tutorial; ensure that one
has a theoretical understanding of the key concepts (action creator,
reducer, and store); one need NOT be focused on implementation details:**

https://www.codementor.io/reactjs/tutorial/intro-to-react-redux-pros

With a theoretical understanding of Redux, we will build a simple applications
that increments a counter that illustrates the the concepts in action.

**Assignment (10 Min): If one does not have a good JavaScript editor,
install Atom.**

https://atom.io

**Assignment (5 Min): Using the following commands, create a new
React application and start it:**

`create-react-app solution`

Go into the folder *solution* and:

`npm run start`

**Assignment (5 Min): Simplify the implementation to a "hello world"
application as follows:**

In the *src* folder edit the *App.js* file replacing the *return*
value of the *render* method to:

```
<div>Hello World</div>
```

and removing the line:

```
import logo from './logo.svg';
```

In the *src* folder, remove the contents of the *App.css* file and
delete the *logo.svg* file.

**note:** The browser window will automatically reload as one saves
changes to files.

**Assignment (5 Min): Install the Redux modules with the following commands
from within the "solution" folder:**

`npm install --save redux`

`npm install --save react-redux`

**Assignment (5 Min): Create the "counter" reducer, accessor, and action
creator by creating a file "counter.js" in "src" as follows:**

```
// REDUCER
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};
// ACCESSOR
export const getCounter = (state) => state;
// ACTION CREATOR
export const increment = () => ({
  type: 'INCREMENT'
});
```

**note:** The typical way the above code gets used is: A component will
use the accessor to obtain the value of the counter. It will
use the action creator to initiate the increment action. Redux will use
the reducer to update the value of the counter.

**Assignment (5 Min): Implement Redux (with the counter) in application by
updating the "index.js" file in "src" to be as follows:**

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from './counter';
import App from './App';
import './index.css';

const store = createStore(counter);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

**Assignment (5 Min): Connect the "App" component to Redux
(and in particular the counter) by updating the "App.js" file in "src"
to be as follows:**

```
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as fromCounter from './counter.js';
import './App.css';

class App extends Component {
  render() {
    const { counter, increment } = this.props;
    return (
      <div>
        <div>{counter}</div>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }
}
App.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
}
export default connect(
  (state) => ({
    counter: fromCounter.getCounter(state),
  }),
  {
    increment: fromCounter.increment,
  }
)(App);
```

**note:** At this point, the *App* component will render the
current value of the counter (0) and the button will
increment the value by one.

At the surface, this all seems like a lot of boilerplate code to simply
increment a counter on a screen; this could have been done in
a couple of lines of plain JavaScript (aka. vanillaJS).

The big win, however, comes as applications get more complex
and data needs to be accessed or updated from multiple
parts of the application.

One interesting and incredibly helpful tool for developing with Redux is a
Chrome extension called *Redux DevTools*; to a lessor extent the Chrome
extension *React Developer Tools* is helpful for developing with React.

**Assignment (5 Min): Install "Redux DevTools" and "React Developer Tools"
into Chrome browser**

Without any additional configuration, *React Developer Tools* will be
usable as a tab in *Chrome Developer Tools* (when viewing a React
page). As a matter of fact, one can view this counter app and see the
two properties (aka. props) being passed to the *App* component.

**Assignment (5 Min): Configure the counter app to work with "Redux
DevTools by updating "index.js in "src" as follows:**

Replace the line

```
const store = createStore(counter);
```

with:

```
const middlewares = [];
const store = createStore(
  counter,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
```

Replace the line

```
import { createStore } from 'redux';
```

with

```
import { applyMiddleware, compose, createStore } from 'redux';
```

**note:** Went ahead and stubbed in the *middlewares* for the next lesson.

With this in place, one can view the increment actions and their
impact on the state from the *Redux* tab in *Chrome Developer Tools*.

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
