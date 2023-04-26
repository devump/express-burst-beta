const { src, dest, series } = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function clean(cb) {
    del.sync(['out']);
    cb();
}

function build() {
    return src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('out/'));
}

exports.default = series(clean, build);