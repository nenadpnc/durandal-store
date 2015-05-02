define(['config', 'services/datacontext', 'services/auth', 'durandal/plugins/router'],
    function (config, datacontext, auth, router) {

        var korisnikId,
            korisnik = ko.observable(),
            kupljeniProizvodi = ko.observableArray(),
            favProizvodi = ko.observableArray(),
            ukupnoKupljenihProizvoda = ko.observable(),
            ukupnoPotroseno = ko.observable(),
            prosecno = ko.observable();

        function canActivate() {
            korisnikId = auth.vratiKorisnikId();
            if (!korisnikId()) {
                toastr.error('Morate se ulogovati da biste videli ovu stranicu.');
                return false;
            }
            return true;
        };

        function activate() {
            return datacontext.vratiProizvodeKorisnika(korisnikId(), kupljeniProizvodi, favProizvodi, korisnik).then(ukupnoKP).fin(ukupnoP)
        };

        function ukupnoKP() {
            var uk = 0;
            for (var i = 0; i < kupljeniProizvodi().length; i++) {
                for (var j = 0; j < kupljeniProizvodi()[i].NarudzbinaDetalji().length; j++) {
                    uk += kupljeniProizvodi()[i].NarudzbinaDetalji()[j].Kolicina(); 
                }
            }
            ukupnoKupljenihProizvoda(uk);
        };

        function ukupnoP() {
            var up = 0;
            for (var i = 0; i < kupljeniProizvodi().length; i++) {
                up += kupljeniProizvodi()[i].Ukupno();
            }
            ukupnoPotroseno(up.toFixed(2));
            return prosek(ukupnoKupljenihProizvoda, ukupnoPotroseno);
        };

        function prosek() {
            if (ukupnoPotroseno() && ukupnoKupljenihProizvoda() !== 0) {
                var p = (ukupnoPotroseno() / ukupnoKupljenihProizvoda()).toFixed(2);
                prosecno(p);
            } else {
                prosecno(0);
            }
        };

        function viewAttached(view) {
            $('.proizvodi').timeago();
            $('.footable').footable();
            $('#konfigMeniMobile').removeClass('visVisible').addClass('visHidden');
        };

        var vm = {
            activate: activate,
            canActivate: canActivate,
            viewAttached: viewAttached,
            kupljeniProizvodi: kupljeniProizvodi,
            favProizvodi: favProizvodi,
            korisnik: korisnik,
            ukupnoKupljenihProizvoda: ukupnoKupljenihProizvoda,
            ukupnoPotroseno: ukupnoPotroseno,
            prosecno:prosecno
        };
        return vm;
    });