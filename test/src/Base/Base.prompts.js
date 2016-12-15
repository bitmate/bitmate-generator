const test = require('ava');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const generators = require('yeoman-generator');

let context;

test.before(() => {
    context = {
        props: {}
    };
    context.option = () => {};
    generators.Base.extend = description => Object.assign(context, description, generators.Base);
    generators.Base.apply = () => {};
    require('../../../src/Base');
});

function setup(fixture, context) {
    context.options = {};
    context.prompt = questions => {
        questions.forEach(question => {
            if (typeof question.choices === 'function') {
                question.choices(fixture);
            }
        });
        return {
            then: cb => cb(fixture)
        };
    };
    return context;
}

test('Server: Set the props to the prompts value', t => {
    const fixture = {server: 'express'};
    context = setup(fixture, context);
    context.serverPrompts();
    t.deepEqual(context.props, fixture);
});

test('Client: Set the props to the prompts value', t => {
    context.props = {};
    const fixture = {client: 'angular1'};
    context = setup(fixture, context);
    context.clientPrompts();
    t.deepEqual(context.props, fixture);
});

test('Server: Clear the props if props is not an object', t => {
    context.props = null;
    context.options.server = 'express';
    context.prompt = () => {
        return {
            then: cb => cb({
                server: 'express'
            })
        };
    };
    context.serverPrompts();
    t.deepEqual(context.props, context.options);
});

test('Client: Clear props if props is not an object', t => {
    context.props = null;
    context.options.client = 'angular1';
    context.prompt = () => {
        return {
            then: cb => cb({
                client: 'angular1'
            })
        };
    };
    context.clientPrompts();
    t.deepEqual(context.props, context.options);
});