//Inicijalizacija Angular aplikacije
var app = angular.module("VisualiseATM", [
 'ui.router'
, 'controllers'
, 'ngCookies'
, 'ngMap']);
//Angular rutiranje
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('dashboard', {
        url: '/dashboard'
        , templateUrl: 'dashboard.html'
        , controller: 'dashboardCtrl'
    }).state('dashboard.home', {
        url: '/home'
        , templateUrl: 'views/home.html'
        , controller: 'HomeCtrl'
    }).state('login', {
        url: '/login'
        , templateUrl: 'login.html'
        , controller: 'loginCtrl'
    })
        
        .state('dashboard.dodavanjeBankomata', {
        url: '/dodavanjeBankomata'
        , templateUrl: 'views/dodavanjeBankomata.html'
        , controller: 'dodavanjeBankomataCtrl'
    }).state('dashboard.izmjenaBankomata', {
        url: '/izmjenaBankomata'
        , templateUrl: 'views/izmjenaBankomata.html'
        , controller: 'izmjenaBankomataCtrl'
    }).state('dashboard.izmjenaBankomata.detalj', {
        url: "/:bankomatID",
        templateUrl: 'views/detaljBankomata.html',
        controller: 'izmjenaBankomataDetaljCtrl'
    }).state('dashboard.izmjenaKorisnika', {
        url: '/izmjenaKorisnika'
        , templateUrl: 'views/izmjenaKorisnika.html'
        , controller: 'izmjenaKorisnikaCtrl'
    }).state('dashboard.izmjenaKorisnika.detalji', {
        url: "/:korisnikID/:racunID",
        templateUrl: 'views/detaljKorisnika.html',
        controller: 'izmjenaKorisnikaDetaljCtrl'
    }).state('dashboard.kreiranjeRacuna', {
        url: '/kreiranjeRacuna'
        , templateUrl: 'views/kreiranjeRacuna.html'
        , controller: 'kreiranjeRacunaCtrl'
    }).state('dashboard.dodavanjeKorisnika', {
        url: '/dodavanjeKorisnika'
        , templateUrl: 'views/dodavanjeKorisnika.html'
        , controller: 'dodavanjeKorisnikaCtrl'
    }).state('dashboard.lokacijeBankomata', {
        url: '/lokacijeBankomata'
        , templateUrl: 'views/lokacijeBankomata.html'
        , controller: 'lokacijeBankomataCtrl'
    }).state('dashboard.topPetTransakcija', {
        url: '/topPetTransakcija'
        , templateUrl: 'views/topPetTransakcija.html'
        , controller: 'topPetTransakcijaCtrl'
    }).state('dashboard.topBankomatiPoBrojuTransakcija', {
        url: '/topBankomatiPoBrojuTransakcija'
        , templateUrl: 'views/topBankomatiPoBrojuTransakcija.html'
        , controller: 'topBankomatiPoBrojuTransakcijaCtrl'
    }).state('dashboard.stanjeNovcanica', {
        url: '/stanjeNovcanica'
        , templateUrl: 'views/stanjeNovcanica.html'
        , controller: 'stanjeNovcanicaCtrl'
    }).state('dashboard.udjeliKoristenihKartica', {
        url: '/udjeliKoristenihKartica'
        , templateUrl: 'views/udjeliKoristenihKartica.html'
        , controller: 'udjeliKoristenihKarticaCtrl'
    }).state('dashboard.najkoristenijeKarticeKorisnici', {
        url: '/najkoristenijeKarticeKorisnici'
        , templateUrl: 'views/najkoristenijeKarticeKorisnici.html'
        , controller: 'najkoristenijeKarticeKorisniciCtrl'
    }).state('dashboard.poredjenjeDvaBankomata', {
        url: '/poredjenjeDvaBankomata'
        , templateUrl: 'views/poredjenjeDvaBankomata.html'
        , controller: 'poredjenjeDvaBankomataCtrl'
    }).state('dashboard.sveTransakcijeZaBankomat', {
        url: '/sveTransakcijeZaBankomat'
        , templateUrl: 'views/sveTransakcijeZaBankomat.html'
        , controller: 'sveTransakcijeZaBankomatCtrl'
    }).state('dashboard.pregledTransakcija', {
        url: '/pregledTransakcija'
        , templateUrl: 'views/pregledTransakcija.html'
        , controller: 'pregledTransakcijaCtrl'
    }).state('dashboard.about.prvi', {
        url: '/prvi'
        , templateUrl: 'views/prvi.html'
    }).state('dashboard.about.drugi', {
        url: '/drugi'
        , templateUrl: 'views/drugi.html'
    })
});
//Definiranje kontrolera, ostatak kontrolera u controllers.js
var Controllers = angular.module("controllers", []);