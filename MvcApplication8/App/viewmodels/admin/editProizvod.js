define(['services/admin_data', 'durandal/plugins/router', 'durandal/app', 'services/config'],
    function (datacontext, ruter, app, config) {

        var id,
            proizvod = ko.observable(),
            slike = ko.observableArray(),
            folder360 = ko.observable(),
            slike360 = ko.observableArray(),
            kategorije = ko.observableArray(),
            podkategorija = ko.observable(),
            boje = ko.observableArray(),
            bojeSplit = ko.observableArray(),
            brendovi = ko.observableArray(),
            isSaving = ko.observable(false),
            hasChanges = ko.computed(function () {
                return datacontext.hasChanges();
            }),
            signal = $.connection.proizvodHub;


        function activate(routeInfo) {
            bojeSplit([]);
            slike360([]);
            id = parseInt(routeInfo.id);
            return datacontext.editProizvod(id, proizvod, slike, slike360, folder360, boje, brendovi, kategorije)
                                .then(function () {
                                    srediBoje();
                                    proizvod().Kategorija.subscribe(function () {
                                        podkategorija(undefined);
                                    });
                                    fajl();
                                });
        };

        signal.client.azurirajZalihe = function (proizvodi) {
            var promenjeniProizvodi = proizvodi.split(',');

            for (var i = 0; i < promenjeniProizvodi.length; i++) {
                if (parseInt(promenjeniProizvodi[i]) === id) {
                    datacontext.vratiProizvod(id, proizvod);
                    break;
                }
            }
        };

        $.connection.hub.start();

        function fajl() {
            return ko.computed(function () {
                var slice = proizvod().SlikaSrc().split('/');
                slice = slice[slice.length - 1];
                return slice;
            });
        };

        function srediBoje() {
            bojeSplit([]);
            var boja = proizvod().Boja().split(' ');
            for (var i = 0; i < boja.length; i++) {
                var pom = {
                    boja: ko.observable(boja[i])
                };
                bojeSplit.push(pom);
            }
        };

        function viewAttached(view) {
            config.srediUpload(proizvod);
            srediEvent();
        };

        function srediEvent() {
            $('#podkat').on('change', function () {
                proizvod().PodkatNaziv(podkategorija().Naziv());
            });

            $('#sel_boja').on('change', function () {
                var b = $('#sel_boja option:selected').text(),
                    arr = proizvod().Boja().split(' '),
                    pom = {
                        boja: ko.observable(b)
                    };
                bojeSplit.push(pom);
                arr.push(b);
                proizvod().Boja(arr.join(' '));
            });
            $(document).on('click', '.boja > span', function () {
                var boja = $(this).text(),
                    arr = proizvod().Boja().split(' '),
                    pom = arr.filter(function (element) {
                        return element !== boja;
                    });
                bojeSplit([]);
                for (var i = 0; i < pom.length; i++) {
                    var p = {
                        boja: ko.observable(pom[i])
                    };
                    bojeSplit.push(p);
                }
                proizvod().Boja(pom.join(' '));
            });
        };

        function ponisti() {
            datacontext.ponistiPromene();
            $('#sel_boja').val(-1);
            srediBoje();
        };

        function sacuvaj() {
            isSaving(true);
            return datacontext.sacuvajPromene().fin(complete);

            function complete() {
                isSaving(false);
                signal.server.azurirajVelicine(id);
            }
        };

        var canSave = ko.computed(function () {
            return hasChanges() && !isSaving();
        });

        function nazad() {
            ruter.navigateBack();
        };

        function canDeactivate() {
            if (hasChanges()) {
                var naslov = 'Uređivanje proizvoda';
                var poruka = 'Poništi promene?';

                return app.showMessage(poruka, naslov, ['Da', 'Ne'])
                    .then(proveriOdgovor);
            }
            return true;

            function proveriOdgovor(izabranaOpcija) {
                if (izabranaOpcija === 'Da') {
                    ponisti();
                    return true;
                } else {
                    return false;
                }
            }
        };

        function obrisiVelicinu(velicina) {
            proizvod().Velicine.remove(velicina);
            velicina.entityAspect.setDeleted();
        }

        function ubaciVelicinu() {
            var pocetneVrednosti = {
                ProizvodID: id,
                Naziv: '',
                Kolicina: 0
            },
                velicina = datacontext.kreirajEntitet('Velicina', pocetneVrednosti);
            proizvod().Velicine.push(velicina);

        };

        var vm = {
            activate: activate,
            viewAttached: viewAttached,
            proizvod: proizvod,
            kategorije: kategorije,
            podkategorija: podkategorija,
            slike: slike,
            slike360: slike360,
            boje: boje,
            bojeSplit: bojeSplit,
            brendovi: brendovi,
            nazad: nazad,
            ponisti: ponisti,
            sacuvaj: sacuvaj,
            hasChanges: hasChanges,
            canSave: canSave,
            canDeactivate: canDeactivate,
            obrisiVelicinu: obrisiVelicinu,
            ubaciVelicinu: ubaciVelicinu,
            fajl: fajl
        };
        return vm;
    });