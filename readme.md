# Abacus.js
Abacus is an Open Source HTML5 Game Framework. Abacus is currently in the early pre 0.1 stage of development. Take a look at the milestones to see our progress: https://github.com/Abacus/Abacus/issues/milestones

Please see Dependancies, Documentation, Project goals, Target User, Roadmap, W3C API requests, Style Guide, Contributing Guide, and Target Browsers below.

If you are interested in contributing to Open Web Standards connected to games, make sure to join the W3C Games Community Group http://www.w3.org/community/games.

## License

CC0 Public Domain - http://creativecommons.org/publicdomain/zero/1.0/

## Dependencies
### One time setup for build process:
* Node.js (installation: https://github.com/joyent/node/wiki/Installation)
* NPM (installation: ```curl http://npmjs.org/install.sh | sh```)

### Setup
Once the dependencies are installed:
	$ make setup

Future re-builds require _only_:

	$ make

	Or...

	$ jake


## Documentation
Documentation for the APIs we have implemented so far is available on our wiki: https://github.com/Abacus/Abacus/wiki/Documentation

## Project goals
The project goals are available on our wiki: https://github.com/Abacus/Abacus/wiki/goals

## Target User
* Games developers
* Indie game developers
* Large game studios

## Roadmap
The project roadmap is available on our wiki: https://github.com/Abacus/Abacus/wiki/roadmap


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
We encourage you to fork, branch and make pull requests! Join us in #Abacus on irc.freenode.net.

Issues are also really helpful, please head over to the issues for this project to give input on the project goals/scope, the API so far, or to submit a feature request or bug: https://github.com/Abacus/Abacus/issues

## Target Browsers
* IE 9
* Chrome latest -1
* FF latest -1
* Safari latest -1
* Opera latest -1
* Mobile Firefox latest -1
* Mobile Safari latest -1