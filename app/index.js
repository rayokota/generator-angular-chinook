'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    _ = require('lodash'),
    _s = require('underscore.string'),
    pluralize = require('pluralize'),
    asciify = require('asciify');

var AngularChinookGenerator = module.exports = function AngularChinookGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularChinookGenerator, yeoman.generators.Base);

AngularChinookGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  console.log('\n' +
    '+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
    '|a|n|g|u|l|a|r| |c|h|i|n|o|o|k| |g|e|n|e|r|a|t|o|r|\n' +
    '+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
    '\n');

  var prompts = [{
    type: 'input',
    name: 'baseName',
    message: 'What is the name of your application?',
    default: 'myapp'
  }];

  this.prompt(prompts, function (props) {
    this.baseName = props.baseName;

    cb();
  }.bind(this));
};

AngularChinookGenerator.prototype.app = function app() {

  this.entities = [];
  this.resources = [];
  this.generatorConfig = {
    "baseName": this.baseName,
    "entities": this.entities,
    "resources": this.resources
  };
  this.generatorConfigStr = JSON.stringify(this.generatorConfig, null, '\t');

  this.template('_generator.json', 'generator.json');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('bowerrc', '.bowerrc');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.copy('gitignore', '.gitignore');

  var gradleWrapperDir = 'gradle/wrapper/'
  var appDir = this.baseName + '/'
  var srcDir = appDir + 'src/main/frege/' + this.baseName + '/'
  var dataDir = srcDir + 'data/'
  var dbDir = srcDir + 'db/'
  var initDir = srcDir + 'init/'
  var siroccoDir = srcDir + 'sirocco/'
  var publicDir = appDir + 'src/main/resources/public/'
  this.mkdir(gradleWrapperDir);
  this.mkdir(appDir);
  this.mkdir(srcDir);
  this.mkdir(dataDir);
  this.mkdir(dbDir);
  this.mkdir(initDir);
  this.mkdir(siroccoDir);
  this.mkdir(publicDir);

  this.copy('gradle/wrapper/gradle-wrapper.jar', gradleWrapperDir + 'gradle-wrapper.jar');
  this.copy('gradle/wrapper/gradle-wrapper.properties', gradleWrapperDir + 'gradle-wrapper.properties');
  this.copy('gradlew', 'gradlew');
  this.copy('gradlew.bat', 'gradlew.bat');
  this.template('_build.gradle', 'build.gradle');
  this.template('_settings.gradle', 'settings.gradle');
  this.template('app/_build.gradle', appDir + 'build.gradle');
  this.template('app/src/main/frege/app/_App.fr', srcDir + 'App.fr');
  this.template('app/src/main/frege/app/data/_Json.fr', dataDir + 'Json.fr');
  this.template('app/src/main/frege/app/db/_Db.fr', dbDir + 'Db.fr');
  this.template('app/src/main/frege/app/init/_Fixtures.fr', initDir + 'Fixtures.fr');

  this.template('app/src/main/frege/app/sirocco/_FDBC.fr', siroccoDir + 'FDBC.fr');
  this.template('app/src/main/frege/app/sirocco/_JDBC.fr', siroccoDir + 'JDBC.fr');
  this.template('app/src/main/frege/app/sirocco/_Sirocco.fr', siroccoDir + 'Sirocco.fr');
  this.template('app/src/main/frege/app/sirocco/_Util.fr', siroccoDir + 'Util.fr');

  var publicCssDir = publicDir + 'css/';
  var publicJsDir = publicDir + 'js/';
  var publicViewDir = publicDir + 'views/';
  this.mkdir(publicCssDir);
  this.mkdir(publicJsDir);
  this.mkdir(publicViewDir);
  this.template('public/_index.html', publicDir + 'index.html');
  this.copy('public/css/app.css', publicCssDir + 'app.css');
  this.template('public/js/_app.js', publicJsDir + 'app.js');
  this.template('public/js/home/_home-controller.js', publicJsDir + 'home/home-controller.js');
  this.template('public/views/home/_home.html', publicViewDir + 'home/home.html');
};

AngularChinookGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
