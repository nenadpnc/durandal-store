define(['services/payPalCaller', 'durandal/plugins/router', 'services/datacontext', 'durandal/app'],
    function (paypalCaller, ruter, datacontext, app) {

        var detalji,
            proizvodi = ko.observableArray(),
            rezultat = ko.observable(),
            greska = ko.observable(false),
            token = ko.observable(),
            transactionId = ko.observable(),
            potvrdjenaKupovina = ko.observable(false),
            korisnikId = ko.observable(),
            narudzbina = {
                datum: ko.observable(),
                imePrezime: ko.observable(),
                adresa: ko.observable(),
                grad: ko.observable(),
                drzava: ko.observable(),
                postanskiKod: ko.observable(),
                zemlja: ko.observable(),
                email: ko.observable(),
                ukupno: ko.observable(),
                kupacId: ko.observable()
            },
            signal = $.connection.proizvodHub;

        function canActivate(routeData) {
            detalji = JSON.parse(localStorage.getItem('detalji'));

            if (detalji === null || typeof routeData.token === 'undefined' || routeData.token !== detalji.token) {
                toastr.error('Nemate odgovarajuće akreditive da bi učitali ovu stranicu.');
                return false;
            } else {
                return true;
            }
        };

        function activate(routeData) {
            potvrdjenaKupovina(false);
            greska(false);
            token(detalji.token);
            korisnikId(detalji.korisnikId);
            return paypalCaller.getCheckoutDetails(detalji.token, detalji.ukupno, narudzbina, greska)
                                .then(prikaziProizvode)
                                .fail(failed)
                                .fin(pokreniHub);
        };

        function viewAttached() {
            $('#konfigMeniMobile').removeClass('visVisible').addClass('visHidden');
        };

        function prikaziProizvode() {
            var data = JSON.parse(decodeURIComponent(localStorage.getItem('PPMiniCart')));
            proizvodi(data.value);
        };

        function pokreniHub() {
            $.connection.hub.start();
        };

        function failed(error) {
            greska(true);
            toastr.error('Greška pri vraćanju detalja: ' + error);
        };

        function odustani() {
            ruter.navigateTo('#/home');
        };

        function potvrdi() {
            $('#potvrdi').text('Obrada zahteva').prop('disabled', true);
            $('#odustani').prop('disabled', true);
            return paypalCaller.doCheckoutPayment(token(), narudzbina.kupacId(), narudzbina.ukupno(), rezultat, transactionId)
                                .then(sacuvajNarudzbinu)
                                .fail(failed);
        };

        function sacuvajNarudzbinu() {
            if (rezultat() && transactionId()) {
                return datacontext.sacuvajNarudzbinu(narudzbina, transactionId(), korisnikId())
                                .then(sacuvajNaruzbinuDetalji)
                                .fail(failed)
                                .fin(function () {
                                    potvrdjenaKupovina(true);
                                    greska(false);
                                    ruter.navigateTo('#/profil');
                                });
            }
        };

        function sacuvajNaruzbinuDetalji() {
            return datacontext.sacuvajNaruzbinuDetalji(transactionId(), proizvodi)
                               .then(azurirajVelicine)
                               .fail(failed);
        };

        function azurirajVelicine() {
            var velicine = [],
                products = [];
            for (var i = 0; i < proizvodi().length; i++) {
                var vred = {
                    VelicinaId: proizvodi()[i].product.velicinaId,
                    Kolicina: parseInt(proizvodi()[i].product.max_quantity) - parseInt(proizvodi()[i].product.quantity),
                    Naziv: proizvodi()[i].product.os0,
                    ProizvodID: proizvodi()[i].product.id
                },
                    velicina = datacontext.kreirajVelicinu(vred);
                velicine.push(velicina);
                products.push(proizvodi()[i].product.id);
            }

            return datacontext.sacuvajPromenePromis().then(function () {
                signal.server.azurirajVelicine(products.join(','));
            });
        };

        function canDeactivate() {
            if (!potvrdjenaKupovina()) {
                var msg = 'Da li želite da poništite kupovinu?';
                return app.showMessage(msg, 'Nepotvrđena kupovina', ['Da', 'Ne'])
                            .then(function (izabranaOpcija) {
                                if (izabranaOpcija === 'Da') {
                                    datacontext.ponistiPromene();
                                    localStorage.removeItem('detalji');
                                    PAYPAL.apps.MiniCart.reset();
                                    toastr.info('Kupovina odbijena.');
                                    return 'Yes';
                                } else {
                                    return 'No';
                                }
                            });
            } else if (greska()) {
                return true;
            } else {
                PAYPAL.apps.MiniCart.reset();
                localStorage.removeItem('detalji');
                return true;
            }
        };

        var vm = {
            activate: activate,
            narudzbina: narudzbina,
            proizvodi: proizvodi,
            odustani: odustani,
            potvrdi: potvrdi,
            greska: greska,
            canDeactivate: canDeactivate,
            canActivate: canActivate,
            viewAttached: viewAttached
        };
        return vm;
    });