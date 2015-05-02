require.config({
    paths: { "text": "durandal/amd/text" }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/plugins/router', 'services/logger'],
    function (app, viewLocator, system, router, logger) {

        system.debug(true);

        app.start().then(function () {
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.options.backgroundpositionClass = 'toast-bottom-right';

            router.handleInvalidRoute = function (route, params) {
                logger.logError('Stranica nije pronađena', route, 'main', true);
            };

            router.useConvention();
            viewLocator.useConvention('viewmodels/prodavnica/', 'views/prodavnica/');
            
            app.setRoot('viewmodels/prodavnica/shell', 'entrance');
        });
    });