//Inicijalizacija Angular aplikacije
var app = angular.module("VisualiseATM", [
 'ui.router'
, 'controllers'
, 'ngCookies'
, 'ngMap']);
//Angular rutiranje
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home'
        , templateUrl: 'views/home.html'
        , controller: 'HomeCtrl'
    }).state('vizualizacije', {
        url: '/vizualizacije'
        , templateUrl: 'views/vizualizacije.html'
        , controller: 'vizualizacijeCtrl'
    }).state('dodavanjeBankomata', {
        url: '/dodavanjeBankomata'
        , templateUrl: 'views/dodavanjeBankomata.html'
        , controller: 'dodavanjeBankomataCtrl'
    }).state('izmjenaBankomata', {
        url: '/izmjenaBankomata'
        , templateUrl: 'views/izmjenaBankomata.html'
        , controller: 'izmjenaBankomataCtrl'
    }).state('izmjenaBankomata.detalj', {
        url: "/:bankomatID",
        templateUrl: 'views/detaljBankomata.html',
        controller: 'izmjenaBankomataDetaljCtrl'
    }).state('izmjenaKorisnika', {
        url: '/izmjenaKorisnika'
        , templateUrl: 'views/izmjenaKorisnika.html'
        , controller: 'izmjenaKorisnikaCtrl'
    }).state('izmjenaKorisnika.detalji', {
        url: "/:korisnikID/:racunID",
        templateUrl: 'views/detaljKorisnika.html',
        controller: 'izmjenaKorisnikaDetaljCtrl'
    }).state('kreiranjeRacuna', {
        url: '/kreiranjeRacuna'
        , templateUrl: 'views/kreiranjeRacuna.html'
        , controller: 'kreiranjeRacunaCtrl'
    }).state('dodavanjeKorisnika', {
        url: '/dodavanjeKorisnika'
        , templateUrl: 'views/dodavanjeKorisnika.html'
        , controller: 'dodavanjeKorisnikaCtrl'
    }).state('lokacijeBankomata', {
        url: '/lokacijeBankomata'
        , templateUrl: 'views/lokacijeBankomata.html'
        , controller: 'lokacijeBankomataCtrl'
    }).state('topPetBankomata', {
        url: '/topPetBankomata'
        , templateUrl: 'views/topPetBankomata.html'
        , controller: 'topPetBankomataCtrl'
    }).state('pregledTransakcija', {
        url: '/pregledTransakcija'
        , templateUrl: 'views/pregledTransakcija.html'
        , controller: 'pregledTransakcijaCtrl'
    }).state('linePlusBarChart', {
        url: '/linePlusBarChart'
        , templateUrl: 'views/linePlusBarChart.html'
        , controller: 'linePlusBarChartCtrl'
    }).state('about.prvi', {
        url: '/prvi'
        , templateUrl: 'views/prvi.html'
    }).state('about.drugi', {
        url: '/drugi'
        , templateUrl: 'views/drugi.html'
    })
});
//Definiranje kontrolera, ostatak kontrolera u controllers.js
var Controllers = angular.module("controllers", []);