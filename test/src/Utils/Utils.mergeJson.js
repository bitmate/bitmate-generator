'use strict';

const test = require('ava');
const Helper = require('../../test-helper');

let context;

test.beforeEach(() => {
    context = Helper.mock();
    context.writeJSON = {};
    context.write = {};
});

test('Write fixture object in package.json', t => {
    const mergeJson = require('../../../src/Utils').mergeJson;
    const fixture = {
        dependencies: {angular: '^1.5.0'}
    };
    mergeJson.call(context, '../test/assets/package.json', fixture);
    t.deepEqual(context.writeJSON[context.templatePath('../test/assets/package.json')], fixture);
});

test('Write fixture object in .babelrc which already contains Array', t => {
    const mergeJson = require('../../../src/Utils').mergeJson;
    const fixture = {
        presets: ['es2015', 'react']
    };
    mergeJson.call(context, '../test/assets/.babelrc', fixture);
    t.deepEqual(context.writeJSON[context.templatePath('../test/assets/.babelrc')], fixture);
});
