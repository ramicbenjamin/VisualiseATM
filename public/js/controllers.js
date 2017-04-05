//HOME CTRL
Controllers.controller('HomeCtrl', [
    '$scope'
    , '$location'
    , '$cookies'
    , '$rootScope'
    , '$http'
    , 'NgMap'
    , function ($scope, $location, $cookies, $rootScope, $http, NgMap) {

    }
]);


//VIZUALIZACIJE CTRL
Controllers.controller('pregledTransakcijaCtrl', [
    '$scope'
    , '$http'
    
    , function ($scope, $http)
    {
        $http({
            method: 'GET'
            , url: '/api/dajSveTransakcijeSaImenima'
        }).then(function successCallback(response) {
            $scope.sveTransakcije = response.data;
        }, function errorCallback(response) {
            $scope.naziv = response;
        });
    }

]);
Controllers.controller('dodavanjeBankomataCtrl', [
    '$scope'
    , '$http'
    , 'NgMap'
    , '$location'
    , function ($scope, $http, NgMap, $location)
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
            var MasterCard = document.getElementById("MasterCard").checked;
            var Visa = document.getElementById("Visa").checked;
            var Maestro = document.getElementById("Maestro").checked;
            $http({
                method: 'POST'
                , data: {
                    kolicinaNovca: $scope.tmpBankomat.kolicinaNovca
                    , lokacija: $scope.tmpBankomat.lokacija
                    , lozinka: $scope.tmpBankomat.lozinka
                    , lat: lat
                    , lng: lng
                    , MasterCard : MasterCard
                    , Visa : Visa
                    , Maestro : Maestro
                }
                , url: '/api/dodajBankomat'
            }).then(function successCallback(response) {
                console.log(response);
                $location.url('/lokacijeBankomata');
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
            var admin = document.getElementById("jelAdministrator").checked;
            $http({
                method: 'POST'
                , data: {
                    ime: $scope.tmpKorisnik.ime
                    , prezime: $scope.tmpKorisnik.prezime
                    , korisnickoIme: $scope.tmpKorisnik.korisnickoIme
                    , lozinka: $scope.tmpKorisnik.lozinka
                    , admin : admin
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

Controllers.controller('udjeliKoristenihKarticaCtrl', [
   '$scope'
    ,'$http'
    ,function ($scope, $http)
    {
        $http({
            method: 'GET'
            , url: 'api/dajUdjeleKoristenihKartica'
        }).then(function successCallback(response) {
            $scope.kartice = response.data;
            nv.addGraph(function () {
                var chart = nv.models.pieChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).showLabels(true);
                d3.select("#pieChartKartice svg").datum($scope.kartice).transition().duration(1200).call(chart);
                return chart;
            });
            var podaciZaBarChart = [];
            podaciZaBarChart.key = "Cumulative Return";
            podaciZaBarChart.values = $scope.kartice;
            console.log(podaciZaBarChart);
            var podaciNovi = [];
            podaciNovi.push(podaciZaBarChart);
            nv.addGraph(function () {
                var chart = nv.models.discreteBarChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).staggerLabels(true).tooltips(false).showValues(true)
                d3.select('#barChartKartice svg').datum(podaciNovi).transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
]);

Controllers.controller('najkoristenijeKarticeKorisniciCtrl', [
    '$scope'
    ,'$http'
    ,function($scope, $http)
    {
        $http({
            method: 'GET'
            , url: 'api/najkoristenijeKarticeKorisnici'
        }).then(function successCallback(response) {
            $scope.kartice = response.data;
            nv.addGraph(function () {
                var chart = nv.models.pieChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).showLabels(true);
                d3.select("#pieChartKarticeKorisnici svg").datum($scope.kartice).transition().duration(1200).call(chart);
                return chart;
            });
            var podaciZaBarChart = [];
            podaciZaBarChart.key = "Cumulative Return";
            podaciZaBarChart.values = $scope.kartice;
            console.log(podaciZaBarChart);
            var podaciNovi = [];
            podaciNovi.push(podaciZaBarChart);
            nv.addGraph(function () {
                var chart = nv.models.discreteBarChart().x(function (d) {
                    return d.label
                }).y(function (d) {
                    return d.value
                }).staggerLabels(true).tooltips(false).showValues(true)
                d3.select('#barChartKarticeKorisnici svg').datum(podaciNovi).transition().duration(500).call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });
        }, function errorCallback(response) {
            console.log(response);
        });
    }
]);