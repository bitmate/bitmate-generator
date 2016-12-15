"use strict";

const _ = require('lodash');
const generators = require('yeoman-generator');
const Utils = require('./Utils');


module.exports = generators.Base.extend({
    constructor() {
        generators.Base.apply(this, arguments);

    },

    serverPrompts() {
        this.option('server', {type: String, required: false});

        const prompts = [{
            when: !this.options.server,
            type: 'list',
            name: 'server',
            message: 'Which server framework do you want?',
            choices: [
                {name: 'ExpressJS', value: 'express'}
            ]
        }];

        return this.prompt(prompts).then(props => {
            if (!_.isObject(this.props)) {
                this.props = _.merge(this.props, {});
            }
            this.options.server = props.server;
            Object.assign(this.props, _.omit(this.options, ['env', 'skip-install', 'skip-cache']), props);
        });
    },

    clientPrompts() {
        this.option('client', {type: String, required: false});

        const prompts = [{
            when: !this.options.client,
            type: 'list',
            name: 'client',
            message: 'Which JavaScript framework do you want?',
            choices: [
                {name: 'Angular 1', value: 'angular1'},
                {name: 'None', value: 'none'}
            ]
        }];

        return this.prompt(prompts).then(props => {
            if (!_.isObject(this.props)) {
                this.props = _.merge(this.props, {});
            }
            this.options.client = props.client;
            Object.assign(this.props, _.omit(this.options, ['env', 'skip-install', 'skip-cache']), props);
        });
    },

    mergeJson: Utils.mergeJson,
    copyTemplate: Utils.copyTemplate,
    getExtensions: Utils.getExtensions

});