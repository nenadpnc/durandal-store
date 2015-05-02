define(['services/admin_data', 'durandal/app', 'durandal/plugins/router'], function (datacontext, app, ruter) {

    var proizvodi = ko.observableArray();

    function activate() {
        return datacontext.vratiProizvode(proizvodi);
    };

    function viewAttached(view) {
        $('.footable').footable();
        bindEventToList(view, 'td', idiNaDetalje);
    };

    function idiNaDetalje(izabraniProizvod) {
        if (izabraniProizvod && izabraniProizvod.ProizvodID()) {
            var url = '#/editProizvod/' + izabraniProizvod.ProizvodID();
            ruter.navigateTo(url);
        }
    };

    function bindEventToList(rootSelector, selector, callback) {
        $(rootSelector).on('click', selector, function () {
            var entity = ko.dataFor(this);
            callback(entity);
            return false;
        });
    };

    var vm = {
        activate: activate,
        viewAttached: viewAttached,
        proizvodi: proizvodi
    };
    return vm;
});