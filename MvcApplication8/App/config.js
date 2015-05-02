define(['services/datacontext',
    'durandal/app',
    'durandal/plugins/router',
    'viewmodels/prodavnica/checkoutModal',
    'services/payPalCaller',
    'services/auth'],
    function (datacontext, app, ruter, modal, paypalCaller, auth) {
        var removedItems = null,
            aktivnoDugmeBoje = null,
            aktivnoDugmeBrendovi = null,
            aktivnoDugmeKategorije = null,
            filterBoje = '',
            filterBrendovi = '',
            filterKategorije = '';

        function postaviKorpu(ukupno) {
            PAYPAL.apps.MiniCart.render({
                events: {
                    afterRender: function () {
                        var proizvodi = this.products;
                        var u = 0;
                        for (var i = 0; i < proizvodi.length; i++) {
                            u += proizvodi[i].getQuantity();
                        }
                        ukupno(u);
                    },
                    afterAddToCart: function () {
                        var proizvodi = this.products;
                        var u = 0;
                        for (var i = 0; i < proizvodi.length; i++) {
                            u += proizvodi[i].getQuantity();
                        }
                        ukupno(u);
                    },
                    afterRemoveFromCart: function () {
                        var proizvodi = this.products;
                        var u = 0;
                        for (var i = 0; i < proizvodi.length; i++) {
                            u += proizvodi[i].getQuantity();
                        }
                        ukupno(u);
                    },
                    onAddToCart: function (data) {
                        var q = this.getProductAtOffset(data.offset);
                        if ( q !== false) {
                            if (q.product.quantity === parseInt(q.product.max_quantity)) {
                                toastr.error('Dostignut kapacitet zaliha za dati proizvod!');
                                return false;
                            }
                        }
                    },
                    onCheckout: function (data) {
                        var id = auth.vratiKorisnikId(),
                            proizvodi = this.products,
                            total = this.calculateSubtotal();
                        if (!id()) {
                            toastr.info('Morate se ulogovati da bi završili kupovinu.');
                            return false;
                        }
                        if (proizvodi.length === 0) {
                            toastr.info('Korpa je prazna...');
                            return false;
                        }
                        app.showModal(new modal(proizvodi)).then(function (response) {
                            if (response !== 'Odustani') {
                                $('#overlay, .spinner').addClass('active');
                                paypalCaller.shortcutExpressCheckout(total, response, id());
                            }
                        });
                        return false;
                    },
                    afterReset: function () {
                        var proizvodi = this.products;
                        var u = 0;
                        for (var i = 0; i < proizvodi.length; i++) {
                            u += proizvodi[i].getQuantity();
                        }
                        ukupno(u);
                    }
                }
            });
        };

        function namestiKonfigMeni(konfigMeni) {
            konfigMeni.sidr({
                body: ''
            });
        };

        function zatvoriKonfigMeni() {
            return jQuery.sidr('close');
        };

        function namestiGrid(container, selector) {

            container.masonry({
                itemSelector: selector,
                isFitWidth: true,
                animationOptions: {
                    duration: 300
                }
            });

        };

        function namestiFIlter(container, katObservable, brendObservable, bojeObservable) {
            removedItems = null;
            filterBoje = '';
            filterBrendovi = '';
            filterKategorije = '';
            container.mixitup({
                filterLogic: 'and',
                multiFilter: true,
                onMixStart: function (config) {

                    var podeliFilter = config.filter.split(" ");
                    var poslednjiFilter = podeliFilter[podeliFilter.length - 1];

                    var aktivneBoje = $('#filterBoje > button.active').length,
                    aktivniBrendovi = $('#filterBrendovi > button.active').length,
                    aktivneKategorije = $('#filterKategorije > li > a.active').length;

                    if (aktivneBoje === 1) {
                        if (poslednjiFilter !== 'obrisiBoje') {
                            filterBoje = ' ' + $('#filterBoje > button.active').attr('data-filter');
                            bojeObservable(filterBoje);
                        } else {
                            filterBoje = '';
                            bojeObservable(filterBoje);
                            aktivnoDugmeBoje.removeClass('active');
                        }
                    } else if (aktivneBoje > 1) {
                        var i = config.filter.split(" ");
                        filterBoje = ' ' + i[i.length - 1];
                        bojeObservable(filterBoje);
                    } else if (aktivneBoje === 0) {
                        filterBoje = '';
                        bojeObservable(filterBoje);
                    }
                    if (aktivniBrendovi === 1) {
                        if (poslednjiFilter !== 'obrisiBrendove') {
                            filterBrendovi = ' ' + $('#filterBrendovi > button.active').attr('data-filter');
                            brendObservable(filterBrendovi);
                        } else {
                            filterBrendovi = '';
                            brendObservable(filterBrendovi);
                            aktivnoDugmeBrendovi.removeClass('active');
                        }
                    } else if (aktivniBrendovi > 1) {
                        var i = config.filter.split(" ");
                        filterBrendovi = ' ' + i[i.length - 1];
                        brendObservable(filterBrendovi);
                    } else if (aktivniBrendovi === 0) {
                        filterBrendovi = '';
                        brendObservable(filterBrendovi);
                    }
                    if (aktivneKategorije === 1) {
                        if (poslednjiFilter !== 'obrisiKategorije') {
                            filterKategorije = ' ' + $('#filterKategorije > li > a.active').attr('data-filter');
                            katObservable(filterKategorije);
                        } else {
                            filterKategorije = '';
                            katObservable(filterKategorije);
                            aktivnoDugmeKategorije.removeClass('active');
                        }
                    } else if (aktivneKategorije > 1) {
                        var i = config.filter.split(" ");
                        filterKategorije = ' ' + i[i.length - 1];
                        katObservable(filterKategorije);
                    } else if (aktivneKategorije === 0) {
                        filterKategorije = '';
                        katObservable(filterKategorije);
                    }

                    if (removedItems != null) {
                        container.append(removedItems).masonry('appended', removedItems);
                    }

                    config.filter = 'mix_all' + filterKategorije + filterBrendovi + filterBoje;
                    return config;
                },
                onMixEnd: function (config) {
                    var filter = config.filter.replace('mix_all ', '').replace(/ /g, '.');
                    var items = $('.mix').length;
                    var itemsToRemove = $('.mix').not('.' + filter);
                    var numItems = items - itemsToRemove.length;
                    if (numItems > 1 && numItems < items) {
                        toastr.success('Pronađeno je ' + numItems + ' proizvoda za dati filter');
                    } else if (numItems === 0) {
                        toastr.info('Nema proizvoda za dati filter');
                    } else if (numItems === 1) {
                        toastr.success('Pronađen je 1 proizvod za dati filter');
                    }
                    container.masonry('remove', itemsToRemove).masonry('reload');
                    removedItems = itemsToRemove;
                }
            });
        };

        function filterRemix() {
            removedItems = null;
            $('#container').mixitup('remix', 'all');
        };

        function namestiEvent() {

            $('.lista .konfigMeni').on('tap', function (e) {
                e.preventDefault();
            });
            $(window).on('resize', function () {
                $('#container').masonry('reload');
            });
            
            $(document).on('tap', function (e) {
                var target = e.target,
                    meni = document.getElementById('sidr');

                if (!(/input|button|select|option/i.test(target.tagName))) {
                    while (target.nodeType === 1) {
                        if (target === meni) {
                            return;
                        }
                        target = target.parentNode;
                    }
                    jQuery.sidr('close');
                }
            });

            $('#filterBoje > button').on('tap', function () {
                var $t = $(this);
                if (aktivnoDugmeBoje === null || aktivnoDugmeBoje === $t) {
                    aktivnoDugmeBoje = $t;
                    return;
                } else {
                    aktivnoDugmeBoje.removeClass('active');
                    aktivnoDugmeBoje = $t;
                }
            });
            $('#filterBrendovi > button').on('tap', function () {
                var $t = $(this);
                if (aktivnoDugmeBrendovi === null || aktivnoDugmeBrendovi === $t) {
                    aktivnoDugmeBrendovi = $t;
                    return;
                } else {
                    aktivnoDugmeBrendovi.removeClass('active');
                    aktivnoDugmeBrendovi = $t;
                }
            });
            $('#filterKategorije > li > a').on('tap', function () {
                var $t = $(this);
                if (aktivnoDugmeKategorije === null || aktivnoDugmeKategorije === $t) {
                    aktivnoDugmeKategorije = $t;
                    return;
                } else {
                    aktivnoDugmeKategorije.removeClass('active');
                    aktivnoDugmeKategorije = $t;
                }
            });
            $('#brisanjeFiltera > button').on('tap', function () {
                var $t = $(this);
                $t.removeClass('active');
            });
            $('#pretraga').on('keyup', function () {
                var $t = $(this);
                var icon = $('#icon');
                if ($t.val() === '') {
                    icon.removeClass('icon-search').addClass('icon-repeat');
                } else {
                    icon.removeClass('icon-repeat').addClass('icon-search');
                }
            });
        };

        function postavi360(slika, slika360Putanja) {
            if (slika360Putanja()) {
                var brFrejmova = slika360Putanja().BrojFrejmova,
                    src = slika360Putanja().Src,
                    arr = [];
                for (var i = 1; i <= brFrejmova; i++) {
                    arr.push(src + '' + i + '.jpg');
                }

                slika.threesixty({
                    images: arr,
                    method: 'click',
                    'cycle': 2,
                    direction: 'forward',
                    'resetMargin': 10
                });
            }
        };

        function postaviFav(proizvod, favProizvod) {
            $("figure.kudo").kudoable();

            $("figure.kudo").on('kudo:added', function () {
                var broj = $('.num');
                var a = parseInt(broj.text());
                var korId = auth.vratiKorisnikId();
                if (korId()) {
                    var promise = datacontext.vratiFavProizvod(favProizvod, proizvod().ProizvodID(), korId);
                    return promise.then(function () {
                        if (!favProizvod()) {
                            proizvod().BrojFav(a);
                            return datacontext.sacuvajFavProizvod(proizvod().ProizvodID(), korId()).then(datacontext.sacuvajPromene);
                        } else {
                            var b = a - 1;
                            broj.text(b);
                            return;
                        }
                    });
                } else {
                    proizvod().BrojFav(a);
                    return datacontext.sacuvajPromene();
                }
            });
            $("figure.kudo").on('kudo:removed', function () {
                var a = parseInt($('.num').text());
                proizvod().BrojFav(a);
                if (favProizvod()) {
                    favProizvod().entityAspect.setDeleted();
                }
                return datacontext.sacuvajPromene();
            });
        };

        function postaviStranuDetalji() {

            $('#foto').fotorama().css({ visibility: 'visible', display: 'none' }).fadeIn(100);

            $('#st-accordion').accordion();

            $('textarea#textarea').maxlength({
                alwaysShow: true
            });

            $('.komentari').timeago();

            var forma = document.getElementById('forma');

            PAYPAL.apps.MiniCart.bindForm(forma);
        };

        function postaviPocetnuStranu() {
            var container = $('#grid');
            
            $('.natpis').on('tap', function () {
                var url = '#/proizvodDetalji/' + this.id;
                ruter.navigateTo(url);
            });

            $('#konfigMeniMobile').removeClass('visVisible').addClass('visHidden');

            container.masonry({
                itemSelector: '.thumbs',
                isFitWidth: true,
                isAnimated: true
            });

            container.css({ visibility: 'visible', display: 'none' }).fadeIn(100);

            $('.comments').timeago();

            $(window).on('resize', function () {
                container.masonry('reload');
            });
        };

        function postaviKurs(kurs) {
            $.ajax({
                url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22EURRSD%22%2C%22EURUSD%22%2C%20%22EURGBP%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var rate = data.query.results.rate;
                    kurs.RSD(parseFloat(rate[0].Rate).toFixed(2));
                    kurs.USD(parseFloat(rate[1].Rate).toFixed(2));
                    kurs.GBP(parseFloat(rate[2].Rate).toFixed(2));
                },
                error: function (jqXHR, tranStatus, errorThrown) {
                    toastr.error('Greska pri vraćanju kursne liste: ' + errorThrown);
                }
            });
        };

        return {
            namestiGrid: namestiGrid,
            postavi360: postavi360,
            namestiFIlter: namestiFIlter,
            namestiKonfigMeni: namestiKonfigMeni,
            zatvoriKonfigMeni: zatvoriKonfigMeni,
            namestiEvent: namestiEvent,
            postaviFav: postaviFav,
            postaviStranuDetalji: postaviStranuDetalji,
            postaviKorpu: postaviKorpu,
            filterRemix: filterRemix,
            postaviPocetnuStranu: postaviPocetnuStranu,
            postaviKurs: postaviKurs
        };
    });