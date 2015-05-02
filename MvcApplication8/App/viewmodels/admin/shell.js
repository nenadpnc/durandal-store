define(['durandal/plugins/router'], function (router) {

    function activate() {
        return router.activate('dashboard');
    };

    function viewAttached() {
        
    };

    var shell = {
        activate: activate,
        router: router,
        viewAttached: viewAttached
    };
    return shell;
});