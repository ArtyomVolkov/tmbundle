TKM-OP

### Quick start

# install the dependencies with npm
$ npm install

# start web version
$ npm run startWeb

go to [http://localhost:8082](http://localhost:8082) in your browser.

# Getting Started

## Dependencies

What you need to run this app:
* [node](https://nodejs.org) and [npm](https://docs.npmjs.com/getting-started/what-is-npm)
* Ensure you are running Node (`v6.x.x`+) and NPM (`3.x.x`+)

## Installing

* `npm install` to install all dependencies

## Developing

After you have installed all dependencies you can now start developing with:

* `npm run startWeb`

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:8081`.


### Android

To build your application, run:

* Run android simulator
* `react-native run-android`

Export to APK file:

* Generating a signing key
	`cd android && gradlew assembleRelease`

	The generated APK can be found under android/app/build/outputs/apk/app-release.apk, and is ready to be distributed.


### IOS

	To build your application, run:

	Open `./../../project.xcodeproject in xcode
	command+r (in xcode)

