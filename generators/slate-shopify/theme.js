var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var questions = require('./includes/questions');
var fetchRepo = require('./includes/cloneRepo.js');

var mainGenerator = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('path', {type: String, required: true});
    this.argument('dirname', {type: String, required: false});
    this.environments = [];
  },

  initializing: function() {
    this.log('Im initializing now');
  },

  prompting: function() {
    return this.prompt(questions.theme(this))
      .then(function(answers) {
        var env = answers.environments;
        if (answers.customEnv) {
          env.pop(); // removes `custom` selection
          env = env.concat(answers.customEnv.split(/,\s*/));
        }

        this.environments = env;

        if (answers.dirname) {
          this.dirname = answers.dirname;
        }

        this.repo = answers.repo;
      }.bind(this));
  },

  configuring: function() {
    this.destinationRoot(this.path + '/' + this.dirname);
    this.config.set('environments', this.environments);
    this.config.save();
  },

  writing: function() {
    var readFile = this.templatePath('config.yml');
    var writeFile = this.destinationPath('config.yml');
  
    this.fs.copyTpl(readFile, writeFile, {environments: this.environments});
    
    this._cloneRepo(this.repo, this.destinationPath());

    // write `src` folder content for the theme
  },

  install: function() {
    this.log('Im installing now');
    // npm install, any other installs to run?
  },

  end: function() {
    this.log('Im finished now');
  }
});

_.extend(mainGenerator.prototype, require('./includes/cloneRepo.js'));

module.exports = mainGenerator;
