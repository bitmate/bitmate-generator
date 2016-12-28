const test = require('ava');
const Utils = require('../../test-helper');

let context;

test.beforeEach(() => {
  context = Utils.mock();
  context.writeJSON = {};
  context.write = {};
});

test('Add <link> tag before </head>', t => {
  const FileUtils = require('../../../src/Utils');
  const getExtensions = FileUtils.getExtensions;
  FileUtils.getExtensions = () => {
    return {js: 'babel', modules: 'webpack', framework: 'react', css: 'css'};
  };
  const replaceInFileWithTemplate = FileUtils.replaceInFileWithTemplate;
  replaceInFileWithTemplate.call(context, '../test/assets/index-head.html', '../test/assets/index.html', /<\/head>/);
  t.true(context.write[context.templatePath('../test/assets/index.html')].indexOf('<link rel="stylesheet" href="index.css"/>') > -1);
  FileUtils.getExtensions = getExtensions;
});
