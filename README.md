# City Events Map Prototype

## Lesson 11

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

Since the earlier lesson where we used Babel and Browserify, we have been
using *create-react-app* command to build React applications.

One of the challenges of using Create-React-App is that (using their
own words) its "feature set is intentionally limited" and "non-configurable".

In this lesson, we will learn how we might going about incorporating a popular
CSS framework into this application; Bootstrap.

http://getbootstrap.com/

A quick Google search turns up React-Bootstrap.

https://react-bootstrap.github.io/

The instructions quickly point out that outside of the simplest cases, one
is to "use a bundler like Webpack or Browserify".

While Create-React-App does use Webpack under the hood, we do not have
access to the Webpack configuration.

**note:** Create-React-App does have an *eject* feature that converts
the application to a configurable Webpack based application. However
the resulting configuration is undesirably complex.

Another issue is that React-Bootstrap is a third-party interpretation of
Bootstrap; which both requires one to learn yet another syntax as well as
introduce the possibility of more bugs.

A deeper Google search turns up Bootstrap-Loader.

https://github.com/shakacode/bootstrap-loader

Bootstrap-Loader is Webpack add-on (aka. Loader) and such requires
one to have access to the Webpack configuration; again not an
option with Create-React-App.

Outside Create-React-App, Webpack is the most popular solution for
automating building React apps (basically automates the process we
did with Babel and Browserify).

In this lesson, we will build a React "hello world" application
with Webpack; in the next lesson we will get back to incorporating
Bootstrap.

**Assignment (1 Hr): Read and understand theory of using Webpack from:**

https://tylermcginnis.com/react-js-tutorial-1-5-utilizing-webpack-and-babel-to-build-a-react-js-app

**Assignment (5 Min): In a new folder (installation folder), initialize the
package management configuration for the project using the following command**

```
npm init
```

**Assignment (5 Min): In the installation folder, create application source
code by doing the following:**

Create file `index.html` with:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
  </head>
  <body>
    <div id="root" />
  </body>
</html>
```

Create folder `src`.

Create file `src/index.jsx` with:

```
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

**Assignment (5 Min): In installation folder, install the application
dependencies using the following commands:**

`npm install --save react`

`npm install --save react-dom`

`npm install --save babel-polyfill`

**Assignment (5 Min): In installation folder, install the development tools
using the following commands:**

Linux / OS X: `sudo npm install -g webpack`

Windows: `npm install -g webpack`

`npm install --save-dev webpack`

`npm install --save-dev babel-core`

`npm install --save-dev babel-preset-es2015`

`npm install --save-dev babel-preset-react`

`npm install --save-dev babel-loader`

`npm install --save-dev html-webpack-plugin`

**Assignment (5 Min): In the installation folder, create the
configuration files**

Create file `.babelrc` with:

```
{
  "presets": ["es2015", "react"]
}
```

Create file `webpack.config.js` with:

```
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'index.html'),
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    HTMLWebpackPluginConfig
  ],
};
```

**Assignment (1 Min): Run the following command in the installation folder
to build the application**

`webpack`

**Assignment (1 Min): Run application by opening "dist/index.html"
with a browser.**

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

Run the following command in the *solution* folder to download the
dependencies:

`npm install`

### Usage

Run the following command in the *solution* folder to build:

`webpack`

Open the file `dist/index.html` with a browser to run application.
