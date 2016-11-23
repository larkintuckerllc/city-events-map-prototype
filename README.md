# City Events Map Prototype

## Lesson 13

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

As we have implemented both Bootstrap and custom CSS in a simple
*hello world* application, we apply the same techniques to our
city mapper application. In addition, we add some additional build
tools. This lesson will focus on the general idea rather than
a detailed walk-through.

**Merging Projects**

The strategy that we took to merge the two projects was bring in
pieces of the *city events map* application into the *hello world*
project that we just built.

First, we bring in the additional dependencies:

* normalizr
* react-redux
* redux
* redux-thunk

We need to add Babel support for the JavaScript feature called
object rest spread with the additional development dependency
and updated *.babelr*.

* babel-plugin-transform-object-rest-spread

Then, we update the *index.html* file with an updated title and
a *viewport* meta tag for mobile.

We replace the *src* folder.

In order for Webpack to resolve import paths consisting of just folder
names, we need to update *webpack.config.js* with:

```
resolve: {
  extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
}
```

While not required, it is recommended to name any JavaScript file
with JSX in it with the extension *.jsx*, e.g., the files in *components*.

We finally bring back in the two imports from the *hello world* application
at the top of *src/index.jsx*.

```
import 'babel-polyfill';
import 'bootstrap-loader';
```

**Webpack-Dev-Server**

We next want to incorporate the live-reloading feature that we had with
*create-react-app*.  The solution is:

https://webpack.github.io/docs/webpack-dev-server.html

**Favicon**

We incorporate a favicon; requires updating *webpack.config.js* loaders as
required.

```
}
  test: /\.ico$/,
  loader: 'file-loader?name=[name].[ext]',
}
```

**Media Loaders**

Much like the need to load fonts, we need to be able to load media. Requires
updating *webpack.config.js*.

```
}
  test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
  loader: 'url-loader?limit=10000',
}, {
  test: /\.(eot|ttf|wav|mp3)$/,
  loader: 'file-loader',
}
```

**SCSS Support**

We add support for SCSS (SASS 3) with the following loader:

```
{
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: ['style', 'css', 'sass'],
}
```

**Autoprefixer**

Because trying to remember when to create brower-specific prefixes
is challenging, we use autoprefixer.

https://www.npmjs.com/package/autoprefixer

**CSS Modules**

One of the pain points in web development is having to create
unique names for all CSS elements across the project.  The solution
is it use CSS modules.

https://github.com/css-modules/css-modules

This requires updating the loaders in `webpack.config.js`:

```
{
  test: /\.css$/,
  exclude: /node_modules/,
  loaders: ['style', 'css?module&-autoprefixer', 'postcss'],
}, {
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: ['style', 'css?module&-autoprefixer', 'postcss', 'sass'],
}
```

But, then we need to update all the files where we used styles to
use modules.

**Linting**

To help standardize code, we install a series of linters to
check our code.

* eslint
* eslint-config-airbnb
* eslint-loader
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-react

**note:** Apparently one has to manually install an older (v2) version
of *eslint-plugin-jsx-a11y* to be compatible with *eslint-config-airbnb*.

Then to run the linter during the build process, add the following to
*webpack.config.js*.

```
preLoaders: [{
   test: /\.(js|jsx)$/,
   exclude: /node_modules/,
   loader: 'eslint-loader',
 }],
```

One also needs to setup the eslint configuration file; *eslintrc.json*.

```
 {
   "env": {
     "browser": true
   },
   "extends": "airbnb",
   "parserOptions": {
     "ecmaFeatures": {
       "experimentalObjectRestSpread": true
     }
   }
 }
```

Of course, one we install the linter we find that our code has a number of
non-breaking issues that we need to clean up. Points to the fact that it
is better to setup one's linter prior to starting development.

**Production Builds**

With our streamlined day-to-day development process in place we need
flesh out the production deployment process.

We update *webpack.config.js* with the following *plugins* value
to make the environment variable *NODE_ENV* available in the browser.
This variable can be used to conditionally do things based on
whether the application is running in production or not.

```
plugins: [
  HTMLWebpackPluginConfig,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
],
```

The *devtools* value in *webpack.config.js* sets up
an optimized (for build / rebuild speed) set of debugging tools
in the browser when developing.

`devtool: 'eval'`

Updates to `package.json` provide for commands to start the
development environment and build the production version
(with more debugging tools in the browser).

```
"scripts": {
    "build": "NODE_ENV=production webpack -p -d source-map",
    "start": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
The following sample code illustrates how one can
conditionally do things based on the build type (development or
production).

```
// SAMPLE DEVELOPMENT DEBUGGING CODE
if (process.env.NODE_ENV !== 'production') {
  window.console.log('DEVELOPMENT ENVIRONMENT');
}
```

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

Run the following command in the *solution* folder to download the
dependencies:

`npm install`

Install Webpack-Dev-Server:

Linux / OS X: `sudo npm install -g webpack-dev-server`

Windows: `npm install -g webpack-dev-server`

### Usage

Run the following command in the *solution* folder to build and serve:

`npm run start`

Open the following URL with a browser to run application:

`http://localhost:8080`

Run the following command in the *solution* folder to build the production
version.

`npm run build`

If one is using the Atom editor, the following Atom plug-ins will display
the linting errors in the editor.

* linter
* linter-eslint
* react
