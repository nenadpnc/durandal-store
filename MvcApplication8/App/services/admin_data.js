define(function () {

    var EntityQuery = breeze.EntityQuery,
        manager = configureBreezeManager(),
        hasChanges = ko.observable(false);

    manager.hasChangesChanged.subscribe(function (e) {
        hasChanges(e.hasChanges);
    });

    function configureBreezeManager() {
        var manager = new breeze.EntityManager('api/breeze');
        return manager;
    };

    function queryFailed(error) {
        toastr.error('Greška prilikom vraćanja podataka: ' + error.message);
    };

    function namestiStatistiku(narudzbine, noveNar, brKorisnika, korisnici, komentari, proizvodi) {
        return Q.all([vratiNarudzbine(narudzbine),
                    noveNarudzbine(noveNar),
                    vratiKorisnike(brKorisnika, korisnici),
                    vratiTopKomentare(komentari),
                    vratiTopProizvode(proizvodi)]);
    };

    function narudzbine(broj, noveNar, narudzbine) {
        return Q.all([vratiNarudzbine(narudzbine), noveNarudzbine(broj, noveNar)]);
    };

    function vratiNarudzbine(narudzbine) {
        var query = EntityQuery.from('Narudzbine')
                                .where('Isporuceno', '==', true)
                                .expand('NarudzbinaDetalji')
                                .orderBy('Datum desc');
        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            narudzbine(data.results);
        };
    };

    function noveNarudzbine(broj, noveNar) {
        var query = EntityQuery.from('Narudzbine')
                                .where('Isporuceno', '==', false)
                                .expand('NarudzbinaDetalji')
                                .orderBy('Datum desc');
        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            broj(data.results.length);
            if (noveNar) {
                noveNar(data.results);
            }
        }
    };

    function vratiKorisnike(brKorisnika, korisnici) {
        var query = EntityQuery.from('Korisnici').expand('Narudzbine');
        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            brKorisnika(data.results.length);
            korisnici(data.results);
        }
    };

    function vratiTopKomentare(komentari) {
        var query = EntityQuery.from('Komentari').expand('korisnik').orderBy('Datum desc').take(5);

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            komentari(data.results);
        };
    };

    function vratiTopProizvode(proizvodi) {
        var query = EntityQuery.from('Proizvodi').select('Naziv, BrProd').orderBy('BrProd desc').take(5);

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            proizvodi(data.results);
        };
    };

    function vratiProizvode(proizvodi) {
        var query = EntityQuery.from('Proizvodi').expand('Kategorija, Brend').orderBy('Datum desc');
        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            proizvodi(data.results);
        };
    };

    function izbrisiProizvod(id) {

    };

    function editProizvod(id, proizvod, slike, slike360, folder360, boje, brendovi, kategorije) {
        return Q.all([vratiProizvod(id, proizvod),
                      vratiSlike(id, slike),
                      vratiSlike360(id, slike360, folder360),
                      vratiBoje(boje),
                      vratiBrendove(brendovi),
                      vratiKategorije(kategorije)]);
    };

    function vratiPodatke(kategorije, brendovi, podkategorije) {
        return Q.all([vratiKategorije(kategorije), vratiBrendove(brendovi), vratiPodkategorije(podkategorije)]);
    };

    function vratiProizvod(id, proizvod) {
        var query = EntityQuery.from('Proizvodi')
                               .where('ProizvodID', '==', id)
                               .expand('Kategorija, Velicine');
        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            proizvod(data.results[0]);
        };
    };

    function vratiSlike(id, slike) {
        var predicate = breeze.Predicate;
        var p1 = predicate.create('ProizvodID', '==', id);
        var p2 = predicate.create('DaLiJe360', '==', false);
        var query = EntityQuery.from('Slike').where(p1.and(p2));

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            slike(data.results);
        };
    };

    function vratiBoje(boje) {
        var query = EntityQuery.from('Boje').select('Naziv, Vrednost');

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            boje(data.results);
        };
    };

    function vratiSlike360(id, slike360, folder360) {
        var predicate = breeze.Predicate;
        var p1 = predicate.create('ProizvodID', '==', id);
        var p2 = predicate.create('DaLiJe360', '==', true);
        var query = EntityQuery.from('Slike').where(p1.and(p2));

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            folder360(data.results[0]);
            if (folder360()) {
                for (var i = 1; i <= folder360().BrojFrejmova() ; i++) {
                    var pom = {
                        Src: folder360().Src() + i + '.jpg',
                        Broj: i
                    };
                    slike360.push(pom);
                }
            }
        };
    };

    function vratiBrendove(brendovi) {
        var query = EntityQuery.from('Brendovi');

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            brendovi(data.results);
        };
    };

    function vratiKategorije(kategorije) {
        var query = EntityQuery.from('Kategorije').expand('Podkategorije');

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            kategorije(data.results);
        };
    };

    function vratiPodkategorije(podkategorije) {
        var query = EntityQuery.from('Podkategorije');

        return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

        function querySucceeded(data) {
            podkategorije(data.results);
        };
    };

    function editPodaci(kategorije, brendovi, boje) {
        return Q.all([vratiKategorije(kategorije), vratiBrendove(brendovi), vratiBoje(boje)]);
    };

    function ponistiPromene() {
        manager.rejectChanges();
        toastr.info('Promene poništene.');
    };

    function sacuvajPromene() {
        return manager.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            toastr.success('Podaci uspešno sačuvani!');
        }

        function saveFailed(error) {
            var msg = 'Greška pri čuvanju podataka: ' + getErrorMessages(error);
            toastr.error(msg);
            error.message = msg;
            throw error;
        }
    };

    function kreirajEntitet(entity, pocetneVrednosti) {
        return manager.createEntity(entity, pocetneVrednosti);
    };

    var datacontext = {
        namestiStatistiku: namestiStatistiku,
        vratiProizvode: vratiProizvode,
        izbrisiProizvod: izbrisiProizvod,
        editProizvod: editProizvod,
        vratiProizvod: vratiProizvod,
        ponistiPromene: ponistiPromene,
        sacuvajPromene: sacuvajPromene,
        hasChanges: hasChanges,
        kreirajEntitet: kreirajEntitet,
        vratiPodatke: vratiPodatke,
        narudzbine: narudzbine,
        vratiKorisnike: vratiKorisnike,
        editPodaci: editPodaci
    };
    return datacontext;
});