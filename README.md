# City Events Map Prototype

## Lesson 4

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

One of the more challenging, and poorly documented, aspects of React
development is the tooling. Specifically, most React examples are
written in ES6 (aka, ES2015, modern version of JavaScript) with JSX (the XML);
neither of which are supported by browsers. There are tools designed
to convert (aka, transpile) the ES6 with JSX into ES5 (the JavaScript that
browsers currently support).

**note:** One may be wondering why use ES6 with JSX at all (one can write
React applications with out it). The answer is that this new language makes
it significantly easier to build applications.

The first approach to transpiling is to have the browser do it. This
approach is relatively simple (no tools) but because of performance issues,
is not to be used in production or outside of a simple "hello world"
example.

**Assignment (5 Min): In a new folder, implement and test with browser
the example as documented in the section "Trying Out React":**

https://facebook.github.io/react/docs/installation.html#trying-out-react

The first tool one needs to absolutely get setup is Node.js (JavaScript runtime
for the desktop / server); Node.js includes a command-line package manager
called `npm`.

**Assignment (5 Min): Install Node.js from:**

https://nodejs.org/en/

Because the tooling is so difficult, Facebook has created an
application generator *create-react-app* that does the build work behind
the scenes for you.

**Assignment (30 Min): In a new folder, build an application as documented
in the section "Creating a Single Page Application:"**

https://facebook.github.io/react/docs/installation.html#creating-a-single-page-application

**note:** Running *create-react-app* in Windows took about 5 minutes;
just be patient.

While the most of the later lessons will be built using *create-react-app*,
we will spend some time here implementing one part of the build process
(the transpiling) using a more manual approach.

In one of the last lessons, we will flesh out the build process so that
we can be free of the limitations of using *create-react-app*. In
modern web development, the build process is a crucial step in creating
a performant web application.

The next tool one needs to get setup is Babel; Babel (properly configured)
will transpile ES6 with JSX into ES5.

**note;** As a reminder, the rest of this lesson provides an alternative to
using *create-react-app* and will not be revisited again until one of the
last lessons.

**Assignment (5 Min): In a new folder (referred to as the installation folder),
initialize the package management configuration for the project
using the following command.**

`npm init`

*note:* Just accept all the recommendations by hitting <Enter>.

**Assignment (10 Min): From the installation folder install
Babel and additional tools using the commands:**

`npm install --save-dev babel-cli`

`npm install --save-dev babel-preset-es2015`

`npm install --save-dev babel-preset-react`

`npm install --save babel-polyfill`

**Assignment (5 Min): In the installation folder create a Babel
configuration file ".babelrc" as follows:**

```
{
  "presets": ["es2015", "react"]
}
```

Now that we have Babel fully installed and configured, we need to
install the React dependencies.

**Assignment (5 Min): From the installation folder Install React dependencies
with the following commands:**

`npm install --save react`

`npm install --save react-dom`

**Assignment (5 Min): In the installation folder create folders named
"src" and "dist"**

**note:** The *src* folder will hold the ES6 with JSX code and Babel
will create the transpiled ES6 code in the *dist* folder.

**Assignment (5 Min): Create the following "index.html" file in the "dist"
folder**

**note:**: The HTML file is not transpiled; only the JavaScript is.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
  </head>
  <body>
    <div id="root" />
    <script src="bundle.js"></script>
  </body>
</html>
```

**Assignment (5 Min): Create the following ES6 with JSX file, "index.jsx"
in the "src" folder**

```
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

**Assignment (5 Min): From the installation folder, transpile the JavaScript
using Babel with the command:**

Linux / OS X: `./node_modules/.bin/babel src -d dist`

Windows: `node_modules\.bin\babel src -d dist`

Now there is a transpiled ES5 *index.js* file in the *dist* folder; but now we
need to create the *bundle.js* file that bundles the application JavaScript
and all the dependencies, e.g., React, into one file.

**Assignment (5 Min): From the installation folder install the Browserify
bundler application with the command:**

Linux / OS X: `sudo npm install -g browserify`

Windows: `npm install -g browserify`

**Assignment (5 Min): From the "dist" folder create the "bundle.js" file
with the command:**

`browserify index.js -o bundle.js`

**Assignment (5 Min): Open the "index.html" file in the *dist* folder using
a browser**

**note:** In the end, the files actually used by the browser for the application
are *index.html* and *bundle.js* in the *dist* folder.

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

While the *solution_1* folder is ready to go, one needs to run the following
command in the *solution_2* and *solutions_3* folders to download the
dependencies:

`npm install`

### Usage

To run the first solution, open web browser to the file *index.html*.

To run the second solution, use the command to build and serve the application:

`npm run start`

and open web browser to the provided URL.

One needs to build the third solution before opening it with a browser
(file *index.html*) with the following commands:

Linux / OS X: `./node_modules/.bin/babel src -d dist`

Windows: `node_modules\.bin\babel src -d dist`

From within the *dist* folder:

`browserify index.js -o bundle.js`
