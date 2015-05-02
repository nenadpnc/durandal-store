define(['services/datacontext'],
    function (datacontext) {

        var facebookId = '584438248254541',
            googleClientId = '21587666910.apps.googleusercontent.com',
            googleApiKey = 'AIzaSyB9iQKW4yH3Bet21icgCQtIHwIFfxrxQz4',
            scopes = 'https://www.googleapis.com/auth/plus.me',
            korisnikId = ko.observable(),
            init = false;

        var googleLogin = function (korisnik, immediate) {
            gapi.client.setApiKey(googleApiKey);

            return gapi.auth.authorize({ client_id: googleClientId, scope: scopes, immediate: immediate },
                                function (authResult) {
                                    if (authResult && !authResult.error) {
                                        gapi.client.load('plus', 'v1', function () {

                                            var request = gapi.client.plus.people.get({
                                                'userId': 'me'
                                            });
                                            request.execute(function (resp) {
                                                korisnikId(resp.id);
                                                korisnik.imePrezime(resp.displayName);
                                                korisnik.slikaProfil(resp.image.url);
                                                localStorage.setItem('poslednjiLogin', 'google');
                                                datacontext.configKorisnika(korisnikId, korisnik);
                                            });
                                        });
                                    } else {

                                    }
                                });
        };

        var googleLogout = function (korisnik) {
            korisnikId(null);
            korisnik.imePrezime(null);
            korisnik.slikaProfil(null);
            localStorage.setItem('poslednjiLogin', '');
        };

        var facebookLogin = function (korisnik, login, logout) {
            if (!init) {
                FB.init({
                    appId: facebookId,
                    status: true, // check login status
                    cookie: true, // enable cookies to allow the server to access the session
                    xfbml: true  // parse XFBML
                });
                init = true;
            }
            FB.Event.subscribe('auth.authResponseChange', function (response) {
                if (response.status === 'connected') {
                    FB.api('/me', function (user) {
                        korisnik.imePrezime(user.name);
                        korisnikId(user.id);
                        var slika = "https://graph.facebook.com/" + user.id + "/picture";
                        korisnik.slikaProfil(slika);
                        localStorage.setItem('poslednjiLogin', 'facebook');
                        datacontext.configKorisnika(korisnikId, korisnik);
                    })
                } else {

                }
            });
            if (login) {
                FB.login();
            }
            if (logout) {
                FB.logout();
                korisnikId(null);
                korisnik.imePrezime(null);
                korisnik.slikaProfil(null);
                localStorage.setItem('poslednjiLogin', '');
            }
        };

        var vratiKorisnikId = function () {
            return korisnikId;
        };

        var auth = {
            googleLogin: googleLogin,
            googleLogout: googleLogout,
            facebookLogin: facebookLogin,
            vratiKorisnikId: vratiKorisnikId
        };
        return auth;
    });