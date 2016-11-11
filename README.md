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

The first approach to transpiling is to have the browser do it. This
approach is relatively simple but because of performance issues, is not
to be used in production.  This approach is really only used in
simple "hello world" examples.

**Assignment (5 Min): In a new folder, implement the "Hello World" example
as documented in:**

https://facebook.github.io/react/docs/installation.html

Because the tooling is so difficult, Facebook has recently created an
application generator `create-react-app` that does the work behind
the scenes. This approach, however, is fairly limiting and
as such not recommended.

The first tool one needs to get setup is Node.js (JavaScript runtime
for the desktop / server); Node.js includes a command-line package manager
called `npm`.

**Assignment (5 Min): Install Node.js from:**

https://nodejs.org/en/

The next tool one needs to get setup is Babel; Babel (properly configured)
will transpile ES6 with JSX into ES5.

**Assignment (10 Min): In a new folder, install Babel and additional
tools using the commands:**

`npm init`

`npm install --save-dev babel-cli`

`npm install --save-dev babel-preset-es2015`

`npm install --save-dev babel-preset-react`

`npm install --save-dev babel-plugin-transform-object-rest-spread`

`npm install --save babel-polyfill`

**note:** The package *babel-plugin-transform-object-rest-spread* is
in preparation for using Redux later.

**Assignment (5 Min): Create a Babel configuration file
".babelrc" as follows:**

```
{
  "presets": ["es2015", "react"],
  "plugins": ["transform-object-rest-spread"]
}
```

Now that we have Babel fully installed and configured, we need to
install the React dependencies.

**Assignment (5 Min): Install React dependencies with the following commands:**

`npm install --save react`

`npm install --save react-dom`

**Assignment (5 Min): In the previously created folder create folders named
"src" and "dist"**

**note:** The *src* folder will hold the ES6 with JSX code and Babel
will create the transpiled ES6 code in the *dist* folder.

**Assignment (5 Min): Create the following "index.html" file in the "dist"
folder**

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

**Assignment (5 Min): Transpile the JavaScript using Babel with the command:**

`./node_modules/.bin/babel src -d dist`

Now there is an ES5 *index.js* file; but now we need to create the
*bundle.js* file that bundles the application JavaScript and all the
dependencies, e.g., React.

**Assignment (5 Min): Install the Browserify bundler application with the
command:**

`sudo npm install -g browserify`

**Assignment (5 Min): Create the "bundle.js" file with the command:**

`browserify index.js -o bundle.js`

**Assignment (5 Min): Open the "index.html" file using a browser**

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

While the *solution_1* folder is ready to go, one needs to run the following
command in the *solution_2* folder to download the dependencies:

`npm install`

### Usage

To run the first solution, open web browser to the file *index.html*.

One needs to build the second solution before opening it with a browser
(file *index.html*) with the following commands:

`./node_modules/.bin/babel src -d dist`

From within the *dist* folder:

`browserify index.js -o bundle.js`
