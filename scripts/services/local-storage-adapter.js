(function (root) {
    'use strict';

    // Jeśli będziemy wykorzystać REST API to ta funkcja się przyda.
    // let makeRequest = root.blog.utils.makeRequest;

    let randomInteger = root.blog.utils.randomInteger;
    let instanceCnt = 0;
    let POST_KEY = 'posts';

    class LocalStorageAdapter {
        constructor(key) {
            // check if one instance becouse of usage closure
            instanceCnt++;
            if(instanceCnt > 1) {
                throw new Error('Only one instance of LocalStorageAdapter is allowed!');
            }
            POST_KEY = key;
        }

        createOne(data, callback) {
            createOneInLocalStorage(data, callback);
        }

        readAll(callback) {
            fetchLocalStorage(callback);
        }

        readOneById(id, callback) {
            readOneByIdFromLocalStorage(id, callback);
        }

        updateOne(data, callback) {
            updateOneInLocalStorage(data, callback);
        }

        deleteOne(data, callback) {
            deleteOneFromLocalStorage(data, callback);
        }
    }

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
            if(idx > -1) {
                posts[idx] = data;

                saveLocalStorage(posts, (err) => {
                    if(err) {
                        callback(err);
                        return;
                    }
                    callback(null, data);
                });
            } else {
                callback(new Error(`Nie znaleziono posta o id = ${data.id}`));
            }
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
            } else {
                callback(new Error(`Nie usunięto posta o id = ${data.id}`));
            }
        });
    }

    root.blog.adapters.LocalStorageAdapter = LocalStorageAdapter;
}(window));
