'use strict';

const test = require('ava');
const helper = require('../../test-helper');

let context;

test.beforeEach(() => {
    context = helper.mock();
    context.writeJSON = {};
    context.write = {};
});

test('Check .babelrc is not renamed', t => {
    const files = {
        template: '../../test/assets/.babelrc',
        destination: '../../test/assets/.babelrc'
    };
    require('../../../src/Utils').renameFiles.call(context, files, {});
    t.is(files.template, '../../test/assets/.babelrc');
    t.is(files.destination, '../../test/assets/.babelrc');
});

let cssFiles;

test.beforeEach(() => {
    cssFiles = {
        template: 'src/file.css',
        destination: 'src/file.css'
    };
});

test('should rename .scss files', t => {
    require('../../../src/Utils').renameFiles.call(context, cssFiles, {css: 'scss' });
    t.is(cssFiles.template, 'src/file.scss');
    t.is(cssFiles.destination, 'src/file.scss');
});

test('should rename .less files', t => {
    require('../../../src/Utils').renameFiles.call(context, cssFiles, { css: 'less'});
    t.is(cssFiles.template, 'src/file.less');
    t.is(cssFiles.destination, 'src/file.less');
});

test('should rename .styl files', t => {
    require('../../../src/Utils').renameFiles.call(context, cssFiles, { css: 'styl' });
    t.is(cssFiles.template, 'src/file.styl');
    t.is(cssFiles.destination, 'src/file.styl');
});