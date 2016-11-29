# City Events Map Prototype

## Lesson 14

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

This lesson introduces fixes for a couple of subtle optimization issues

**React Multiple Components**

The first optimization issue is actually not a problem with this project, but
there is an important concept to keep in mind as the project gets
more complex. The question is how deep in the component tree does one
use connect to get at data in the store. The answer is provided by
Dan Abramov himself:

http://redux.js.org/docs/faq/ReactRedux.html#react-multiple-components

In this project, we have two components that are connected to the Redux
store: *App* and *Map*; with *App* being at the top of the component tree.

It would be a mistake to obtain the *events*, *setTime*, and *time*
in *App* and pass them down to *Map* as properties.  *App* itself does
not need these values.  Rather, we connect *Map* to the store to get
the values.

In summation, the goal here is to optimize performance by minimizing
the number of times a component is rendered. By pushing the connect
down the component tree, we avoid unnecessary re-rendering of higher
components.

**React Rendering Too Often**

The second optimization trick took me quite awhile to understand and
requires one to understand what triggers components to be re-rendered
in an React / Redux application. A brief explanation is provided by
Dan Abramov at:

http://redux.js.org/docs/faq/ReactRedux.html#react-rendering-too-often

To illustrate the problem, in *solution_1* I have added a do nothing
duck called *dummy*; needed to force a change in the store without
causing anything to need re-rendering. I have also added a logging
step in the *Map* component to allow us to see when it is being
re-rendered.

With the developer tools console open, one will see *RENDER MAP* when
the application is first loaded; this is good. But using
Redux developer tools we can cause a state change by changing the
dummy value by dispatching:

```
{
  type: 'SET_DUMMY',
  value:  true
}
```

Even though the *Map* component does not use the *dummy* duck, we
never-the-less see that the component still re-renders. While *connect*
attempts to minimize the re-rendering by comparing the properties (before
and after), it is the *events* array that is actually changing every
time the store is updated. Again, it is not changing in a substantive
way (while the reference to the array is changing, the content is not).

**Refactoring with Reselect**

The fix is to use the *reselect* module as follows:

https://github.com/reactjs/reselect

In *solution_2* we have replaced the following in the *events* duck:

```
export const getEvents = state => state.events.ids.map(id => getEvent(state, id));
```

with:

```
const getEventsIds = state => state.events.ids;
const getEventsById = state => state.events.byId;
export const getEvents = createSelector(
  [getEventsIds, getEventsById],
  (eventsIds, eventsById) => eventsIds.map(id => eventsById[id]),
);
```

With this implementation, the getEvents will return a cached
copy of the events array (only to be updated if one of
*getEventsIds* or *getEventsById* changes). The fancy term for
this pattern is memoization.

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

Run the following command in the *solution_1* and *solution_2* folders to download the dependencies:

`npm install`

**note:** It assumed that one has *webpack* already installed from a previous
lesson.

### Usage

Run the following command in the *solution_1* and *solution_2* folder to
build and serve (one at a time).

`npm run start`

Open the following URL with a browser to run application:

`http://localhost:8080`
