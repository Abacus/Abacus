#Abacus.js
Abacus is an Open Source HTML5 Game Framework. Abacus is currently in the early pre 0.1 stage of development. We have implemented the simplest interface for managing a runloop ```Abacus.timer()```. Please see Dependancies, Documentation, Project goals, Target User, Roadmap, W3C API requests, Style Guide, Contributing Guide, and Target Browsers below.


##W3 Games Community Group
If you are interested in contributing to Open Web Standards connected to games, make sure to join the W3C Games Community Group http://www.w3.org/community/games.

## Dependencies
### One time setup:
* Node.js
* NPM

### Setup
Once the dependencies are installed:
	$ make setup

Future re-builds require _only_:

	$ make

	Or...

	$ jake


## Documentation
Documentation for the APIs we have implemented so far is available on our wiki: https://github.com/boazsender/Abacus/wiki

## Project goals
* Provide a layer that allows game devs to focus on their core competency
* Easy hello world
* Reduce barrier to entry for developing casual games with html5
* Make the infrastructure for game development really easy
* Create programming standards for games infrastructure
* Ensure that all data interfaces are specified in our documentation

## Target User
* Games developers
* Indie game developers
* Large game studios

## Roadmap
These are the APIs we are planning to implement. We are actively seecing feedback and contributions on these APIs.

* Loops/timing/deltas
 * Nice syntactic sugar around RAF
* Timeline management (step/interpolate (keyframing))
* Identity Management
 * Authenticate with multiple identity providers
 * Manage syndication
 * Contacts/friends
 * Manage player in the runtime (clever model)
 * Achievement management
 * Player matching
 * Leaderboards
* Abstract metrics API (https://github.com/mikejihbe/metrics)
 * With utility functions for processing
* Feature detection
 * Benchmarking API
 * Native browser fearure detection
 * Host browser feature detection
 * Device (processing power, etc)
 ** Come up with ‘here is what my app needs’, and be able to show screen to user that says ‘this is what you’re missing’
* Payments
 * Abstract the important payments providers
 * Give a nice API like stripe (https://stripe.com/docs/stripe.js)
* Dependency management/DLC (talk to jrburke)
 * Integrate downloading with payments
 * Script loading -> just use require.js
 * Or just use AMD
 * Asset downloading
 * On the fly loading
* Multi player services
 * Realtime services
 * low level state replication/synchronicity
* Localization
 * language
 * currency
 * geolocation based lang/currency
* Input
 * abstractly map a single api to as many inuts as possible
 * Keyboard
 * Mouse
 * Touch
 * Game controllers (wii/kinect/pc controller/joystick)
 * Video
* Audio (Frame accurate)
 * Sound effects
 * Background music
 * Cross browser audio synthesis
* User Interface (chrome)
 * leaderbaord
 * HUD
 * basically, we’re just going to hard code UI based on data in the system
 * Use jQuery ui
* Advertising
 * FIND SOMEONE WHO CARES ABOUT THIS
* Data standards
 * Let’s do this, but let’s find someone to lead this
* Support engine plugins
* Support other feature plugins
* Support server replay
* Developer support
 * API documentation & upkeep
 * Testing
 * Unit -> Just use qUnit
 * Unit test this framework a lot
 * Reference testing
 * Integration testing - wdfk how to ref test a game



## What we really want from browser vendors:
* GPU profiling
* GPU fingerprinting details
* Higher resolution timer (micros plz)


## Style Guide
We conform to the following conventions:

* Two space soft tabs
* Single quotes over double quotes
* Use a single var statement for multiple vars when possible
* Indent var lists by four spaces

See Also: https://github.com/rwldrn/idiomatic.js

## Contributing Guide
We encourage you to fork, branch and make pull requests!

Issues are also really helpful, please head over to the issues for this project to give input on the project goals/scope, the API so far, or to submit a feature request or bug: https://github.com/boazsender/Abacus/issues

## Target Browsers
* Chrome 14+
* FF5+
* Safari 5+
* IE 9+
* Opera 9.5+
* Mobile Firefox 6+
* Mobile Safari 5+