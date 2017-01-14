(function (root) {
    'use strict';

    let runtime = root.blog.runtime;
    let PostsService = root.blog.services.PostsService;

    new root.blog.views.AddPostFormView();
    let postView = new root.blog.views.PostView();

    let PostModel = root.blog.models.Post;
    let PostListModel = root.blog.models.PostList;

    class AppController {
        constructor() {
            this.postListModel = new PostListModel();

            PostsService.readAll((err, postList) => {
                if(err) {
                    console.error(err);
                    return;
                }
                postList.forEach(this.createPost, this);
            });

            runtime.on('new-post', (formData) => {
                PostsService.createOne(formData, (err, post) => {
                    if(err) {
                        console.error(err);
                        return;
                    }
                    this.createPost(post);
                });
            });
        }

        createPost(post) {
            let postModel = post;
            if(!(post instanceof PostModel)) {
                postModel = new PostModel(post);
            }
            this.postListModel.addPostModel(postModel);
            postView.render(postModel);
        }
    }

    root.blog.controllers.AppController = AppController;
}(window));
