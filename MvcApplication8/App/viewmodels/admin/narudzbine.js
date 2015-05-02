define(['services/admin_data', 'durandal/app', 'viewmodels/admin/narudzbineDetalji'],
    function (datacontext, app, detalji) {

        var noveNarudzbine = ko.observableArray(),
            narudzbine = ko.observableArray(),
            isSaving = ko.observable(false),
            broj = ko.observable();

        function activate() {
            return datacontext.narudzbine(broj, noveNarudzbine, narudzbine);
        };

        function viewAttached(view) {
            $('#footable').footable();
            bindEventToList(view, '.td', idiNaDetalje);
        };

        function idiNaDetalje(narudzbina) {
            if (narudzbina) {
                app.showModal(new detalji(narudzbina)).then(function (responce) {
                    return true;
                });
            }
        };

        function bindEventToList(rootSelector, selector, callback) {
            $(rootSelector).on('click', selector, function () {
                var entity = ko.dataFor(this);
                callback(entity);
                return false;
            });
        };

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
            return datacontext.sacuvajPromene().then(idiNaEdit).fin(complete);

            function idiNaEdit() {

            }

            function complete() {
                isSaving(false);
            }
        };

        var canSave = ko.computed(function () {
            return hasChanges() && !isSaving();
        });

        var vm = {
            activate: activate,
            viewAttached: viewAttached,
            noveNarudzbine: noveNarudzbine,
            narudzbine: narudzbine,
            nazad: nazad,
            ponisti: ponisti,
            sacuvaj: sacuvaj,
            canSave: canSave,
            hasChanges: hasChanges
        };
        return vm;
    });