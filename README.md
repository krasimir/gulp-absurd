gulp-absurd
===========

## Information

<table>
<tr>
<td>Package</td><td>gulp-absurd</td>
</tr>
<tr>
<td>Description</td>
<td>AbsurdJS plugin for Gulp</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Install

```javascript
npm install gulp-absurd
```

## Usage

```javascript
var gulp = require('gulp');
var absurd = require('./gulp-absurd');

gulp.task('default', function() {
	gulp.src('./data/*.js')
	.pipe(absurd({
		minify: true
	}))
	.pipe(gulp.dest('./result'));
});
```

## Options

The object which is sent to the module is directly passed to AbsurdJS. So, for more information about the specific options check [https://github.com/krasimir/absurd](https://github.com/krasimir/absurd)

## Tests

```
> npm install -g mocha
> mocha
```