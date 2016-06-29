var generators = require('yeoman-generator');
var _ = require('lodash');
var questions = require('./includes/questions');
var fetchRepo = require('./includes/cloneRepo.js');

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

  initializing: function() {
    this.log('Theme generator initializing...');
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

    this.fs.copyTpl(readFile, writeFile, {
      environments: this.environments
    });

    return this._cloneRepo(this.repo, this.destinationPath());
  },

  install: function() {
    try {
      this.npmInstall(['gulp-cli'], {
        'global': true
      });
    } catch (err) {
      // might get permission error
      this.log(err);
    }

    this.npmInstall();
  },

  end: function() {
    this.log('Theme generator end...');
  }
});

_.extend(mainGenerator.prototype, fetchRepo);

module.exports = mainGenerator;
