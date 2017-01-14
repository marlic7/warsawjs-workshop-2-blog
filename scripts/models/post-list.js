(function (root) {
    'use strict';

    class PostList {
        constructor() {
            this.posts = [];
        }

        addPostModel(postModel) {
            this.posts.push(postModel);
        }

        getPostModelById(id) {
            return this.posts.find(v => v.id === id);
        }
    }

    root.blog.models.PostList = PostList;
}(window));
