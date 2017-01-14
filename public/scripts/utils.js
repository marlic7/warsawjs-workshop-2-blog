(function (root) {
    'use strict';

    function assert(cond, msg) {
        if (!cond) throw new Error(msg || 'AssertionError');
    }

    function makeRequest(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
            callback(xhr.response);
        });
        xhr.send();
    }

    function randomInteger(used = []) {
        if(used.length > 1000) {
            throw new Error('Za dużo wygenerowanych identyfikatorów!');
        }
        const id = parseInt(Math.random() * 10000);
        if(used.includes(id)) {
            return randomInteger(used);
        }
        return id;
    }

    function removeHTMLTags(htmlString) {
        let $fake = document.createElement('fake');
        $fake.innerHTML = htmlString;
        return $fake.textContent;
    }

    root.blog.utils = {
        assert: assert,
        makeRequest: makeRequest,
        randomInteger: randomInteger,
        removeHTMLTags: removeHTMLTags
    };
}(window));
