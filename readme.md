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
The project goals are available on our wiki: https://github.com/boazsender/Abacus/wiki/goals

## Target User
* Games developers
* Indie game developers
* Large game studios

## Roadmap
The project roadmap is available on our wiki: https://github.com/boazsender/Abacus/wiki/roadmap


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