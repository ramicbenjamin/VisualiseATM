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
    }).state('topPetTransakcija', {
        url: '/topPetTransakcija'
        , templateUrl: 'views/topPetTransakcija.html'
        , controller: 'topPetTransakcijaCtrl'
    }).state('topBankomatiPoBrojuTransakcija', {
        url: '/topBankomatiPoBrojuTransakcija'
        , templateUrl: 'views/topBankomatiPoBrojuTransakcija.html'
        , controller: 'topBankomatiPoBrojuTransakcijaCtrl'
    }).state('udjeliKoristenihKartica', {
        url: '/udjeliKoristenihKartica'
        , templateUrl: 'views/udjeliKoristenihKartica.html'
        , controller: 'udjeliKoristenihKarticaCtrl'
    }).state('najkoristenijeKarticeKorisnici', {
        url: '/najkoristenijeKarticeKorisnici'
        , templateUrl: 'views/najkoristenijeKarticeKorisnici.html'
        , controller: 'najkoristenijeKarticeKorisniciCtrl'
    }).state('poredjenjeDvaBankomata', {
        url: '/poredjenjeDvaBankomata'
        , templateUrl: 'views/poredjenjeDvaBankomata.html'
        , controller: 'poredjenjeDvaBankomataCtrl'
    }).state('sveTransakcijeZaBankomat', {
        url: '/sveTransakcijeZaBankomat'
        , templateUrl: 'views/sveTransakcijeZaBankomat.html'
        , controller: 'sveTransakcijeZaBankomatCtrl'
    }).state('pregledTransakcija', {
        url: '/pregledTransakcija'
        , templateUrl: 'views/pregledTransakcija.html'
        , controller: 'pregledTransakcijaCtrl'
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