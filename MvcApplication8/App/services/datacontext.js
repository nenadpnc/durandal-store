define(['durandal/system', 'config'],
    function (system, config) {

        var EntityQuery = breeze.EntityQuery,
            manager = ConfigureBreezeManager();

        var queryFailed = function (error) {
            toastr.error('Greška prilikom vraćanja podataka: ' + error.message);
        };

        var vratiRute = function (rute) {
            return Q.all([vratiRutePromis(rute)]);
        };

        var vratiRutePromis = function (rute) {

            var query = EntityQuery.from('Rute').select('url, moduleId, name, visible, caption');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                rute(data.results);
            };
        };

        var configKorisnika = function (korIdObservable, korisnik) {
            return Q.all([configKorisnikaPromise(korIdObservable, korisnik)]);
        };

        var configKorisnikaPromise = function (korIdObservable, korisnik) {
            if (korIdObservable()) {
                var query = EntityQuery.from('Korisnici').where('Id', '==', korIdObservable());

                return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

                function querySucceeded(data) {
                    toastr.success('Dobrodosli, ' + korisnik.imePrezime());
                    if (data.results.length < 1) {
                        return datacontext.sacuvajKorisnika(korIdObservable, korisnik.imePrezime, korisnik.slikaProfil, moment().format())
                                          .then(datacontext.sacuvajPromene);
                    }
                };
            }
        };

        var boot = function (proizvodiObservable, podkatObservable, brendoviObservable, bojeObservable, nazivi, kategorijaId) {
            return Q.all([vratiProizvode(proizvodiObservable, nazivi, kategorijaId),
                          vratiPodkategorije(podkatObservable, kategorijaId),
                          vratiBrendove(brendoviObservable),
                          vratiBoje(bojeObservable)]);
        };

        var bootPocetna = function (proizvodiObservable, komentariObservable, brendoviObservable, noviProizvodiObservable) {
            return Q.all([vratiPreporuceneProizvode(proizvodiObservable),
                        vratiPopularne(proizvodiObservable),
                        vratiKomentarePocetna(komentariObservable),
                        vratiNoveProizvode(noviProizvodiObservable),
                        vratiBrendove(brendoviObservable)]);
        };

        var vratiKomentarePocetna = function (komentariObservable) {
            var query = EntityQuery.from('Komentari').expand('korisnik').orderBy('Datum desc').take(5);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                komentariObservable(data.results);
            };
        };

        var vratiPopularne = function (proizvodiObservable) {
            var query = EntityQuery.from('Proizvodi')
                                .select('ProizvodID, Naziv, KratakOpis, SlikaSrc, Cena, Popust, BrojFav, DaLiJe360')
                                .orderBy('BrojFav desc')
                                .take(4);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                for (var i = 0; i < data.results.length; i++) {
                    proizvodiObservable().push(data.results[i]);
                }
            };
        };

        var vratiPreporuceneProizvode = function (proizvodiObservable) {
            var query = EntityQuery.from('Proizvodi')
                                .where('Preporuceno', '==', true)
                                .select('ProizvodID, Naziv, KratakOpis, SlikaSrc, Cena, Popust, BrojFav, DaLiJe360')
                                .take(4);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                for (var i = 0; i < data.results.length; i++) {
                    proizvodiObservable().push(data.results[i]);
                }
            };
        };

        var vratiNoveProizvode = function (noviProizvodiObservable) {
            var query = EntityQuery.from('Proizvodi')
                                .select('ProizvodID, Naziv, SlikaSrc')
                                .orderBy('Datum desc')
                                .take(5);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                noviProizvodiObservable(data.results);
            };
        };

        var vratiProizvode = function (proizvodiObservable, nazivi, kategorijaId) {
            var query = EntityQuery.from('Proizvodi')
                .where('KategorijaID', '==', kategorijaId)
                .expand('Brend')
                .orderBy('Datum desc');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                proizvodiObservable(data.results);
                for (var i = 0; i < data.results.length; i++) {
                    nazivi.push(data.results[i].Naziv().toLowerCase());
                }
            };
        };

        var vratiProizvodID = function (proizvodId, proizvodObservable, cenaObservable) {

            var query = EntityQuery.from('Proizvodi').where('ProizvodID', '==', proizvodId).expand('Brend, Velicine, Komentari');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                proizvodObservable(data.results[0]);
                cenaObservable(proizvodObservable().Cena());
            };
        };

        var vratiSlike = function (proizvodId, slikeObservable) {
            var predicate = breeze.Predicate;
            var p1 = predicate.create('ProizvodID', '==', proizvodId);
            var p2 = predicate.create('DaLiJe360', '==', false);
            var query = EntityQuery.from('Slike').where(p1.and(p2));

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                slikeObservable(data.results);
            };
        };

        var vratiBoje = function (bojeObservable) {

            var query = EntityQuery.from('Boje').select('Naziv, Vrednost');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                bojeObservable(data.results);
            };
        };

        var vratiProizvod = function (proizvodId, proizvodObservable, velicineObservable, slikeObservable, slika360Observable, favProizvodObservable, korisnikId, komentariObservable, cenaObservable) {
            return Q.all([vratiProizvodID(proizvodId, proizvodObservable, cenaObservable),
                        vratiVelicine(proizvodId, velicineObservable),
                        vratiSlike(proizvodId, slikeObservable),
                        vratiSlike360(slika360Observable, proizvodId),
                        vratiFavProizvod(favProizvodObservable, proizvodId, korisnikId),
                        vratiKomentare(proizvodId, komentariObservable)]);
        };

        var vratiVelicine = function (proizvodId, velicineObservable) {
            var query = EntityQuery.from('Velicine').where('ProizvodID', '==', proizvodId);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                velicineObservable(data.results);
            };
        };

        var vratiBrendove = function (brendoviObservable) {
            var query = EntityQuery.from('Brendovi');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                brendoviObservable(data.results)
            };
        };

        var vratiPodkategorije = function (podkatObservable, kategorijaId) {
            var query = EntityQuery.from('Podkategorije').where('KategorijaId', '==', kategorijaId).select('Naziv, FilterNaziv');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                podkatObservable(data.results);
            }
        };

        var vratiFavProizvod = function (favProizvodObservable, proizvodId, korisnikId) {
            if (korisnikId()) {
                var predicate = breeze.Predicate;
                var p1 = predicate.create('ProizvodId', '==', proizvodId);
                var p2 = predicate.create('KorisnikId', '==', korisnikId());
                var query = EntityQuery.from('FavProizvodi').where(p1.and(p2));

                return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

                function querySucceeded(data) {
                     favProizvodObservable(data.results[0]);
                };
            }
        };

        var vratiKomentare = function (proizvodId, komentariObservable) {
            var query = EntityQuery.from('Komentari').where('ProizvodID', '==', proizvodId)
                        .expand('Korisnik').orderBy('Datum desc');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                komentariObservable(data.results);
            };
        };

        var vratiKomentarePromis = function (proizvodId, komentariObservable) {
            return Q.all([vratiKomentare(proizvodId, komentariObservable)]);
        };

        var vratiProizvodePretraga = function (proizvodiObservable, kategorijaId, text) {
            proizvodiObservable([]);
            var FilterQueryOp = breeze.FilterQueryOp;
            var predicate = breeze.Predicate;
            var p1 = predicate.create('KategorijaID', '==', kategorijaId);
            var p2 = predicate.create('Naziv', FilterQueryOp.Contains, text);
            var query = EntityQuery.from('Proizvodi')
                                    .where(p1.and(p2))
                                    .expand('Brend')
                                    .orderBy('Datum desc');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                proizvodiObservable(data.results);
            }
        };

        var vratiRezultatPretragePromis = function (proizvodiObservable, kategorijaId, text) {
            return Q.all([vratiProizvodePretraga(proizvodiObservable, kategorijaId, text)]);
        };

        var vratiProizvodeKorisnika = function (korisnikId, kupljeniProizvodi, favProizvodi, korisnik) {
            return Q.all([vratiKupljeneProizvode(korisnikId, kupljeniProizvodi),
                        vratiFavProizvode(korisnikId, favProizvodi),
                        vratiKorisnika(korisnikId, korisnik)]);
        };

        var vratiKupljeneProizvode = function (korId, proizvodiObservable) {
            var query = EntityQuery.from('Narudzbine')
                                    .where('KorisnikId', '==', korId)
                                    .expand('NarudzbinaDetalji')
                                    .orderBy('Datum desc');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                proizvodiObservable(data.results);
            };
        };

        var vratiFavProizvode = function (korId, proizvodiObservable) {
            var query = EntityQuery.from('FavProizvodi')
                                    .where('KorisnikId', '==', korId)
                                    .expand('Proizvod');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                proizvodiObservable(data.results);
            };
        };

        var vratiKorisnika = function (korisnikId, korisnikObservable) {
            var query = EntityQuery.from('Korisnici').where('Id', '==', korisnikId);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                korisnikObservable(data.results[0]);
            };
        };

        var vratiRelevantneProizvode = function (proizvod, proizvodiObservable) {
            return Q.all([vratiRelevantneProizvodePromise(proizvod, proizvodiObservable)]);
        };

        var vratiRelevantneProizvodePromise = function (proizvod, proizvodiObservable) {
            var predicate = breeze.Predicate;
            var filterQueryOp = breeze.FilterQueryOp;
            var p1 = predicate.create('KategorijaID', filterQueryOp.Equals, proizvod().KategorijaID());
            var p2 = predicate.create('PodkatNaziv', filterQueryOp.Equals, proizvod().PodkatNaziv());
            var p3 = predicate.create('BrendId', filterQueryOp.Equals, proizvod().Brend().BrendId());
            var p4 = predicate.create('ProizvodID', filterQueryOp.NotEquals, proizvod().ProizvodID());
            var pred = predicate.and([p1, p2, p3, p4]);

            var query = EntityQuery.from('Proizvodi').where(pred)
                                    .select('ProizvodID, Naziv, DaLiJe360, SlikaSrc, Cena, Popust, Datum, BrojFav')
                                    .orderBy('Datum desc')
                                    .take(4);

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                proizvodiObservable(data.results);
            };
        };

        var vratiSlike360 = function (slika360Observable, proizvodId) {
            slika360Observable(null);
            var predicate = breeze.Predicate;
            var p1 = predicate.create('ProizvodID', '==', proizvodId);
            var p2 = predicate.create('DaLiJe360', '==', true);
            var query = EntityQuery.from('Slike').where(p1.and(p2)).select('Src, BrojFrejmova');

            return manager.executeQuery(query).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                slika360Observable(data.results[0]);
            };
        };

        var sacuvajPromene = function () {
            return manager.saveChanges().then(saveSucceeded).fail(saveFailed);

            function saveSucceeded(saveResult) {
                toastr.success('Uspesno sacuvano!');
            };
            function saveFailed(error) {
                toastr.error('Nije sacuvano! ' + error.message);
            };
        };

        var sacuvajPromenePromis = function () {
            return Q.all([sacuvajPromene()]);
        };

        var sacuvajKorisnika = function (Id, ImePrezime, profilna_slika) {
            return Q.all([createKorisnik(Id, ImePrezime, profilna_slika)]);
        };

        var sacuvajFavProizvod = function (proizvodId, korisnikId) {
            return Q.all([createFavProizvod(proizvodId, korisnikId)]);
        };

        var createFavProizvod = function (proizvodId, korisnikId) {
            return manager.createEntity('FavProizvodi', { ProizvodId: proizvodId, KorisnikId: korisnikId });
        };

        var createKorisnik = function (Id, ImePrezime, profilna_slika) {
            return manager.createEntity('Korisnik', { Id: Id(), ImePrezime: ImePrezime(), SlikaSrc: profilna_slika() });
        };

        var kreirajEntitet = function (entity, pocetneVrednosti) {
            
            return manager.createEntity(entity, pocetneVrednosti);
        };

        var kreirajVelicinu = function (pocetneVrednosti) {
            return manager.createEntity('Velicina', pocetneVrednosti, breeze.EntityState.Modified);
        };

        var sacuvajNarudzbinu = function (narudzbina, transakcijaId, korisnikId) {
            return Q.all([createNarudzbinu(narudzbina, transakcijaId, korisnikId)]);
        };

        var createNarudzbinu = function (narudzbina, transakcijaId, korisnikId) {
            return manager.createEntity('Narudzbina', {
                NarudzbinaId: transakcijaId,
                KorisnikId: korisnikId,
                ImePrezime: narudzbina.imePrezime(),
                Adresa: narudzbina.adresa(),
                Ukupno: parseFloat(narudzbina.ukupno()).toFixed(2),
                Grad: narudzbina.grad(), Drzava: narudzbina.zemlja(),
                PostanskiKod: narudzbina.postanskiKod(),
                Datum: Date(Date.now()), DatumIso: moment().format(),
                Email: narudzbina.email(),
                KupacId: narudzbina.kupacId(),
                Isporuceno: false
            });
        };

        var sacuvajNaruzbinuDetalji = function (transakcijaIdId, proizvodi) {
            return Q.all([createNarudzbinuDetalji(transakcijaIdId, proizvodi)]);
        };

        var createNarudzbinuDetalji = function (transakcijaIdId, proizvodi) {
            var metadataStore = manager.metadataStore;
            var narudzbina = metadataStore.getEntityType('NarudzbinaDetalji');
            for (var i = 0; i < proizvodi().length; i++) {
                var naziv = proizvodi()[i].product.item_name,
                    cena = parseFloat(proizvodi()[i].product.amount).toFixed(2),
                    kolicina = parseInt(proizvodi()[i].product.quantity),
                    velicina = proizvodi()[i].product.os0,
                    slikaSrc = proizvodi()[i].product.slika_src,
                    proizvodId = proizvodi()[i].product.id;

                var narudzbenica = narudzbina.createEntity({
                    NarudzbinaId: transakcijaIdId,
                    ProizvodId: proizvodId,
                    Naziv: naziv,
                    Cena: cena,
                    Kolicina: kolicina,
                    Velicina: velicina,
                    SlikaSrc: slikaSrc
                });
                manager.addEntity(narudzbenica);
            }
        };

        var ponistiPromene = function () {
            manager.rejectChanges();
        };

        function ConfigureBreezeManager() {
            var manager = new breeze.EntityManager('api/breeze');
            return manager;
        };

        var datacontext = {
            createFavProizvod: createFavProizvod,
            vratiRute: vratiRute,
            vratiProizvod: vratiProizvod,
            boot: boot,
            sacuvajPromene: sacuvajPromene,
            sacuvajKorisnika: sacuvajKorisnika,
            sacuvajFavProizvod: sacuvajFavProizvod,
            vratiFavProizvod: vratiFavProizvod,
            vratiKomentarePromis: vratiKomentarePromis,
            vratiRezultatPretragePromis: vratiRezultatPretragePromis,
            sacuvajNarudzbinu: sacuvajNarudzbinu,
            sacuvajNaruzbinuDetalji: sacuvajNaruzbinuDetalji,
            ponistiPromene: ponistiPromene,
            vratiProizvodeKorisnika: vratiProizvodeKorisnika,
            configKorisnika: configKorisnika,
            vratiRelevantneProizvode: vratiRelevantneProizvode,
            bootPocetna: bootPocetna,
            kreirajEntitet: kreirajEntitet,
            kreirajVelicinu: kreirajVelicinu,
            sacuvajPromenePromis: sacuvajPromenePromis,
            vratiVelicine: vratiVelicine
        };
        return datacontext;
    });