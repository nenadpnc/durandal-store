define(['services/logger', 'config', 'services/datacontext', 'durandal/plugins/router'],
    function (logger, config, datacontext, router) {

        var proizvodi = ko.observableArray(),
            brendovi = ko.observableArray(),
            boje = ko.observableArray(),
            podkategorije = ko.observableArray(),
            filterKategorije = ko.observable(),
            filterBrendovi = ko.observable(),
            filterBoje = ko.observable(),
            naslov = ko.observable(),
            nazivi = [],
            kategorijaId;

        function activate(routeData) {
            naslov(routeData.routeInfo.name);
            kategorijaId = parseInt(routeData.routeInfo.caption);
            return datacontext.boot(proizvodi, podkategorije, brendovi, boje, nazivi, kategorijaId);
        };

        var viewAttached = function (view) {
            bindEventToList(view, '.mix', goToDetails);
            config.namestiGrid($('#container'), '.thumbs');
            config.namestiKonfigMeni($('.konfigMeni'));
            config.namestiFIlter($('#container'), filterKategorije, filterBrendovi, filterBoje);
            config.namestiEvent();
            $('#konfigMeniMobile').removeClass('visHidden').addClass('visVisible');
            $('#pretraga').typeahead({
                source: nazivi
            });
        };

        var canDeactivate = function () {
            config.zatvoriKonfigMeni();
            filterKategorije(null);
            filterBrendovi(null);
            filterBoje(null);
            nazivi = [];
            return true;
        };

        var goToDetails = function (selectedProizvod) {
            if (selectedProizvod && selectedProizvod.ProizvodID()) {
                var url = '#/proizvodDetalji/' + selectedProizvod.ProizvodID();
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

        var pretraga = function () {
            var text = $('#pretraga').val();
            return datacontext.vratiRezultatPretragePromis(proizvodi, kategorijaId, text)
                    .then(config.filterRemix);
        };

        var vm = {
            activate: activate,
            proizvodi: proizvodi,
            brendovi: brendovi,
            boje: boje,
            filterKategorije: filterKategorije,
            filterBrendovi: filterBrendovi,
            filterBoje: filterBoje,
            podkategorije: podkategorije,
            naslov: naslov,
            pretraga: pretraga,
            canDeactivate: canDeactivate,
            viewAttached: viewAttached
        };

        return vm;
    });