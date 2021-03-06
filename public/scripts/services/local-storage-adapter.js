(function (root) {
    'use strict';

    class LocalStorageAdapter {
        constructor(key) {
            this.key = key;
        }

        get(callback) {
            let posts = root.localStorage.getItem(this.key);

            try {
                posts = JSON.parse(posts);
            } catch (e) {
                console.error(e);
            }

            callback(null, posts || []);
        }

        set(data, callback = Function) {
            root.localStorage.setItem(this.key, JSON.stringify(data));
            callback(null);
        }
    }

    root.blog.adapters.LocalStorageAdapter = LocalStorageAdapter;
}(window));
