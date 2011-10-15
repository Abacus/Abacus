#Abacus.js
## The Open Source HTML5 Games Framework

### Abacus.timer()


##Platform goals
* Provide a layer that allows game devs to focus on their core competency
* Easy hello world
* Reduce barrier to entry for developing casual games with html5
* Make the infrastructure for game development really easy
* Create programming standards for games infrastructure
* Ensure that all data interfaces are specified in our documentation

##Target User
* Games developers
* Indie game developers
* Large game studios

##W3 Games Community Group
Make sure to join the W3C Games Community Group [[http://www.w3.org/community/games]]



##Roadmap
* Timeline management (step/interpolate (keyframing))
* Loops/timing/deltas
** Nice syntactic sugar around RAF
* Identity Management
** Authenticate with multiple identity providers
** Manage syndication
** Contacts/friends
** Manage player in the runtime (clever model)
** Achievement management
** Player matching
** Leaderboards
* Abstract metrics API (https://github.com/mikejihbe/metrics)
** With utility functions for processing
* Feature detection
** Benchmarking API
** Native browser fearure detection
** Host browser feature detection
** Device (processing power, etc)
*** Come up with ‘here is what my app needs’, and be able to show screen to user that says ‘this is what you’re missing’
* Payments
** Abstract the important payments providers
** Give a nice API like stripe (https://stripe.com/docs/stripe.js)
* Dependency management/DLC (talk to jrburke)
** Integrate downloading with payments
** Script loading -> just use require.js
** Or just use AMD
** Asset downloading
** On the fly loading
* Multi player services
** Realtime services
** low level state replication/synchronicity
* Localization
** language
** currency
** geolocation based lang/currency
* Input 
** abstractly map a single api to as many inuts as possible
** Keyboard
** Mouse
** Touch
** Game controllers (wii/kinect/pc controller/joystick)
** Video
* Audio (Frame accurate)
** Sound effects
** Background music
** Cross browser audio synthesis
* User Interface (chrome)
** leaderbaord
** HUD
** basically, we’re just going to hard code UI based on data in the system
** Use jQuery ui
* Advertising
** FIND SOMEONE WHO CARES ABOUT THIS
* Data standards
** Let’s do this, but let’s find someone to lead this
* Support engine plugins
* Support other feature plugins
* Support server replay
* Developer support
** API documentation & upkeep
** Testing
** Unit -> Just use qUnit
** Unit test this framework a lot
** Reference testing
** Integration testing - wdfk how to ref test a game



What we really want from browser vendors:
* GPU profiling
* GPU fingerprinting details 
* Higher resolution timer (micros plz)

