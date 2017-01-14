(function (root) {
    'use strict';

    const rootUrl = '/';
    const useHash = false;

    root.blog = {
        runtime: new EventEmitter(),
        router: new Navigo(rootUrl, useHash),
        controllers: {},
        models: {},
        services: {},
        adapters: {},
        views: {},
        utils: {}
    };
}(window));
