'use strict';

const _ = require('lodash');
const json = require('./json2js').json;

exports.mergeJson = function (fileName, newContent) {
    const content = this.fs.readJSON(this.destinationPath(fileName), {});

    _.mergeWith(content, newContent, (a, b) => {
        if (_.isArray(a)) {
            return _.uniq(a.concat(b));
        }
    });

    this.fs.writeJSON(this.destinationPath(fileName), content);
};

exports.getExtensions = function (props) {
    const extensions = {
        js: 'ts',
        css: 'less'
    };
    if (props.framework === 'react') {
        extensions.js = props.js === 'typescript' ? 'tsx' : 'js';
    } else {
        extensions.js = props.js === 'typescript' ? 'ts' : 'js';
    }
    extensions.css = props.css;
    return extensions;
};

exports.copyTemplate = function (templateFileName, destinationFileName, templateScope) {
    const scope = Object.assign({}, {
        json,
        version: require('../package.json').version,
        date: new Date().toString(),
        extensions: exports.getExtensions(this.options)
    }, this.options, templateScope);

    const files = {
        template: templateFileName,
        destination: destinationFileName
    };

    exports.renameFiles(files, scope);

    this.fs.copyTpl(
        this.templatePath(files.template),
        this.destinationPath(files.destination),
        scope
    );
};

exports.renameFiles = function (files, props) {
    if (/^.*\.(css)$/.test(files.template)) {
        if (props.css === 'scss') {
            files.template = files.template.replace(/\.css$/, '.scss');
            files.destination = files.destination.replace(/\.css$/, '.scss');
        }
        if (props.css === 'less') {
            files.template = files.template.replace(/\.css$/, '.less');
            files.destination = files.destination.replace(/\.css$/, '.less');
        }
        if (props.css === 'styl') {
            files.template = files.template.replace(/\.css$/, '.styl');
            files.destination = files.destination.replace(/\.css$/, '.styl');
        }
    }
};