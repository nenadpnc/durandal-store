define(['durandal/app'], function (app) {

    var checkoutModal = function (proizvodi) {
        this.proizvodi = proizvodi;
    };

    checkoutModal.prototype.cancel = function () {
        this.modal.close('Odustani');
    };

    checkoutModal.prototype.accept = function () {
        this.modal.close(this.proizvodi);
    }

    return checkoutModal;
});