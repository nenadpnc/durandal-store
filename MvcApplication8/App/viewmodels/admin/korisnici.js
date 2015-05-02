define(['services/admin_data'], function (datacontext) {

    var korisnici = ko.observableArray(),
        br = ko.observable();

    function activate() {
        return datacontext.vratiKorisnike(br, korisnici);
    };

    function viewAttached() {
        $('.footable').footable();
    };

    function ukupno(korisnik) {
        var nar = korisnik;
    };

    var vm = {
        activate: activate,
        viewAttached: viewAttached,
        korisnici: korisnici,
        ukupno: ukupno
    };
    return vm;
});