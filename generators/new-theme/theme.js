var generators = require('yeoman-generator');
var _ = require('lodash');
var open = require('open');
var questions = require('./includes/questions');
var scaffold = require('./includes/scaffold.js');

var mainGenerator = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('path', {
      type: String,
      required: true
    });
    this.argument('dirname', {
      type: String,
      required: false
    });
    this.environments = [];
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
        this.defaultEnv = answers.defaultEnv;

        if (answers.dirname) {
          this.dirname = answers.dirname;
        }
      }.bind(this));
  },

  configuring: function() {
    this.destinationRoot(this.path + '/' + this.dirname);
    this.config.set('environments', this.environments);
    this.config.set('name', this.dirname);
    this.config.save();
  },

  writing: function() {
    return this._copyScaffold(this._getScaffoldPath(), this.destinationPath());
  },

  install: function() {
    if (this.fs.exists(this.destinationPath('package.json'))) {
      this.npmInstall();
    }

    if (this.fs.exists(this.destinationPath('bower.json'))) {
      this.bowerInstall();
    }
  },

  end: function() {
    open(this.destinationPath('config.yml'));
  }
});

_.extend(mainGenerator.prototype, scaffold);

module.exports = mainGenerator;
