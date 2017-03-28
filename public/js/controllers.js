//HOME CTRL
Controllers.controller('HomeCtrl', [
    '$scope'
    , '$location'
    , '$cookies'
    , '$rootScope'
    , '$http'
    , function ($scope, $location, $cookies, $rootScope, $http) {
        $http({
            method: 'GET'
            , url: '/api/dajSveKorisnike'
        }).then(function successCallback(response) {
            $scope.response = response.data;
            $scope.imenaIzBaze = response.data;
        }, function errorCallback(response) {
            $scope.naziv = response;
        });
    }
]);
//VIZUALIZACIJE CTRL
Controllers.controller("vizualizacijeCtrl", [
    '$scope'
    , '$http'
    , function ($scope, $http) {
        $scope.num1 = 1;
        $scope.num2 = 3;
        $scope.update = function () {
            nv.addGraph(function () {
                var chart = nv.models.pieChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).showLabels(true);
                d3.select("#chart svg").datum([
                    {
                        "label": $scope.num1
                        , "value": $scope.num1
                        }
                    , {
                        "label": $scope.num2
                        , "value": $scope.num2
                        }
                    ]).transition().duration(1200).call(chart);
                return chart;
            });
        }
    }
]);
//LINE PLUS BAR CHART CTRL
Controllers.controller("linePlusBarChartCtrl", [
    '$scope'
    , '$http'
    , function ($scope, $http) {
        var $data = 0;
        $http({
            method: 'GET'
            , url: '/api/dajDatu'
        }).then(function successCallback(response) {
            console.log(response.data);
            $data = response.data;
            nv.addGraph(function () {
                var chart = nv.models.linePlusBarChart().margin({
                    top: 30
                    , right: 60
                    , bottom: 50
                    , left: 70
                }).x(function (d, i) {
                    return i
                }).y(function (d) {
                    return d[1]
                }).color(d3.scale.category10().range());
                chart.xAxis.showMaxMin(false).tickFormat(function (d) {
                    var dx = $data[0].values[d] && $data[0].values[d][0] || 0;
                    return d3.time.format('%x')(new Date())
                });
                chart.y1Axis.tickFormat(d3.format(',f'));
                chart.y2Axis.tickFormat(function (d) {
                    return '$' + d3.format(',f')(d)
                });
                chart.bars.forceY([0]);
                d3.select('#chart svg').datum($data).transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        }, function errorCallback(response) {
            $scope.data = response;
        });
    }
]);
Controllers.controller('pregledTransakcijaCtrl', [
    '$scope'
    , '$http'
    , function ($scope, $http)
    {
        $scope.transakcije = [{
            "brTrans": 5
            , "kolicinaNov": 10
            , "datum": '1/1/2017'
        }, {
            "brTrans": 5
            , "kolicinaNov": 10
            , "datum": '1/5/2017'
        }, {
            "brTrans": 5
            , "kolicinaNov": 10
            , "datum": '1/3/2017'
        }];
    }

]);
Controllers.controller('dodavanjeBankomataCtrl', [
    '$scope'
    , '$http'
    , 'NgMap'
    , function ($scope, $http, NgMap)
    {
        var lat = 0;
        var lng = 0;
        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAsoQGoDwX9elFvUw8_FkrjjnBWCE8JUjI";
        NgMap.getMap().then(function (map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
        $scope.IspisiLokaciju = function (event) {
            //            console.log(event.latLng.lat());
            //            console.log(event.latLng.lng());
            lat = event.latLng.lat();
            lng = event.latLng.lng();
            console.log(lat);
            console.log(lng);
        }
        $scope.tmpBankomat = {};
        $scope.unesiBankomat = function () {
            $http({
                method: 'POST'
                , data: {
                    kolicinaNovca: $scope.tmpBankomat.kolicinaNovca
                    , lokacija: $scope.tmpBankomat.lokacija
                    , lozinka: $scope.tmpBankomat.lozinka
                    , lat: lat
                    , lng: lng
                }
                , url: '/api/dodajBankomat'
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        }
}]);
//LOKACIJE BANKOMATA CONTROLLER
Controllers.controller('lokacijeBankomataCtrl', [
    '$scope'
    , '$http'
    , 'NgMap'
    , function ($scope, $http, NgMap)
    {
        $scope.ispisi = function (ajdi) {
            console.log(ajdi);
        }
        $http({
            method: 'GET'
            , url: '/api/dajSveBankomate'
        }).then(function successCallback(response) {
            $scope.bankomati = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $scope.showData = function () {
            alert(this.data);
        }
}]);
//Dodavanje korisnika
Controllers.controller('dodavanjeKorisnikaCtrl', [
    '$scope'
    , '$http'
    , function ($scope, $http)
    {
        $scope.tmpKorisnik = {};
        $scope.dodajKorisnika = function () {
            console.log('prošo');
            $http({
                method: 'POST'
                , data: {
                    ime: $scope.tmpKorisnik.ime
                    , prezime: $scope.tmpKorisnik.prezime
                    , korisnickoIme: $scope.tmpKorisnik.korisnickoIme
                    , lozinka: $scope.tmpKorisnik.lozinka
                }
                , url: '/api/dodajKorisnika'
            }).then(function successCallback(response) {
                $scope.bankomati = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        }
}]);
//Dodavanje računa
Controllers.controller('kreiranjeRacunaCtrl', [
    '$scope'
    , '$http'
    , function ($scope, $http)
    {
        $http({
            method: 'GET'
            , url: '/api/dajSveKorisnike'
        }).then(function successCallback(response) {
            $scope.korisnici = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $http({
            method: 'GET'
            , url: '/api/dajSveTipoveKartica'
        }).then(function successCallback(response) {
            $scope.kartice = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $scope.ispisi = function () {
            console.log($scope.korisnik.idKorisnik);
        }
        $scope.ispisiKarticu = function () {
            console.log($scope.kartica.idTipKartice);
        }
        $scope.kreirajRacun = function () {
            $http({
                method: 'POST'
                , data: {
                    korisnik: $scope.korisnik.idKorisnik
                    , brojKartice: $scope.tmpKartica.brojKartice
                    , PIN: $scope.tmpKartica.PIN
                    , tipKartice: $scope.kartica.idTipKartice
                    , kolicinaNovca: $scope.tmpRacun.kolicinaNovca
                }
                , url: '/api/kreirajRacun'
            }).then(function successCallback(response) {
                console.log(response)
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
]);

Controllers.controller('izmjenaBankomataCtrl', [
    '$scope'
    , '$http'
    , '$location'
    , function ($scope, $http, $location)
    {
        $http({
            method: 'GET'
            , url: '/api/dajSveBankomate'
        }).then(function successCallback(response) {
            $scope.bankomati = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $scope.ispisiBankomat = function () {
            var editLink = '/izmjenaBankomata/' + $scope.bankomat.idBankomat;
            $location.path(editLink);
        }
    }
]);
Controllers.controller('izmjenaBankomataDetaljCtrl', [
    '$scope'
    , '$http'
    , '$stateParams'
    , function ($scope, $http, $stateParams)
    {
       
        var urlPoziv = '/api/dajBankomat/' + $stateParams.bankomatID;
        $http({
            method: 'GET'
            , url: urlPoziv
        }).then(function successCallback(response) {
            $scope.bankomati = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        
        $scope.promijeniStanje = function () {
            $http({
                method: 'POST',
                data : {
                    idBankomataZaPunjenje : $stateParams.bankomatID,
                    novaKolicinaNovca : $scope.novaVrijednost
                }
                , url: 'api/napuniBankomat'
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
]);


Controllers.controller('izmjenaKorisnikaCtrl', [
    '$scope'
    , '$http'
    , '$location'
    , function ($scope, $http, $location)
    {
        $http({
            method: 'GET'
            , url: '/api/dajSveKorisnike'
        }).then(function successCallback(response) {
            $scope.korisnici = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $scope.ispisiKorisnika = function () {
            var editLink = '/izmjenaKorisnika/' + $scope.korisnik.idKorisnik;
            $location.path(editLink);
        }
    }
]); 
Controllers.controller('izmjenaKorisnikaDetaljCtrl', [
    '$scope'
    , '$http'
    , '$stateParams'
    , function ($scope, $http, $stateParams)
    {
       
        var urlPoziv = '/api/dajKorisnika/' + $stateParams.korisnikID;
        
        $http({
            method: 'GET'
            , url: urlPoziv
        }).then(function successCallback(response) {
            $scope.korisnici = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        
        $scope.promijeniStanje = function () {
            $http({
                method: 'POST',
                data : {
                    idKorisnika : $stateParams.korisnikID,
                    novaKolicinaNovca : $scope.novaVrijednost
                }
                , url: 'api/promijeniStanjeRacuna'
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
]);