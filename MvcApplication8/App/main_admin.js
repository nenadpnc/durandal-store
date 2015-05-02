require.config({
    paths: { "text": "durandal/amd/text" }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/plugins/router'],
    function (app, viewLocator, system, router) {

        system.debug(true);

        app.start().then(function () {
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.options.backgroundpositionClass = 'toast-bottom-right';

            router.handleInvalidRoute = function (route, params) {
                logger.logError('Stranica nije pronađena', route, 'main', true);
            };

            router.useConvention();
            viewLocator.useConvention('viewmodels/admin/', 'views/admin/');

            var rute = [{
                url: 'dashboard',
                moduleId: 'viewmodels/admin/dashboard',
                name: 'Dashboard',
                visible: true
            }, {
                url: 'editProizvodi',
                moduleId: 'viewmodels/admin/editProizvodi',
                name: 'Uređivanje',
                visible: true
            }, {
                url: 'narudzbine',
                moduleId: 'viewmodels/admin/narudzbine',
                name: 'Narudžbine',
                visible: true
            }, {
                url: 'addProizvodi',
                moduleId: 'viewmodels/admin/addProizvodi',
                name: 'Ubacivanje',
                visible: true
            }, {
                url: 'editProizvod/:id',
                moduleId: 'viewmodels/admin/editProizvod',
                name: 'Uređivanje proizvoda',
                visible: false
            }, {
                url: 'korisnici',
                moduleId: 'viewmodels/admin/korisnici',
                name: 'Korisnici',
                visible: true
            }, {
                url: 'editPodaci',
                moduleId: 'viewmodels/admin/editPodaci',
                name: 'Uredi podatke',
                visible: true
            }];
            router.map(rute);
            
            app.setRoot('viewmodels/admin/shell', 'entrance');
        });
    });