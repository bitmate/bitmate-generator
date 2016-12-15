const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const generators = require('yeoman-generator');

let context;

test.before(() => {
  context = {
    props: {}
  };
  generators.Base.extend = description => Object.assign(context, description, generators.Base);
  generators.Base.apply = () => {};
  require('../../../src/Base');
});

test(`Call 'this.option' 0 times with correct parameters`, () => {
  context.option = () => {};
  const spy = chai.spy.on(context, 'option');
  context.constructor();
  expect(spy).to.have.been.called.exactly(0);
});