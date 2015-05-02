define(['services/config', 'services/admin_data'],
    function (config, datacontext) {

        var narudzbine = ko.observableArray(),
            noveNar = ko.observable(),
            brProdaja = ko.observable(),
            zarada = ko.observable(),
            brKorisnika = ko.observable(),
            korisnici = ko.observableArray(),
            komentari = ko.observableArray(),
            proizvodi = ko.observableArray();

        function activate() {
            return datacontext.namestiStatistiku(narudzbine, noveNar, brKorisnika, korisnici, komentari, proizvodi)
                                .then(function () {
                                    config.ukupnoProdato(narudzbine, brProdaja);
                                    config.ukupnaZarada(narudzbine, zarada);
                                });
        };

        function viewAttached() {
            config.namestiGraph(narudzbine, korisnici, proizvodi);
            config.namestiDatume($('.chats'));
        };

        var vm = {
            activate: activate,
            viewAttached: viewAttached,
            brProdaja: brProdaja,
            zarada: zarada,
            noveNar: noveNar,
            brKorisnika: brKorisnika,
            komentari: komentari,
            proizvodi: proizvodi
        }
        return vm;
    });