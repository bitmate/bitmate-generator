"use strict";

const _ = require('lodash');
const generators = require('yeoman-generator');
const Utils = require('./Utils');

module.exports = generators.Base.extend({
  constructor() {
    generators.Base.apply(this, arguments);

    this.option('server', {type: String, required: false});
    this.option('client', {type: String, required: false});
    this.option('runner', {type: String, required: false});
    this.option('modules', {type: String, required: false});
    this.option('css', {type: String, required: false});
    this.option('html', {type: String, required: false});
  },

  bitmatePrompts(exclude) {
    let filteredPrompts;
    const prompts = [{
      when: !this.options.server,
      type: 'list',
      name: 'server',
      category: 'server',
      message: 'Which server framework do you want?',
      choices: [
        {name: 'ExpressJS', value: 'express'}
      ]
    }, {
      when: !this.options.client,
      type: 'list',
      name: 'client',
      category: 'client',
      message: 'Which JavaScript framework do you want?',
      choices: [
        {name: 'Angular 1', value: 'angular1'},
        {name: 'None', value: 'none'}
      ]
    }, {
      when: !this.options.runner,
      type: 'list',
      name: 'runner',
      message: 'Which task runner do you want?',
      choices: [
        {name: 'Grunt', value: 'grunt'}
      ]
    }, {
      when: !this.options.modules && this.options.client !== 'none',
      type: 'list',
      name: 'modules',
      category: 'client',
      message: 'Which module management do you want?',
      choices: [
        {name: 'Bower', value: 'bower'}
      ]
    }, {
      when: !this.options.html && this.options.client !== 'none',
      type: 'list',
      name: 'html',
      category: 'client',
      message: 'Which HTML template engine would you want?',
      choices: [
        {name: 'HTML', value: 'html'},
        {name: 'PUG', value: 'pug'}
      ]
    }, {
      when: !this.options.css && this.options.client !== 'none',
      type: 'list',
      name: 'css',
      category: 'client',
      message: 'Which CSS preprocessor do you want?',
      choices: [
        {name: 'SASS', value: 'scss'},
        {name: 'Stylus', value: 'styl'},
        {name: 'Less', value: 'less'},
        {name: 'CSS', value: 'css'}
      ]
    }, {
      when: !this.options.js && this.options.client !== 'none',
      type: 'list',
      name: 'js',
      category: 'client',
      message: 'Which JavaScript preprocessor do you want?',
      choices: [
        {name: 'Babel', value: 'babel'}
      ]
    }];

    if (exclude) {
      filteredPrompts = prompts.filter(prompt => {
        return prompt.category !== exclude;
      });
    } else {
      filteredPrompts = prompts;
    }

    return this.prompt(filteredPrompts).then(props => {
      if (!_.isObject(this.props)) {
        this.props = _.merge(this.props, {});
      }
      Object.assign(this.props, _.omit(this.options, ['env', 'skip-install', 'skip-cache']), props);
    });
  },

  mergeJson: Utils.mergeJson,
  updateJson: Utils.updateJson,
  replaceInFileWithTemplate: Utils.replaceInFileWithTemplate,
  replaceInFiles: Utils.replaceInFiles,
  copyTemplate: Utils.copyTemplate,
  getExtensions: Utils.getExtensions
});
