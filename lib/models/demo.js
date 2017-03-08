'use strict';

function factory() {
    return {
        hello
    };

    function hello() {
        return new Promise((resolve, reject) => {
            resolve('world');
        });
    }
}

module.exports = factory;