# City Events Map Prototype

## Lesson 9

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

As we have been exposed to all the core concepts already, this lesson
is simply a summary of the rest of the steps applied to complete the
application. To download and review the application, see the *Installation*
section below.

**Refactored into Separate Components**

With the added complexity, we broke up the single *App* component into
multiple narrowly focused components.

**Created Time Duck**

As the application is designed to allow one to find events through
time and space, we keep track of the search time with the *time*
duck.

**Time Display and Slider**

Built components to display and modify the search time. Used a
third-party slider component for the search time control.

https://github.com/react-component/slider

**Dynamically Add and Remove Markers**

Added functionality to the map to dynamically add and remove markers
based on the search time.

**Added InfoWindows for Markers**

Added functionality to the map to display event details on clicks on
markers.

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
