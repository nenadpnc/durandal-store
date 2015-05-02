define(['durandal/system', 'durandal/plugins/router', 'config', 'services/datacontext', 'services/auth'],
    function (system, router, config, datacontext, auth) {

        var ukupno = ko.observable(),
            rute = ko.observableArray(),
            korisnik = {
                id: ko.observable(),
                imePrezime: ko.observable(),
                slikaProfil: ko.observable()
            };

        function activate() {
            return datacontext.vratiRute(rute).then(boot).fail(failedInitialization).fin(postaviAuth);
        }

        function boot() {
            router.map(rute());
            return router.activate('home');
        };

        function postaviAuth() {
            var login = localStorage.getItem('poslednjiLogin');
            if (login === 'google') {
                return auth.googleLogin(korisnik, true);
            } else if (login === 'facebook') {
                return auth.facebookLogin(korisnik);
            }
        };

        function googleLogin() {
            return auth.googleLogin(korisnik, false);
        };

        function facebookLogin() {
            auth.facebookLogin(korisnik, true, false);
        };

        function logout() {
            var login = localStorage.getItem('poslednjiLogin');
            if (login === 'google') {
                auth.googleLogout(korisnik);
            } else if (login === 'facebook') {
                auth.facebookLogin(korisnik, false, true);
            }
        };

        function viewAttached() {
            config.postaviKorpu(ukupno);
        };

        function korpa() {
            PAYPAL.apps.MiniCart.toggle();
        };

        function profil() {
            router.navigateTo('#/profil');
        };

        function failedInitialization(error) {
            toastr.error('Neuspela inicijalizacija aplikacije: ' + error.message);
        };

        var shell = {
            activate: activate,
            router: router,
            viewAttached: viewAttached,
            korpa: korpa,
            ukupno: ukupno,
            profil: profil,
            googleLogin: googleLogin,
            facebookLogin: facebookLogin,
            logout: logout,
            korisnik: korisnik
        };
        return shell;
    });