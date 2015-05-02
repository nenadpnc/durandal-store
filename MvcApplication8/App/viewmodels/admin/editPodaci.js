define(['services/admin_data'], function (datacontext) {

    var kategorije = ko.observableArray(),
        kategorija = ko.observable(),
        brendovi = ko.observableArray(),
        boje = ko.observableArray(),
        isSaving = ko.observable(false);

    function activate() {
        return datacontext.editPodaci(kategorije, brendovi, boje).then(function () {
            kategorije.subscribe(function () {
                kategorija(undefined);
            });
        });
    };

    function viewAttahed() {
        $('#kat').on('change', function () {
            kategorija($('#kat option:selected').text());
        });
    }

    var hasChanges = ko.computed(function () {
        return datacontext.hasChanges();
    });

    function nazad() {
        ruter.navigateBack();
    };

    function ponisti() {
        datacontext.ponistiPromene();
    };

    function sacuvaj() {
        isSaving(true);
        return datacontext.sacuvajPromene().then(complete);

        function complete() {
            isSaving(false);
        }
    };

    var canSave = ko.computed(function () {
        return hasChanges() && !isSaving();
    });

    var vm = {
        activate: activate,
        kategorije: kategorije,
        nazad: nazad,
        ponisti: ponisti,
        sacuvaj: sacuvaj,
        canSave: canSave,
        hasChanges: hasChanges,
        brendovi: brendovi,
        boje: boje,
        kategorija: kategorija
    };
    return vm;
});