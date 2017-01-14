(function (root) {
    'use strict';

    let runtime = root.blog.runtime;
    let removeHTMLTags = root.blog.utils.removeHTMLTags;

    class AddPostFormView {
        constructor() {
            this.$addButton = document.querySelector('#js-display-form-add-post');
            this.$addPostForm = document.querySelector('#js-post-add-form');


            this.$title = this.$addPostForm.querySelector('#js-post-title');
            this.$body = this.$addPostForm.querySelector('#js-post-body');
            this.$id = this.$addPostForm.querySelector('#js-post-id');

            this.$submitBtn = this.$addPostForm.querySelector('#js-post-submit');
            this.$deleteBtn = this.$addPostForm.querySelector('#js-post-delete');
            this.$formTitle = this.$addPostForm.querySelector('h1');

            this.$addButton.addEventListener('click', this.toggleDisplayForm.bind(this));
            this.$addPostForm.addEventListener('submit', this.onSubmit.bind(this));
        }

        toggleDisplayForm() {
            this.$addPostForm.classList.toggle('hide');
            this.loadDataToForm({ id: '', title: '', body: '' });
        }

        getFormData() {
            let title = removeHTMLTags(this.$title.value);
            let body = removeHTMLTags(this.$body.value);
            let id = removeHTMLTags(this.$id.value);

            return { id, title, body };
        }

        loadDataToForm(post) {
            this.$title.value = post.title;
            this.$body.value = post.body;
            this.$id.value = post.id;
            if(post.id) {
                this.$addPostForm.classList.remove('hide');
                this.$deleteBtn.classList.remove('hide');
                this.$submitBtn.value = 'Zapisz post';
                this.$formTitle.innerHTML = 'Zmień post';
            } else {
                this.$submitBtn.value = 'Dodaj nowy post';
                this.$formTitle.innerHTML = 'Dodaj post';
                this.$deleteBtn.classList.add('hide');
            }
        }

        onSubmit(evt) {
            evt.preventDefault();

            const formData = this.getFormData();

            runtime.emit('new-post', formData);

            this.toggleDisplayForm();
            this.clearInputs();
        }

        clearInputs() {
            this.$title.value = this.$body.value = '';
        }
    }

    root.blog.views.AddPostFormView = AddPostFormView;
}(window));
