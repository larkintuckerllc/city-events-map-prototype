# City Events Map Prototype

## Lesson 15

This is one lesson in a series designed to bring a developer, already
familiar with the basics of HTML, CSS, and JavaScript, up to speed with
the React / Redux framework. An introduction and instructions on using
these lessons are provided in the README of the *master* branch of this
repository.

This lesson primarily involves switching out the dummy event data with
real data; in this case pulling future Gainesville area events from Meetup.
Various integration techniques are considered; with the actual implementation
being using signed URLs returning JSONP.

The older solution is to use a server to front-end the API call
using an API key; this, however, requires one to have a server.

A newer solution is to have the end-user authenticate using OAuth 2;
but this requires the end-user to authenticate with the third-party.

A new solution provided by Meetup is signed URLs. In a nutshell, it allows
one to create a URL with predefined parameters (say one is looking for
Meetups in the Gainesville area) that can be shared with others without
divulging one's API key.  The important point is that while anyone with
the URL can call it at any time, they are limited to the specific URL.

To be very specific, one can use the following URL to return Meetups in
the Gainesville Area (it is tied to an API key of a  private Meetup account),
nothing in the URL can be used to make other calls to Meetup.

**note**: Only use this URL for testing as the underlying API
key can be revoked at any time.

https://api.meetup.com/find/events?photo-host=public&sig_id=76796872&lon=-82.325029&lat=29.651020&sig=58a22f934f91330d4279ccbebcc9c7b67a0f1496

More reading on this particular example:

https://www.meetup.com/meetup_api/auth/#keysign

One additional wrinkle in using this approach is that Meetup does not
support CORS with signed URLs (weird) but does support an old CORS
work-around technique (JSONP).

https://en.wikipedia.org/wiki/JSONP

The good news is that there is an ES6 module solution to nicely integrate
with JSONP endpoints.

https://github.com/alexbardas/jsonp-promise

### Installation

The final result of this lesson is available in this branch. Download and
expand into a directory.

Run the following command in the *solution* folder to download the dependencies:

`npm install`

**note:** It assumed that one has *webpack* already installed from a previous
lesson.

### Usage

Run the following command in the *solution* folder to
build and serve (one at a time).

`npm run start`

Open the following URL with a browser to run application:

`http://localhost:8080`
