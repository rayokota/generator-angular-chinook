# The Angular-Chinook generator 

A [Yeoman](http://yeoman.io) generator for [AngularJS](http://angularjs.org) and [Chinook](https://github.com/fregelab/chinook).

Chinook is a Frege-based micro-framework.  For AngularJS integration with other micro-frameworks, see https://github.com/rayokota/MicroFrameworkRosettaStone.

## Installation

Install [Git](http://git-scm.com), [node.js](http://nodejs.org), and [JDK 8](https://www.java.com).

Install Yeoman:

    npm install -g yo

Install the Angular-Chinook generator:

    npm install -g generator-angular-chinook

The above prerequisites can be installed to a VM using the [Angular-Chinook provisioner](https://github.com/rayokota/provision-angular-chinook).

## Creating a Chinook service

In a new directory, generate the service:

    yo angular-chinook

Run the service (assuming the name of your service is `myapp`):

    ./gradlew :myapp:run


Your service will run at [http://localhost:8080](http://localhost:8080).


## Creating a persistent entity

Generate the entity:

    yo angular-chinook:entity [myentity]

You will be asked to specify attributes for the entity, where each attribute has the following:

- a name
- a type (String, Integer, Long, Float, Double, Boolean, Date, Enum)
- for a String attribute, an optional minimum and maximum length
- for a numeric attribute, an optional minimum and maximum value
- for a Date attribute, an optional constraint to either past values or future values
- for an Enum attribute, a list of enumerated values
- whether the attribute is required

Files that are regenerated will appear as conflicts.  Allow the generator to overwrite these files as long as no custom changes have been made.

Run the service:

    ./gradlew :myapp:run
    
A client-side AngularJS application will now be available by running

	grunt server
	
The Grunt server will run at [http://localhost:9000](http://localhost:9000).  It will proxy REST requests to the Chinook service running at [http://localhost:8080](http://localhost:8080).

At this point you should be able to navigate to a page to manage your persistent entities.  

The Grunt server supports hot reloading of client-side HTML/CSS/Javascript file changes.

