(function (root) {
    'use strict';

    class PostList {
        constructor() {
            this.posts = [];
        }

        addPostModel(postModel) {
            this.posts.push(postModel);
        }
    }

    root.blog.models.PostList = PostList;
}(window));
