# City Events Map Prototype

## Lesson 12

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

Now that we have control of our build process (with Webpack),
we can follow the instructions and install Bootstrap with
Bootstrap-Loader.

https://github.com/shakacode/bootstrap-loader

**Assignment (5 Min): From the installation folder from the solution
to to previous lesson, install the dependencies and Bootstrap-Loader with
the following commands:**

**note:** The large number of loaders are required to handle the
multiple types of source files provided with Bootstrap, e.g., styles,
fonts, images, and JavaScript.

`npm install --save-dev node-sass`

`npm install --save-dev bootstrap-sass`

`npm install --save-dev resolve-url-loader`

`npm install --save-dev sass-loader`

`npm install --save-dev css-loader`

`npm install --save-dev style-loader`

`npm install --save-dev url-loader`

`npm install --save-dev file-loader`

`npm install --save-dev imports-loader`

`npm install --save jquery`

`npm install --save bootstrap-loader`

**Assignment (5 Min): Update the "loaders" value in "webpack.config.js"
to be:**

```
loaders: [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
}, {
  test: /\.(woff2?|svg)$/,
  loader: 'url-loader?limit=10000',
}, {
  test: /\.(ttf|eot)$/,
  loader: 'file-loader',
}, {
  test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
  loader: 'imports-loader?jQuery=jquery',
}],
```

**Assignment (5 Min): Load Bootstrap-Loader by editing "src/index.jsx"
as follows:**

Add the command immediately below the *babel-polyfill* import.

`import 'bootstrap-loader';`

At this point, we have our application styled with Bootstrap. We will
wrap up this lesson with adding our own stylesheet. The good news is that
by adding all the dependencies for Bootstrap-Loader, we have everything
we need installed.

**Assignment (5 Min): Add the following to the "loaders" array value in
"webpack.config.js":**

```
{
  test: /\.css$/,
  exclude: /node_modules/,
  loaders: ['style', 'css' ],
}
```

**Assignment (5 Min): Create file "src/index.css"
as follows:**

```
body {
  background-color: red;
}
```

**Assignment (5 Min): Load the css by editing "src/index.jsx"
as follows:**

Add the following line at the end of the *imports*.

`import './index.css';`

**Assignment (1 Min): From the installation folder run the following command to compile
the application:**

`webpack`

**Assignment (1 Min): Using browser open the file "dist/index.html" to
view the application**

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
