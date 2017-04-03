var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Dohvatanje post podataka
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//Konekcija na bazu
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost'
    , user: 'root'
    , password: ''
    , database: 'visualiseatm'
});
//Sve rute sa /api/.. su servisi koji se ispostavljaju
//TESTIRANJE BAZE PODATAKA
app.get('/api/TEST', function (req, res) {
        //res.send("<h1>@ramicbenjamin<h1>");
        //connection.connect();
        connection.query('INSERT INTO bankomat (identifikator, lozinka, kolicinaNovca, lokacija, longitude, latitude) VALUES ("novi", "000", "1500", "sarajevo", "22.5", "32.6")', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
//DAJ SVE KORISNIKE
app.get('/api/dajSveKorisnike', function (req, res) {
        var rezultati = 0;
        connection.query('SELECT * FROM korisnik', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
//DAJ SVE TIPOVE KARTICA
app.get('/api/dajSveTipoveKartica', function (req, res) {
        var rezultati = 0;
        connection.query('SELECT * FROM tipkartice', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
    //DodajKorisnika
app.post('/api/dodajKorisnika', function (req, res) {
        console.log(req.body.ime);
        connection.query('INSERT INTO korisnik (ime, prezime, korisnickoIme, lozinka) VALUES ("' + req.body.ime + '", "' + req.body.prezime + '", "' + req.body.korisnickoIme + '", "' + req.body.lozinka + '")', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
    //KREIRANJE RAČUNA
app.post('/api/kreirajRacun', function (req, res) {
    connection.query('INSERT INTO kartica (idKartica, brojKartice, PIN, TipKartice_idTipKartice) VALUES (NULL, "' + req.body.brojKartice + '", "' + req.body.PIN + '"," ' + req.body.tipKartice + '")', function (error, results, fields) {
        if (error) {
            connection.end();
            throw error;
        }
        res.send(results);
    });
    var idZadnjeKartice;
    connection.query('SELECT MAX(idKartica) AS id FROM kartica', function (error, results, fields) {
        if (error) {
            connection.end();
            throw error;
        }
        idZadnjeKartice = results[0].id;
        connection.query('INSERT INTO racun (idRacun, Kartica_idKartica, Korisnik_idKorisnik, kolicinaNovca) VALUES (NULL, "' + idZadnjeKartice + '", "' + req.body.korisnik + '", "' + req.body.kolicinaNovca + '")', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
        });
    });
})
app.get('/api/dajTopTransakcije', function (req, res) {
        connection.query('SELECT b.identifikator AS label, t.kolicinaNovca AS value FROM bankomat AS b, transakcija AS t WHERE b.idBankomat = t.Bankomat_idBankomat ORDER BY value DESC LIMIT 5', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
app.get('/api/dajTransakcijuBankomata/:id', function (req, res) {
        connection.query('SELECT b.identifikator AS label, sum(t.kolicinaNovca) AS value FROM bankomat AS b, transakcija AS t WHERE b.idBankomat = t.Bankomat_idBankomat and b.idBankomat = '+req.params.id, function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
app.get('/api/dajDatu', function (req, res) {
        res.send('[  {    "key" : "Quantity",    "bar": true,    "values" : [ [ 112017 , 1] ,[ 2 , 2] ,[ 3 , 3] , [ 4 , 4]]  },  {    "key" : "Price",    "values" : [[ 112017 , 1] ,[ 2 , 2] ,[ 3 , 3] , [ 4 , 4]]  }]');
    })
    //DodavanjeBankomata
app.post('/api/dodajBankomat', function (req, res) {
        connection.query('SELECT MAX(idBankomat) AS lastID FROM bankomat', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            var identifikator = req.body.lokacija + " - " + results[0].lastID;
            connection.query('INSERT INTO bankomat (identifikator, lozinka, kolicinaNovca, lokacija, longitude, latitude) VALUES ("' + identifikator + '", "' + req.body.lozinka + '", "' + req.body.kolicinaNovca + '", "' + req.body.lokacija + '", "' + req.body.lng + '", "' + req.body.lat + '")', function (error, results, fields) {
                if (error) {
                    connection.end();
                    throw error;
                }
                res.send(results);
            });
        });
    })
    //DAJSVEBANKOMATE
app.get('/api/dajSveBankomate', function (req, res) {
        connection.query('SELECT * FROM bankomat', function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
    //DAJBANKOMAT SA SPECIF ID
app.get('/api/dajBankomat/:id', function (req, res) {
        connection.query('SELECT * FROM bankomat WHERE idBankomat = ' + req.params.id, function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
    //PUNJENJE BANKOMATA
app.post('/api/napuniBankomat', function (req, res) {
        connection.query('UPDATE bankomat SET kolicinaNovca = '+req.body.novaKolicinaNovca+' WHERE idBankomat = +'+req.body.idBankomataZaPunjenje, function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
//PROMJENA STANJA RAČUNA
app.post('/api/promijeniStanjeRacuna', function (req, res) {
        connection.query('UPDATE racun SET kolicinaNovca = '+req.body.novaKolicinaNovca+' WHERE idRacun = +'+req.body.idRacuna, function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })

app.get('/api/dajSveRacune/:id', function (req, res) {
        connection.query('SELECT * FROM racun WHERE Korisnik_idKorisnik = ' + req.params.id, function (error, results, fields) {
            if (error) {
                connection.end();
                throw error;
            }
            res.send(results);
        });
    })
    //Jednostavna POST metoda
app.post('/api', function (req, res) {
        res.send('POST request to the homepage')
    })
    //GET metode sa parametrima
app.get('/api/who/:name?', function (req, res) {
    var name = req.params.name;
    res.send(name + " was here");
})
app.get('/api/who/:name?/:title', function (req, res) {
        var name = req.params.name;
        var title = req.params.title;
        res.send(name + " was here" + title + " is its title");
    })
    //Serviranje rutiranja ANGULARU
app.use(express.static(__dirname + '/public'));
//Pokretanje servra
app.listen(3000, function () {
    console.log('Magic happens on port 3000');
});