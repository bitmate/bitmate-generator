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

test('Set the props to the prompts value', t => {
    const fixture = {server: 'express', client: 'angular1', css: 'less', modules: 'bower'};
    context = setup(fixture, context);
    context.bitmatePrompts();
    t.deepEqual(context.props, fixture);
});

test('Exclude a category of options', t => {
    context.props = null;
    const fixture = {client: 'angular1', css: 'less', modules: 'bower'};
    context = setup(fixture, context);
    context.bitmatePrompts('server');
    t.deepEqual(context.props, fixture);
});

test('Clear the props if props is not an object', t => {
    context.props = null;
    context.prompt = () => {
        return {
            then: cb => cb()
        };
    };
    context.bitmatePrompts();
    t.deepEqual(context.props, context.options);
});
