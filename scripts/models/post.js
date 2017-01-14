(function (root) {
    'use strict';

    let assert = root.blog.utils.assert;

    class PostModel {
        constructor(data) {
            assert(typeof data.id === 'number');
            assert(typeof data.title === 'string');
            assert(typeof data.body === 'string');

            this.id = data.id;
            this.title = data.title;
            this.body = data.body;
        }
    }

    root.blog.models.Post = PostModel;
}(window));
