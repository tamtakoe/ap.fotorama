'use strict';

angular.module('ap.fotorama', [])

    .value('apFotoramaConfig',{
        //width:'100%', и проч. настройки по умолчанию
        //Имена полей в фотораме и приложении
        id:    'id',    //имя поля с id картинки
        thumb: 'thumb', //имя поля с миниатюрой
        img:   'img',   //имя поля с изображением
        full:  'full',  //имя поля с оригиналом
        active:'active', //указатель активной фотки
        domain: ''//'http://tamtakoe.ru/uploader/' //для кроссдоменных запросов
    })
    .directive('apFotorama', ['apFotoramaConfig', function (apFotoramaConfig) {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {

                function combineCallbacks (first, second) {
                    if (second && (typeof second === "function")) {
                        return function (e, ui) {
                            first(e, ui);
                            second(e, ui);
                        };
                    }
                    return first;
                }

                var opts = {}, collection;

                angular.extend(opts, apFotoramaConfig);

                element.bind('fotorama:load', function () {
                    //console.log('load')
                });
                element.bind('fotorama:showend', function (e) {

                    if (collection !== undefined && typeof scope[attrs.ngModel] === 'object') {
                        //Записываем в модель активную фотку
                        setActive(collection.activeIndex);

                        scope.$$phase || scope.$apply(); //Не всегда срабатывает в первый раз, если бы не было начального переключения на фотку
                    }
                });
                
                //Преобразование массивов данных в массивы, эквивалентные внутреннему массиву Фоторамы
                function makeFotoramaArray (res, update) {
                    var n = typeof res === 'object' ? res.length : 0,
                        activeIndex;
                    
                    for (var i = 0, nn = n, arr = [], ci; i < nn; i++) {
                        if (res[i].id !== undefined) {
                            ci = arr.push({}) - 1;
                            arr[ci].id    = res[i][opts.id];
                            arr[ci].thumb = res[i][opts.thumb] !== undefined ? opts.domain + res[i][opts.thumb] : res[i][opts.thumb];
                            arr[ci].img   = res[i][opts.img]   !== undefined ? opts.domain + res[i][opts.img]   : res[i][opts.thumb];
                            arr[ci].full  = res[i][opts.full]  !== undefined ? opts.domain + res[i][opts.full]  : res[i][opts.thumb];

                            if (res[ci][opts.active]) activeIndex = ci;
                            
                            if (update && collection.data) collection.splice(i, 1, arr[i]);
                            
                        } else {
                            n--;
                        }
                    }
                    return {arr: arr, arrLength: n, activeIndex: activeIndex}
                }
                
                function setActive (index) {
                    index = index === undefined && this !== undefined && this.$index !== undefined ? this.$index : index;

                    for (var i = 0, n = scope[attrs.ngModel].length; i < n; i++) {
                        scope[attrs.ngModel][i][opts.active] = index == i ? true : false;
                    }
                }
                scope.setActive = setActive;

                scope.$watch(attrs.ngModel, function (newVal, oldVal) {

                    /*var o = typeof oldVal === 'object' ? oldVal.length : 0,
                        n = typeof newVal === 'object' ? newVal.length : 0,
                        nArr = [], oArr = [], oKeys = {}, nKeys = {}, i, oi, ci, on, nn, activeIndex, oldActiveIndex;*/
                    
                    //Если модель изменилась, синхронизируем с ней Фотораму
                    if (oldVal !== newVal) {
                    
                      var oKeys = {}, nKeys = {}, i, oi, temp;

                      /*temp = makeFotoramaArray(oldVal);
                      var oArr           = temp.arr,
                          o              = temp.arrLength,
                          oldActiveIndex = temp.activeIndex;*/
                          
                      var oArr           = collection.data ? collection.data : [];
                      var o              = oArr.length,
                          oldActiveIndex = collection.activeIndex;   
                          
                      temp = makeFotoramaArray(newVal);
                      var nArr        = temp.arr,
                          n           = temp.arrLength,
                          activeIndex = temp.activeIndex;
                    
                        //Преобразование массивов данных в массивы, эквивалентные внутреннему массиву Фоторамы
                        /*for (i = 0, on = o; i < on; i++) {
                            if (oldVal[i].id !== undefined) {
                                ci = oArr.push({}) - 1;
                                oArr[ci].id    = oldVal[i][opts.id];
                                oArr[ci].thumb = opts.domain + oldVal[i][opts.thumb];
                                oArr[ci].img   = oldVal[i][opts.img]  !== undefined ? opts.domain + oldVal[i][opts.img]  : oldVal[i][opts.thumb];
                                oArr[ci].full  = oldVal[i][opts.full] !== undefined ? opts.domain + oldVal[i][opts.full] : oldVal[i][opts.thumb];
                                
                                if (oldVal[ci][opts.active]) oldActiveIndex = ci;
                            } else {
                                o--;
                            }
                        }
                        for (i = 0, nn = n; i < nn; i++) {
                            if (newVal[i].id !== undefined) {
                                ci = nArr.push({}) - 1;
                                nArr[ci].id    = newVal[i][opts.id];
                                nArr[ci].thumb = opts.domain + newVal[i][opts.thumb];
                                nArr[ci].img   = newVal[i][opts.img]  !== undefined ? opts.domain + newVal[i][opts.img]  : newVal[i][opts.thumb];
                                nArr[ci].full  = newVal[i][opts.full] !== undefined ? opts.domain + newVal[i][opts.full] : newVal[i][opts.thumb];
                                
                                if (newVal[ci][opts.active]) activeIndex = ci;
                            } else {
                                n--;
                            }
                        }
                        if (n && (!o || o && oArr[0].id === 'preloader')) {
                            //Если фоток не было или была одна с прелоадером, то инициализируем фотораму заново и обновляем настройки, т.к. они сбрасываются
                            collection.initialize(opts).load(nArr).setOptions(scope[attrs.uiFotorama])
                            //console.log('load data')
                            
                        } else*/ if (o) {

                            //Алгоритм преобразования массива фотографий в соответствии с моделью с минимальным количеством перестановок.
                            for (i = 0; i < o; i++) {
                                oKeys[oArr[i].id] = i;
                            }
                            for (i = 0; i < n; i++) {
                                nKeys[nArr[i].id] = i;
                            }
                            for (i = 0, oi = 0; i < n; i++, oi++) {
                                
                                if (oArr[oi] === undefined) oArr[oi] = {id: null};
                                
                                if (nArr[i].id !== oArr[oi].id) {
                                
                                    //Добавление нового элемента  
                                    if (oKeys[nArr[i].id] === undefined) {
                             
                                        collection.splice(i, 0, nArr[i]);
                                        oi--;
                                        //console.log('+add')
                                    }
                                    
                                    //Удаление элемента
                                    if (oi >= 0 && nKeys[oArr[oi].id] === undefined) {

                                        if (oldActiveIndex == oi && activeIndex === undefined) activeIndex = i !== n ? i : i-2; //меняем активную фотку, если она была удалена, на следующую/предыдущую
                                        collection.splice(i, 1);
                                        i--;
                                        //console.log('-del')
                                    }

                                    //Смена позиции
                                    if (i >= 0 && oKeys[nArr[i].id] !== undefined && nKeys[oArr[oi].id] !== undefined) {
                                    
                                        if ((oKeys[nArr[i].id] - oKeys[oArr[oi].id]) > (nKeys[oArr[oi].id] - nKeys[nArr[i].id])) {

                                            collection.splice(i, 0, nArr[i]);
                                            delete nKeys[nArr[i].id];
                                            oi--;
                                            //console.log('add')
                                        } else {
                                
                                            collection.splice(i, 1);
                                            delete oKeys[oArr[oi].id];
                                            i--;
                                            //console.log('del')
                                        }
                                    }
                                } else if (nArr[i].img !== oArr[oi].img) {
                                
                                    //Замена картинки
                                    collection.splice(i, 1, nArr[i]);
                                    //console.log('change')
                                }
                            }
                            
                            //Удаляем оставшиеся в конце элементы и меняем активную фотку, если она была удалена, на предыдущую
                            if (o > oi) collection.splice(n, o-(oi));
                            if (oldActiveIndex >= n && activeIndex === undefined) activeIndex = n-1;
                            
                            //Исправлено: Перезагружаем страницу, если удалены все фотки. Вынужденная мера, т.к. Фотораму после этого не запустить
                            //if (!n) location.reload();
      
                        } else if (n) {
                            //Если фоток не было, то инициализируем фотораму заново и обновляем настройки, т.к. они сбрасываются
                            collection.setOptions(opts).load(nArr).setOptions(scope[attrs.apFotorama]);
                            //console.log('load data')
                        } 

                        //Переключаемся на активную фотку
                        if (n) activeIndex !== undefined ? collection.show(activeIndex) : collection.show(0);
                        /*if (n) {
                          if (activeIndex !== undefined) {
                            console.log(activeIndex, oldActiveIndex, n-1)
                            if (oldActiveIndex == n-1 && activeIndex == 0) {
                              collection.show(1+oldActiveIndex);
                            }else{
                              collection.show(activeIndex);
                            }
                            
                          } else {
                            collection.show(0);
                          }
                        }*/
                    }
                    
                }, true);

                scope.$watch(attrs.apFotorama, function (newVal, oldVal) {
                  angular.extend(opts, apFotoramaConfig, newVal);
                  collection.setOptions(opts)
                  
                  if (newVal.thumb || newVal.img || newVal.full) {      
                      //Обновляем фотораму, если поменялись имена картинок
                      makeFotoramaArray(scope[attrs.ngModel], true);
                  }
                    //collection.setOptions(newVal);
                }, true);

                // Создаем фотораму
                collection = element.fotorama(opts).data('fotorama');
                
                //Копируем в настройки значения по умолчанию
                scope[attrs.apFotorama] = angular.extend({}, collection.options, scope[attrs.apFotorama]);
            }
        };
      }
    ]);