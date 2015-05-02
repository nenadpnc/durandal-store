define(['services/admin_data'], function (datacontext) {

    function ukupnoProdato(narudzbine, brProdaja) {
        var br = 0;
        for (var i = 0; i < narudzbine().length; i++) {
            for (var j = 0; j < narudzbine()[i].NarudzbinaDetalji().length; j++) {
                br += narudzbine()[i].NarudzbinaDetalji()[j].Kolicina();
            }
        }
        brProdaja(br);
    };

    function ukupnaZarada(narudzbine, zarada) {
        var br = 0;
        for (var i = 0; i < narudzbine().length; i++) {
            br += narudzbine()[i].Ukupno();
        }
        zarada(br);
    };

    function namestiGraph(narudzbine, korisnici, proizvodi) {
        namestiGraphGodine(narudzbine);
        namestiGraphMeseci(narudzbine);
        namestiGraphDani(narudzbine);
        namestiGraphKorisnici(korisnici);
        namestiGraphZarade(narudzbine);
        namestiGraphProizvodi(proizvodi);
    };

    function namestiGraphZarade(narudzbine) {
        var godina = new Date().getFullYear(),
            arr = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
            arr2 = ['01/01/' + godina, '02/01/' + godina, '03/01/' + godina, '04/01/' + godina, '05/01/' + godina, '06/01/' + godina, '07/01/' + godina, '08/01/' + godina, '09/01/' + godina, '10/01/' + godina, '11/01/' + godina, '12/01/' + godina],
            arr3 = ['01/01/' + (godina - 1), '02/01/' + (godina - 1), '03/01/' + (godina - 1), '04/01/' + (godina - 1), '05/01/' + (godina - 1), '06/01/' + (godina - 1), '07/01/' + (godina - 1), '08/01/' + (godina - 1), '09/01/' + (godina - 1), '10/01/' + (godina - 1), '11/01/' + (godina - 1), '12/01/' + (godina - 1)],
            data = srediPodatkeZarada(arr2, narudzbine, 'month'),
            data2 = srediPodatkeZarada(arr3, narudzbine, 'month'),
            dataOptions = { datasetFill: false };
        var dataGraph = {
            labels: arr,
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: data2
            }, {
                fillColor: "rgba(185, 39, 39, 0.5)",
                strokeColor: "rgba(185, 39, 39, 1)",
                pointColor: "rgba(185, 39, 39, 1)",
                pointStrokeColor: "#fff",
                data: data
            }]
        };
        var myLine = new Chart(document.getElementById("graphZarada").getContext("2d")).Line(dataGraph, dataOptions);
    };

    function srediPodatkeZarada(arr, narudzbine, unit) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            var br = 0,
                pom = $.grep(narudzbine(), function (v) {
                    return moment(arr[i]).isSame(v.DatumIso(), unit);
                });

            if (pom.length > 0) {
                for (var j = 0; j < pom.length; j++) {
                    br += pom[j].Ukupno();
                }
            }
            data.push(br);
        }
        return data;
    };

    function namestiGraphKorisnici(korisnici) {
        var godina = new Date().getFullYear(),
            arr = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
            arr2 = ['01/01/' + godina, '02/01/' + godina, '03/01/' + godina, '04/01/' + godina, '05/01/' + godina, '06/01/' + godina, '07/01/' + godina, '08/01/' + godina, '09/01/' + godina, '10/01/' + godina, '11/01/' + godina, '12/01/' + godina],
            data = srediPodatkeKorisnici(arr2, korisnici, 'month');

        var dataGraph = {
            labels: arr,
            datasets: [{
                fillColor: "rgba(211, 84, 0, 0.5)",
                strokeColor: "rgba(211, 84, 0, 1)",
                pointColor: "rgba(211, 84, 0, 1)",
                pointStrokeColor: "#fff",
                data: data
            }]
        };
        var myLine = new Chart(document.getElementById("graphKorisnici").getContext("2d")).Line(dataGraph);
    };

    function srediPodatkeKorisnici(arr, korisnici, unit) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            var br = 0,
                pom = $.grep(korisnici(), function (v) {
                    return moment(arr[i]).isSame(v.DatumIso(), unit);
                });

            if (pom.length > 0) {
                for (var j = 0; j < pom.length; j++) {
                    br++;
                }
            }
            data.push(br);
        }
        return data;
    };

    function namestiGraphGodine(narudzbine) {

        var godina = new Date().getFullYear(),
            arr = [godina - 4, godina - 3, godina - 2, godina - 1, godina],
            arr2 = ['01/01/' + (godina - 4), '01/01/' + (godina - 3), '01/01/' + (godina - 2), '01/01/' + (godina - 1), '01/01/' + godina],
            data = srediPodatke(arr2, narudzbine, 'year');

        var dataGraph = {
            labels: arr,
            datasets: [{
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: data
            }]
        };
        var myLine = new Chart(document.getElementById("graphGodine").getContext("2d")).Line(dataGraph);
    };

    function namestiGraphMeseci(narudzbine) {
        var godina = new Date().getFullYear(),
            arr = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
            arr2 = ['01/01/' + godina, '02/01/' + godina, '03/01/' + godina, '04/01/' + godina, '05/01/' + godina, '06/01/' + godina, '07/01/' + godina, '08/01/' + godina, '09/01/' + godina, '10/01/' + godina, '11/01/' + godina, '12/01/' + godina],
            data = srediPodatke(arr2, narudzbine, 'month'),
            dataGraph = {
                labels: arr,
                datasets: [{
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: data
                }]
            };
        var myLine = new Chart(document.getElementById("graphMeseci").getContext("2d")).Line(dataGraph);
    };

    function namestiGraphDani(narudzbine) {
        var arr = [moment().subtract('days', 6).format('MM/DD/YYYY'), moment().subtract('days', 5).format('MM/DD/YYYY'), moment().subtract('days', 4).format('MM/DD/YYYY'), moment().subtract('days', 3).format('MM/DD/YYYY'), moment().subtract('days', 2).format('MM/DD/YYYY'), moment().subtract('days', 1).format('MM/DD/YYYY'), moment().format('MM/DD/YYYY')];
        var data = srediPodatke(arr, narudzbine, 'day'),
            dataGraph = {
                labels: arr,
                datasets: [{
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: data
                }]
            };
        var myLine = new Chart(document.getElementById("graphDani").getContext("2d")).Line(dataGraph);
    };

    function namestiGraphProizvodi(proizvodi) {
        var data = [{
            value: proizvodi()[0].BrProd,
            color: "#F7464A"
        }, {
            value: proizvodi()[1].BrProd,
            color: "#46BFBD"
        }, {
            value: proizvodi()[2].BrProd,
            color: "#FDB45C"
        }, {
            value: proizvodi()[3].BrProd,
            color: "#949FB1"
        }, {
            value: proizvodi()[4].BrProd,
            color: "#4D5360"
        }],
            options = { segmentShowStroke: false, percentageInnerCutout: 30, animationSteps: 50, animationEasing: 'easeOutQuad' },
            myDoughnut = new Chart(document.getElementById("graphProizvodi").getContext("2d")).Doughnut(data, options);
    };

    function srediPodatke(arr, narudzbine, unit) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            var br = 0,
                pom = $.grep(narudzbine(), function (v) {
                    return moment(arr[i]).isSame(v.DatumIso(), unit);
            });
            
            if (pom.length > 0) {
                for (var j = 0; j < pom.length; j++) {
                    for (var k = 0; k < pom[j].NarudzbinaDetalji().length; k++) {
                        br += pom[j].NarudzbinaDetalji()[k].Kolicina();
                    }
                }
            }
            data.push(br);
        }
        return data;
    };

    function namestiDatume(selector) {
        selector.timeago();
    };

    function srediUpload(proizvod) {
        uploadThumb(proizvod);
        uploadSlike();
        uploadSlike360();
    };

    function uploadThumb(proizvod) {
        var myDropzone = new Dropzone('#myDropzone', {
            url: '/api/upload/uploadThumb',
            maxFilesize: 2,
            addRemoveLinks: true,
            createImageThumbnails: true,
            maxFiles: 1,
            acceptedFiles: 'image/*',
            init: function () {
                this.on('complete', function () {
                    $('#zameni').css({ visibility: 'hidden' });
                });
                this.on('removedfile', function () {
                    $('#zameni').css({ visibility: 'hidden' });
                });
                this.on('canceled', function () {
                    $('#zameni').css({ visibility: 'hidden' });
                });
                this.on('success', function (file, responce) {
                    var path = '../../Slike/thumbs/' + file.name;
                    proizvod().SlikaSrc(path);
                    datacontext.sacuvajPromene();
                });
            },
            accept: function (file, done) {
                var dugme = $('#zameni');
                dugme.css({ visibility: 'visible' });
                dugme.on('click', function () {
                    return done();
                });
            }
        });
    };

    function uploadSlike() {
        var dropzoneSlike = new Dropzone('#dropzoneSlike', {
            url: '/api/upload/uploadSlike',
            maxFilesize: 2,
            addRemoveLinks: true,
            createImageThumbnails: true,
            acceptedFiles: 'image/*',
            init: function () {

            }
        });
    };

    function uploadSlike360() {
        var dropzoneSlike = new Dropzone('#dropzoneSlike360', {
            url: '/api/upload/uploadSlike',
            maxFilesize: 2,
            addRemoveLinks: true,
            createImageThumbnails: true,
            acceptedFiles: 'image/*',
            init: function () {

            }
        });
    };

    var config = {
        ukupnoProdato: ukupnoProdato,
        ukupnaZarada: ukupnaZarada,
        namestiGraph: namestiGraph,
        namestiDatume: namestiDatume,
        srediUpload: srediUpload
    };
    return config;
});