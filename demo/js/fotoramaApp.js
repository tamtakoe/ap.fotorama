'use strict';

/* App Module */

angular.module('fotoramaApp', ['ngResource', 'oi.list', 'oi.file', 'ap.fotorama', 'ui.sortable', 'ui.filters'])

    .factory('Files', function ($resource) {
        return $resource('action.php/files/:fileId', {fileId:'@id'}, {
            add: {method: 'PUT'}
        })
    })

    .controller('MyCtrl', ['$scope', 'Files', 'oiList', function ($scope, Files, oiList) {
        
        var url = 'action.php/files/';
        
        oiList($scope, url, Files, {fields: {thumb: 'files_thumb/preloader.gif'}});
        
        $scope.fotoramaoptions = {width: '100%', height: 400, loop: true, keyboard: true, nav: 'thumbs', show: function () {console.log('show')}};
        
        $scope.uploadoptions = {
          change: function (file) {
            //Создаем пустой элемент для будущего файла
            $scope.add('after', function (i, data) {
            
              file.$preview($scope.items[i]);
              
              file.$upload(url + data.id, $scope.items[i], data.settings).catch(function (data) {
                $scope.errors = angular.isArray($scope.errors) ? $scope.errors.concat(data.response) : [].concat(data.response);
                $scope.del($scope.getIndexById(data.item.id));
              })
            })
          }
        }
    }])
