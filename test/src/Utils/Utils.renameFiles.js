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

let jsFiles;

test.beforeEach(() => {
  jsFiles = {
    template: 'client/file.js',
    destination: 'client/file.js'
  };
});

test(`should rename files with js of 'babel'`, t => {
  require('../../../src/Utils').renameFiles.call(context, jsFiles, {js: 'babel'});
  t.is(jsFiles.template, 'client/file.babel');
  t.is(jsFiles.destination, 'client/file.js');
});

test(`should rename files with js of 'typescript' and framework different of 'react'`, t => {
  require('../../../src/Utils').renameFiles.call(context, jsFiles, {js: 'typescript', client: 'angular1'});
  t.is(jsFiles.template, 'client/file.ts');
  t.is(jsFiles.destination, 'client/file.ts');
});

test(`should rename files with js of 'typescript' and framework of 'react'`, t => {
  require('../../../src/Utils').renameFiles.call(context, jsFiles, {js: 'typescript', client: 'react'});
  t.is(jsFiles.template, 'client/file.tsx');
  t.is(jsFiles.destination, 'client/file.tsx');
});

let cssFiles;

test.beforeEach(() => {
  cssFiles = {
    template: 'client/file.css',
    destination: 'client/file.css'
  };
});

test('should rename .scss files', t => {
  require('../../../src/Utils').renameFiles.call(context, cssFiles, {css: 'scss'});
  t.is(cssFiles.template, 'client/file.scss');
  t.is(cssFiles.destination, 'client/file.scss');
});

test('should rename .less files', t => {
  require('../../../src/Utils').renameFiles.call(context, cssFiles, {css: 'less'});
  t.is(cssFiles.template, 'client/file.less');
  t.is(cssFiles.destination, 'client/file.less');
});

test('should rename .styl files', t => {
  require('../../../src/Utils').renameFiles.call(context, cssFiles, {css: 'styl'});
  t.is(cssFiles.template, 'client/file.styl');
  t.is(cssFiles.destination, 'client/file.styl');
});
