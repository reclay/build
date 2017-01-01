var gulp=require('gulp');
var uglify=require('gulp-uglify');
var sass=require('gulp-sass');
var cleanCss=require('gulp-clean-css');
var copy=require('gulp-copy');

//路径比grunt好写了
var path={
  js:"src/assets/js/",
  css:"src/assets/css/",
  sass:"src/assets/css/sass/",
  distAssets:"dist/assets/"
};
gulp.task('uglify',function(){
  gulp.src('src/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('sass',function(){
  gulp.src('src/assets/css/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/assets/css/'))
});

gulp.task('cleanCss',function () {
  gulp.src('src/assets/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/assets/css'))
});

//这样写似乎不够好，用多个pipe把多个task结合才更好
gulp.task('cleanSass',function () {
  gulp.src(path.sass+"*.scss")
    .pipe(sass())
    .pipe(gulp.dest(path.css))
    .pipe(cleanCss())
    .pipe(gulp.dest(path.distAssets+"css"))
});

//写完grunt来写gulp简直一身轻

gulp.task('watch',function(){
  gulp.watch([path.sass+"*.scss",path.sass+"**/*.scss"],['sass'])
});

//基于流，copy就很简单了，无需插件
gulp.task('copy',function(){
  gulp.src(['src/**','!src/assets/js/**','!src/assets/css/**'])
    .pipe(gulp.dest('dist/'))
});

gulp.task('build',function () {
  gulp.run('uglify','cleanCss','copy')
});

gulp.task('default',function () {
  gulp.run('watch');
});
//默认即可单个对应，于是不用grunt路径的expand
