ap.fotorama — AngularJS [Fotorama](http://fotorama.io/) module
=======

☛ [Русская документация](https://github.com/tamtakoe/oi.file/wiki/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B0%D1%8F-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F)

## Key features

* File selection from explorer/finder and by drag'n'drop
* Validation
* Image upload before posting to server (if browser supports FileReader)
* Image upload via xhr and iframe (for older browsers)
* Files data are embedded into a model, but can be read separately
* Files are uploaded using POST method, each request per file
* For AngularJS 1.2+, but there is `oi.file.old.js` for old versions

[Demo](http://tamtakoe.ru/uploader/fotorama.html), [sandbox](http://plnkr.co/edit/hHQfk4C9VlSigwrKcr4C?p=preview)

## Usage

Angular module dependency:
```javascript
angular.module('myApp', ['ap.fotorama']);
```

As a directive:
```html
<div ap-fotorama="options" ng-model="items">
```

Fotorama setup in controller:
```javascript
$scope.items = [{img: 'iurl', thumb: 'turl', full: 'furl'}, {...}, ...]; //Model
$scope.options = {width: '100%', height: 400, loop: true, keyboard: true, nav: 'thumbs'};
}
```

Default settings can be overridden in a service variable `apFotoramaConfig`

## Setting up
- **width** `{string}` - `null` Fotorama width  (500 || '100%')
- **minwidth** `{string}` - `null`
- **maxwidth** `{string}` - `100%` ('100%')
- **width** `{string}` - `null` Fotorama height
- **minheight** `{string}` - `null`
- **maxheight** `{string}` - `null`

- **ratio** `{string}` - `null` ('16/9' || 500/333 || 1.5)

- **margin** `{string}` - `2`
- **glimpse** `{string}` - `0`

// navigation, thumbs
- **nav** `{string}` - `dots` ('thumbs' || false)
- **navposition** `{string}` - `bottom` ('top')
- **thumbwidth** `{string}` - `64`
- **thumbheight** `{string}` - `64`
- **thumbmargin** `{string}` - `2`
- **thumbborderwidth** `{string}` - `2`

- **allowfullscreen** `{string}` - `false` (true || 'native')

- **fit** `{string}` - `contain` ('cover' || 'scaledown' || 'none')

- **transition** `{string}` - `slide` ('crossfade' || 'dissolve')
- **transitionduration** `{string}` - `300`

- **captions** `{string}` - `true`

- **hash** `{string}` - `false`
- **startindex** `{string}` - `0`

- **loop** `{string}` - `false`

- **autoplay** `{string}` - `false`
- **stopautoplayontouch** `{string}` - `true`

- **keyboard** `{string}` - `false`

- **arrows** `{string}` - `true`
- **click** `{string}` - `true`
- **swipe** `{string}` - `true`
- **trackpad** `{string}` - `true`

- **shuffle** `{string}` - `false`

- **direction** `{string}` - `ltr` ('rtl')

- **shadows** `{string}` - `true`

- **id** `{string}` - `id`      Имя поля с id картинки
- **thumb** `{string}` - `thumb`  Имя поля с миниатюрой
- **img** `{string}` - `image'   Имя поля с изображением
- **full** `{string}` - `original` Имя поля с оригиналом
- **caption** `{string}` - `caption` Имя поля с заголовком
- **active** `{string}` - `active` Указатель активной фотки
- **domain** `{string}` - `` Для кроссдоменных запросов ('http://domain.name')