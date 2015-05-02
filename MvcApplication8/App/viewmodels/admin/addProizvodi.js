define(['durandal/plugins/router', 'services/admin_data', 'durandal/app', 'services/config'],
    function (ruter, datacontext, app, config) {

        var proizvod = ko.observable(),
            isSaving = ko.observable(false),
            kategorije = ko.observableArray(),
            brend = ko.observableArray(),
            podkategorije = ko.observableArray();
            

        function activate() {
            return datacontext.vratiPodatke(kategorije, brend, podkategorije)
                                .then(function () {
                                    proizvod(datacontext.kreirajEntitet('Proizvod', { Datum: new Date() }));
                                    datacontext.kreirajEntitet('Velicina', { ProizvodID: proizvod().ProizvodID(), Naziv: '', Kolicina: 0 });
                                });
        };

        function viewAttached() {
            $('#podkat').on('change', function () {
                proizvod().PodkatNaziv($('#podkat option:selected').text());
            });
            config.srediUpload(proizvod);
            
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

        function obrisiVelicinu(valicina) {
            proizvod().Velicine.remove(velicina);
            velicina.entityAspect.setDeleted();
        };

        function ubaciVelicinu() {
            var pocetneVrednosti = {
                ProizvodID: id,
                Naziv: '',
                Kolicina: 0
            },
                velicina = datacontext.kreirajEntitet('Velicina', pocetneVrednosti);
            proizvod().Velicine.push(velicina);

        };

        function ubaciSliku() {

        };

        canDeactivate = function () {
            if (hasChanges()) {
                var msg = 'Poništi promene?';
                return app.showMessage(msg, 'Ubacivanje proizvoda', ['Da', 'Ne'])
                    .then(function (selectedOption) {
                        if (selectedOption === 'Da') {
                            datacontext.ponistiPromene();
                            return true;
                        } else {
                            return false;
                        }
                    });
            }
            return true;
        };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            viewAttached: viewAttached,
            nazad: nazad,
            ponisti: ponisti,
            sacuvaj: sacuvaj,
            canSave: canSave,
            hasChanges: hasChanges,
            proizvod: proizvod,
            kategorije: kategorije,
            brend: brend,
            podkategorije: podkategorije,
            obrisiVelicinu: obrisiVelicinu,
            ubaciVelicinu: ubaciVelicinu
        };
        return vm;
    });