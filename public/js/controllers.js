//HOME CTRL
Controllers.controller('HomeCtrl', [
    '$scope'
    , '$location'
    , '$cookies'
    , '$rootScope'
    , '$http'
    , 'NgMap'



    
    , function ($scope, $location, $cookies, $rootScope, $http, NgMap) {
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
            $http({
            method: 'GET'
            , url: '/api/dajSveBankomate'
        }).then(function successCallback(response) {
            $scope.bankomati = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
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
                method: 'POST'
                , data: {
                    idBankomataZaPunjenje: $stateParams.bankomatID
                    , novaKolicinaNovca: $scope.novaVrijednost
                }
                , url: 'api/napuniBankomat'
            }).then(function successCallback(response) {
                console.log(response);
                $scope.bankomat.kolicinaNovca = $scope.novaVrijednost;
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
        $scope.jeLiSkriven = true;
        $http({
            method: 'GET'
            , url: '/api/dajSveKorisnike'
        }).then(function successCallback(response) {
            $scope.korisnici = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $scope.ispisiRacune = function () {
            var urlRacuna = '/api/dajSveRacune/' + $scope.korisnik.idKorisnik;
            $http({
                method: 'GET'
                , url: urlRacuna
            }).then(function successCallback(response) {
                $scope.racuni = response.data;
                $scope.jeLiSkriven = false;
            }, function errorCallback(response) {
                console.log(response);
            });
        }
        $scope.ispisiDetaljeRacuna = function () {
            var editLink = '/izmjenaKorisnika/' + $scope.korisnik.idKorisnik + "/" + $scope.racun.idRacun;
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
        $scope.promijeniStanje = function () {
            $http({
                method: 'POST'
                , data: {
                    idKorisnika: $stateParams.korisnikID
                    , idRacuna: $stateParams.racunID
                    , novaKolicinaNovca: $scope.novaVrijednost
                }
                , url: 'api/promijeniStanjeRacuna'
            }).then(function successCallback(response) {
                console.log(response);
                $scope.racun.kolicinaNovca = $scope.novaVrijednost;
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
]);
Controllers.controller('topPetTransakcijaCtrl', [
    '$scope'
    , '$http'
    , '$stateParams'




    
    , function ($scope, $http, $stateParams)
    {
        $http({
            method: 'GET'
            , url: 'api/dajTopTransakcije'
        }).then(function successCallback(response) {
            $scope.transakcije = response.data;
            nv.addGraph(function () {
                var chart = nv.models.pieChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).showLabels(true);
                d3.select("#pieChart svg").datum($scope.transakcije).transition().duration(1200).call(chart);
                return chart;
            });
            var podaciZaBarChart = [];
            podaciZaBarChart.key = "Cumulative Return";
            podaciZaBarChart.values = $scope.transakcije;
            console.log(podaciZaBarChart);
            var podaciNovi = [];
            podaciNovi.push(podaciZaBarChart);
            nv.addGraph(function () {
                var chart = nv.models.discreteBarChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).staggerLabels(true).tooltips(false).showValues(true)
                d3.select('#barChart svg').datum(podaciNovi).transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
]);
Controllers.controller('poredjenjeDvaBankomataCtrl', [
    '$scope'
    , '$http'
    , function ($scope, $http)
    {
        var pod = [{}, {}];
        $http({
            method: 'GET'
            , url: '/api/dajSveBankomate'
        }).then(function successCallback(response) {
            $scope.bankomati = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        
        $scope.selektujBankomat = function(id, naziv, boja, koji) {
            var url1 = '/api/dajTransakcijuBankomata/' + id;
            $http({
                method: 'GET'
                , url: url1
            }).then(function successCallback(response) {
                $scope.rezultati = (response.data);
                pod[koji] = {
                    "key" : naziv,
                    "color" : boja,
                    "values" : $scope.rezultati
                };
            }, function errorCallback(response) {
                console.log(response);
            }); 
        }
        
        $scope.selektujBankomat1 = function () {
            $scope.selektujBankomat($scope.bankomat1.idBankomat, "Prvi bankomat", "#d62325", 0);
        }
        
        $scope.selektujBankomat2 = function () {
            $scope.selektujBankomat($scope.bankomat2.idBankomat, "Drugi bankomat", "#1f77b4", 1);
        }
        $scope.uporedi = function () {     
            nv.addGraph(function () {
                var chart = nv.models.multiBarHorizontalChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).margin({
                    top: 30
                    , right: 20
                    , bottom: 50
                    , left: 175
                }).showValues(true).tooltips(false).showControls(false);
                chart.yAxis.tickFormat(d3.format(',.2f'));
                d3.select('#uporedbaDvaBankomata svg').datum(pod).transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        }
    }
]);

Controllers.controller('topBankomatiPoBrojuTransakcijaCtrl', [
   '$scope'
    ,'$http'
    ,function($scope, $http)
    {
             $http({
            method: 'GET'
            , url: 'api/dajTopBankomatePoBrojuTransakcija'
        }).then(function successCallback(response) {
            $scope.topBankomati = response.data;
            var podaciZaBarChart = [];
            podaciZaBarChart.key = "Nesto";
            podaciZaBarChart.values = $scope.topBankomati;
            console.log(podaciZaBarChart);
            var podaciNovi = [];
            podaciNovi.push(podaciZaBarChart);
            nv.addGraph(function () {
                var chart = nv.models.discreteBarChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).staggerLabels(true).tooltips(false).showValues(true)
                d3.select('#barChartTopBankomataPoTrasnakcijama svg').datum(podaciNovi).transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
]);

Controllers.controller('sveTransakcijeZaBankomatCtrl', [
    '$scope'
    ,'$http'
    ,function($scope, $http)
    {
        $http({
            method: 'GET'
            , url: '/api/dajSveBankomate'
        }).then(function successCallback(response) {
            $scope.bankomati = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
        $scope.selektujBankomat = function () {
                $http({
                method: 'GET'
                , url: '/api/dajSveTransakcijeSaBankomata/' + $scope.bankomat.idBankomat
            }).then(function successCallback(response) {
                $scope.sveTransakcije = response.data;
                  var podaciZaBarChart = [];
                podaciZaBarChart.key = "Nesto";
                podaciZaBarChart.values = $scope.sveTransakcije;
                var podaciNovi = [];
                podaciNovi.push(podaciZaBarChart);
                nv.addGraph(function () {
                    var chart = nv.models.discreteBarChart().x(function (d) {
                        return d.label
                    }).y(function (d) {
                        return d.value
                    }).staggerLabels(true).tooltips(false).showValues(true)
                    d3.select('#barChartSvihTransakcijaZaBankomat svg').datum(podaciNovi).transition().duration(500).call(chart);
                    nv.utils.windowResize(chart.update);
                    return chart;
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
]);

