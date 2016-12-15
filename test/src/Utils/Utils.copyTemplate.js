'use strict';

const test = require('ava');
const helper = require('../../test-helper');

let context;

test.beforeEach(() => {
    context = helper.mock();
    context.writeJSON = {};
    context.write = {};
});

let Utils;
let renameFiles;

test.before(() => {
    Utils = require('../../../src/Utils');
    Utils.getExtensions = () => {
        return {framework: 'angular1', css: 'css'};
    };
    renameFiles = Utils.renameFiles;
    Utils.renameFiles = () => {};
});

test('Copy file.js', t => {
    Utils.copyTemplate.call(context, '../test/assets/file.js', '../test/assets/templates/file.js');
    t.true(context.copyTpl[context.templatePath('../test/assets/templates/file.js')].length > 0);
});

test.after(() => {
    Utils.renameFiles = renameFiles;
});