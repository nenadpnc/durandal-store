define(['durandal/plugins/router', 'services/datacontext', 'config'],
    function (ruter, datacontext, config) {

        var proizvodi = ko.observableArray(),
            komentari = ko.observableArray(),
            brendovi = ko.observableArray(),
            noviProizvodi = ko.observableArray();

        function activate() {
            return datacontext.bootPocetna(proizvodi, komentari, brendovi, noviProizvodi);
        }

        function viewAttached(view) {
            config.postaviPocetnuStranu();
        };

        var vm = {
            activate: activate,
            viewAttached: viewAttached,
            proizvodi: proizvodi,
            komentari: komentari,
            brendovi: brendovi,
            noviProizvodi: noviProizvodi
        };
        return vm;
    });