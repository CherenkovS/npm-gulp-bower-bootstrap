var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/scss/style.scss') // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		// .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css')) // Выгружаем результат в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('sass-libs', function(){ // Создаем таск Sass
	return gulp.src('src/scss/librery.scss') // Берем источник
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css')) // Выгружаем результат в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
		'bower_components/slick-carousel/slick/slick.js',
		'bower_components/remodal/dist/remodal.min.js',
		'bower_components/sweetalert/dist/sweetalert.min.js'
		])
		.pipe(concat('librery.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});

gulp.task('watch', ['browser-sync', 'scripts'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass', 'sass-libs']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/*.php', browserSync.reload); // Наблюдение за PHP файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);  // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('public'); // Удаляем папку public перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('public/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'sass-libs', 'scripts'], function() {

	var buildCss = gulp.src('src/css/*')
	.pipe(gulp.dest('public/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('public/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('public/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('public'))

	var buildHtml = gulp.src('src/*.php') // Переносим HTML в продакшен
	.pipe(gulp.dest('public'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
