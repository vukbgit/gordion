# Gordion
A Node.js typescript web app engine

## Basic concepts ##

* being as simple as possible
* expose a minimal API
* usa adapter pattern to wrap external packages with specific functionalities (DI container, router, template engine)
* creating also an app-generator

## Configuration ##

### Environmental variables ###

* set them into __~/.bash_profile__
* reload with `source ~/.bash_profile`
* variables:
  * __PORT__: port for the application to listen to, mandatory
  * __SOURCE_FOLDER__: folder for TypeScript source files, optional, defaults to 'src'
  * __BUILD_FOLDER__: folder for compiled files, optional, defaults to 'dist'

### Cli operations ###

