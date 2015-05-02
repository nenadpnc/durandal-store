define(['services/datacontext', 'durandal/plugins/router', 'config', 'services/auth'],
    function (datacontext, router, config, auth) {

        var proizvod = ko.observable(),
            slike = ko.observableArray(),
            slika360 = ko.observable(),
            komentari = ko.observableArray(),
            velicine = ko.observableArray(),
            relevantniProizvodi = ko.observableArray(),
            favProizvod = ko.observable(),
            izabranaVelicina = ko.observable(),
            izabranaKolicina = ko.observable(1),
            errorKor = ko.observable(false),
            errorTekst = ko.observable(false),
            kursnaLista = {
                RSD: ko.observable(),
                USD: ko.observable(),
                GBP: ko.observable()
            },
            kursniSimbol = ko.observable('€'),
            prethodniOdnos = ko.observable(1),
            cena = ko.observable(),
            id,
            signal = $.connection.proizvodHub;

        function activate(routeData) {
            izabranaVelicina(-1);
            id = parseInt(routeData.id);
            return datacontext.vratiProizvod(id, proizvod, velicine, slike, slika360, favProizvod, auth.vratiKorisnikId(), komentari, cena)
                                .then(function () {
                                    return datacontext.vratiRelevantneProizvode(proizvod, relevantniProizvodi)
                                                        .then(function () {
                                                            config.postaviKurs(kursnaLista);
                                                        });
                                });
        };

        signal.client.azurirajZalihe = function (proizvodi) {
            var promenjeniProizvodi = proizvodi.split(',');

            for (var i = 0; i < promenjeniProizvodi.length; i++) {
                if (parseInt(promenjeniProizvodi[i]) === id) {
                    datacontext.vratiVelicine(id, velicine);
                    break;
                }
            }
        };

        $.connection.hub.start();

        function vratiNazad() {
            router.navigateBack();
        };

        function ubaciKomentar() {
            var korId = auth.vratiKorisnikId();
            var tArea = $('textarea');
            if (korId()) {
                if (tArea.val() === '') {
                    errorTekst(true);
                    return;
                }
                var pocetneVrednosti = { ProizvodID: id, KorisnikID: korId(), Tekst: tArea.val(), Datum: Date(Date.now()), DatumISO: moment().format()
                    },
                    komentar = datacontext.kreirajEntitet('Komentar', pocetneVrednosti);
                komentari.unshift(komentar);
                datacontext.sacuvajPromene();
                $('.komentari').timeago('refresh');
                $('.st-open').css({ height: 'auto' });
                tArea.val('');
                errorKor(false);
                errorTekst(false);
            } else {
                errorKor(true);
            }
        };

        function viewAttached(view) {
            bindEventToList(view, '.thumbs', goToDetails);
            $('button[data-odnos=1]').addClass('active');
            $('#konfigMeniMobile').removeClass('visVisible').addClass('visHidden');
            config.postavi360($('#slika360'), slika360);
            config.postaviFav(proizvod, favProizvod);
            config.postaviStranuDetalji();
            config.namestiGrid($('#rel'), '.thumbs');
            promeniKurs();
        };

        function canDeactivate() {
            favProizvod(null);
            errorKor(false);
            errorTekst(false);
            kursniSimbol('€');
            prethodniOdnos(1);
            return true;
        }

        var goToDetails = function (selectedProizvod) {
            if (selectedProizvod && selectedProizvod.ProizvodID) {
                var url = '#/proizvodDetalji/' + selectedProizvod.ProizvodID;
                router.navigateTo(url);
            }
        };

        var bindEventToList = function (rootSelector, selector, callback, eventName) {
            var eName = eventName || 'tap';
            $(rootSelector).on(eName, selector, function () {
                var entity = ko.dataFor(this);
                callback(entity);
                return false;
            });
        };

        function promeniKurs() {

            $('#kurs > button').on('tap', function () {
                var $t = $(this);
                var simbol = $t.attr('data-simbol');
                var odnos = parseFloat($t.attr('data-odnos'));

                var cenaPom = parseFloat(cena());
                cenaPom = cenaPom / prethodniOdnos() * odnos;
                cena(cenaPom.toFixed(2));
                kursniSimbol(simbol);

                $('#kurs > button').removeClass('active');
                $t.addClass('active');
                prethodniOdnos(odnos);
            });
        };

        var vm = {
            activate: activate,
            proizvod: proizvod,
            slike: slike,
            komentari: komentari,
            velicine: velicine,
            favProizvod: favProizvod,
            izabranaVelicina: izabranaVelicina,
            izabranaKolicina: izabranaKolicina,
            vratiNazad: vratiNazad,
            viewAttached: viewAttached,
            canDeactivate: canDeactivate,
            ubaciKomentar: ubaciKomentar,
            errorKor: errorKor,
            errorTekst: errorTekst,
            kursnaLista: kursnaLista,
            kursniSimbol: kursniSimbol,
            prethodniOdnos: prethodniOdnos,
            cena: cena,
            relevantniProizvodi: relevantniProizvodi
        };

        return vm;
    });