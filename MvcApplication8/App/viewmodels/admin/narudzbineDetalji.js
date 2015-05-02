define(function () {
    var detalji = function (narudzbina) {
        this.narudzbina = narudzbina;
    };

    detalji.prototype.accept = function () {
        this.modal.close();
    };

    return detalji;
});