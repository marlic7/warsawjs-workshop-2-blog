(function (root) {
    'use strict';

    // Jeśli będziemy wykorzystać REST API to ta funkcja się przyda.
    // let makeRequest = root.blog.utils.makeRequest;
    let randomInteger = root.blog.utils.randomInteger;

    const POST_KEY = 'posts';

    // dostęp do localStorage jest synchroniczny ale API fetch i save
    // celowo zostało oparte na callback w celach edukacyjnych

    function fetchLocalStorage(callback) {
        try {
            let posts = root.localStorage.getItem(POST_KEY);
            posts = JSON.parse(posts);
            callback(null, posts || []);
        } catch (err) {
            callback(err);
        }
    }

    function saveLocalStorage(data, callback) {
        try {
            console.log("data:", data);

            root.localStorage.setItem(POST_KEY, JSON.stringify(data));
            callback(null, data);
        } catch(err) {
            callback(err);
        }
    }

    function createOneInLocalStorage(data, callback) {
        fetchLocalStorage((err, posts) => {
            if(err) {
                callback(err);
                return;
            }

            let newData;

            try {
                const id = randomInteger(posts.map(v => v.id));
                newData = Object.assign(data, { id });
                posts.push(newData);
            } catch(err) {
                callback(err);
                return;
            }

            saveLocalStorage(posts, (err) => {
                if(err) {
                    callback(err);
                    return;
                }
                callback(null, newData);
            });
        });
    }

    function readOneByIdFromLocalStorage(id, callback) {
        fetchLocalStorage((err, posts) => {
            if(err) {
                callback(err);
                return;
            }
            const post = posts.find(v => v.id === id);
            if(post) {
                callback(null, post);
                return;
            }
            callback(new Error(`Nie znaleziono posta o id = ${id}`));
        });
    }

    function updateOneInLocalStorage(data, callback) {
        if(!data || !data.id) {
            callback(new Error('Brak id posta!'));
            return;
        }

        fetchLocalStorage((err, posts) => {
            if(err) {
                callback(err);
                return;
            }
            const idx = posts.findIndex(v => v.id === data.id);
            if(idx) {
                posts[idx] = data;

                saveLocalStorage(posts, (err) => {
                    if(err) {
                        callback(err);
                        return;
                    }
                    callback(null, data);
                });
            }
            callback(new Error(`Nie znaleziono posta o id = ${data.id}`));
        });
    }

    function deleteOneFromLocalStorage(data, callback) {
        if(!data || !data.id) {
            callback(new Error('Brak id posta!'));
            return;
        }

        fetchLocalStorage((err, posts) => {
            if(err) {
                callback(err);
                return;
            }
            const newPosts = posts.filter(v => v.id !== data.id);

            if(posts.length === newPosts.length + 1) {
                saveLocalStorage(newPosts, (err) => {
                    if(err) {
                        callback(err);
                        return;
                    }
                    callback();
                });
            }
            callback(new Error(`Nie usunięto posta o id = ${data.id}`));
        });
    }

    class PostsService {

        static createOne(data, callback) {
            createOneInLocalStorage(data, callback);
        }

        static readAll(callback) {
            fetchLocalStorage(callback);
        }

        static readOneById(id, callback) {
            readOneByIdFromLocalStorage(id, callback);
        }

        static updateOne(data, callback) {
            updateOneInLocalStorage(data, callback);
        }

        static deleteOne(data, callback) {
            deleteOneFromLocalStorage(data, callback);
        }
    }

    root.blog.services.PostsService = PostsService;
}(window));
