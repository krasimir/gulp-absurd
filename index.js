var absurd = require('absurd')();
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');
var File = gutil.File;

module.exports = function (options) {

    options = options || {};

    function transform (file, enc, next) {
        var self = this;

        if (file.isNull()) {
            this.push(file); // pass along
            return next();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-absurd', 'Streaming not supported'));
            return next();
        }

        var targetExt = '.css';

        absurd.flush();

        if(options.morph) {
            absurd.morph(options.morph);
            targetExt = '.' + options.morph;
        }

        absurd.import(file.path).compile(function(err, result) {
            if(err) {
                self.emit('error', new PluginError('gulp-absurd', err));
            } else {
                file.contents = new Buffer(result);
                file.path = gutil.replaceExtension(file.path, targetExt);
                self.push(file);
            }
            next();
        }, options);

    }

    return through2.obj(transform);
};