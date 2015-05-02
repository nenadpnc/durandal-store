define(function () {
    var url = '/api/paypal/httpCall',
        host = 'www.sandbox.paypal.com';

    var shortcutExpressCheckout = function (amt, proizvodi, korisnikId) {
        var encoder = {
            METHOD: 'SetExpressCheckout',
            RETURNURL: 'http://localhost:56535/#/checkoutReview/',
            CANCELURL: 'http://localhost:56535/',
            BRANDNAME: 'Web prodavnica SPA',
            PAYMENTREQUEST_0_AMT: amt,
            PAYMENTREQUEST_0_ITEMAMT: amt,
            PAYMENTREQUEST_0_PAYMENTACTION: 'Sale',
            PAYMENTREQUEST_0_CURRENCYCODE: 'EUR'
        };
        for (var i = 0; i < proizvodi.length; i++) {
            encoder['L_PAYMENTREQUEST_0_NAME' + i] = proizvodi[i].product.item_name;
            encoder['L_PAYMENTREQUEST_0_AMT' + i] = proizvodi[i].product.amount;
            encoder['L_PAYMENTREQUEST_0_QTY' + i] = proizvodi[i].product.quantity;
        }

        var nvpRequest = encode(encoder);
        
        $.ajax({
            url: url,
            type: 'POST',
            data: { '': nvpRequest },
            dataType: 'text',
            success: function (result) {
                var decoder = {};
                decode(result, decoder);
                var ack = decoder.ACK.toLowerCase();
                if (ack !== null && (ack === 'success' || ack === 'successwithwarning')) {
                    if (window.localStorage) {
                        var detalji = {
                            token: decoder.TOKEN,
                            korisnikId: korisnikId,
                            ukupno: amt
                        };
                        localStorage.setItem('detalji', JSON.stringify(detalji));
                    }
                    window.location = 'https://' + host + '/cgi-bin/webscr?cmd=_express-checkout&token=' + decoder.TOKEN;
                } else {

                }
            },
            error: function (jqXHR, tranStatus, errorThrown) {
                toastr.error('Greška pri plaćanju: ' + errorThrown);
                return null;
            }
        });
        
    };

    var getCheckoutDetails = function (token, ukupno, narudzbina, greska) {
        return Q.all([getCheckoutDetailsPromise(token, ukupno, narudzbina, greska)]);
    };

    var getCheckoutDetailsPromise = function (token, ukupno, narudzbina, greska) {
        var encoder = {
            METHOD: 'GetExpressCheckoutDetails',
            TOKEN: token
        };

        var nvpRequest = encode(encoder);
        return $.ajax({
            url: url,
            type: 'POST',
            data: { '': nvpRequest },
            dataType: 'text',
            success: function (result) {
                var decoder = {};
                decode(result, decoder);
                var ack = decoder.ACK.toLowerCase();
                if (ack !== null && (ack === 'success' || ack === 'successwithwarning')) {
                    if (decoder.AMT !== ukupno) {
                        greska(true);
                        toastr.error('Greška pri vraćanju detalja.');
                        return;
                    }
                    narudzbina.datum(decoder.TIMESTAMP);
                    narudzbina.imePrezime(decoder.SHIPTONAME);
                    narudzbina.adresa(decoder.SHIPTOSTREET);
                    narudzbina.grad(decoder.SHIPTOCITY);
                    narudzbina.drzava(decoder.SHIPTOSTATE);
                    narudzbina.postanskiKod(decoder.SHIPTOZIP);
                    narudzbina.zemlja(decoder.SHIPTOCOUNTRYNAME);
                    narudzbina.email(decoder.EMAIL);
                    narudzbina.ukupno(decoder.AMT);
                    narudzbina.kupacId(decoder.PAYERID);
                    greska(false);
                } else {
                    greska(true);
                    toastr.error('Greška pri vraćanju detalja.');
                }
            },
            error: function (jqXHR, tranStatus, errorThrown) {
                toastr.error('Greška pri plaćanju: ' + errorThrown);
                greska(true);
                return null;
            }
        });
    };

    var doCheckoutPayment = function (token, payerId, ukupno, rezultat, transactionId) {
        return Q.all([doCheckoutPaymentPromise(token, payerId, ukupno, rezultat, transactionId)]);
    };

    var doCheckoutPaymentPromise = function (token, payerId, ukupno, rezultat, transactionId) {
        var encoder = {
            METHOD: 'DoExpressCheckoutPayment',
            TOKEN: token,
            PAYERID: payerId,
            PAYMENTREQUEST_0_AMT: ukupno,
            PAYMENTREQUEST_0_CURRENCYCODE: 'EUR',
            PAYMENTREQUEST_0_PAYMENTACTION: 'Sale'
        };

        var nvpRequest = encode(encoder);
        return $.ajax({
            url: url,
            type: 'POST',
            async: false,
            data: { '': nvpRequest },
            dataType: 'text',
            success: function (result) {
                var decoder = {};
                decode(result, decoder);
                var ack = decoder.ACK.toLowerCase();
                if (ack !== null && (ack === 'success' || ack === 'successwithwarning')) {
                    transactionId(decoder.PAYMENTINFO_0_TRANSACTIONID);
                    rezultat(true);
                }
            },
            error: function (jqXHR, tranStatus, errorThrown) {
                toastr.error('Greška pri plaćanju: ' + errorThrown);
                rezultat(false);
            }
        });
    };

    var encode = function (encoder) {
        var firstPair = true,
            string = '',
            ampersand = '&',
            equals = '=';

        for (var key in encoder) {
            if (encoder.hasOwnProperty(key)) {
                var name = encodeURIComponent(key).toString();
                var value = encodeURIComponent(encoder[key]);
                if (!firstPair) {
                    string += ampersand;
                }
                string += name + equals + value;
                firstPair = false;
            }
        }
        return string.toString();
    };

    var decode = function (result, decoder) {
        var str = result.split('&');

        for (var i = 0; i < str.length; i++) {
            var tokeni = str[i].split('=');

            if (tokeni.length >= 2) {
                var name = decodeURIComponent(tokeni[0]);
                var value = decodeURIComponent(tokeni[1]);
                decoder[name] = value;
            }
        }
    };

    var paypalCaller = {
        shortcutExpressCheckout: shortcutExpressCheckout,
        getCheckoutDetails: getCheckoutDetails,
        doCheckoutPayment: doCheckoutPayment
    };
    return paypalCaller;
});