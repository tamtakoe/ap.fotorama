ap.fotorama — AngularJS [Fotorama](http://fotorama.io/)
=======

☛ [Русская документация](https://github.com/tamtakoe/ap.fotorama/wiki/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B0%D1%8F-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F)

## Description

Angular module for Fotorama jQuery plugin

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
$scope.options = {
  width: '100%',
  height: 400,
  loop: true,
  keyboard: true,
  nav: 'thumbs'
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

navigation, thumbs
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

rewinding
- **arrows** `{string}` - `true`
- **click** `{string}` - `true`
- **swipe** `{string}` - `true`
- **trackpad** `{string}` - `true`

- **shuffle** `{string}` - `false`

- **direction** `{string}` - `ltr` ('rtl')

- **shadows** `{string}` - `true`

fields
- **id** `{string}` - `id`      Name of image id field
- **thumb** `{string}` - `thumb`  Name of thumb field
- **img** `{string}` - `image'   Name of image field
- **full** `{string}` - `original` Name of original field
- **caption** `{string}` - `caption` Name of caption field
- **active** `{string}` - `active` Name of active image index

- **domain** `{string}` - `` For crossdomain requests ('http://domain.name')