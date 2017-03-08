const pkg = require('../package');

const apiDoc = {
    swagger: '2.0',
    basePath: '/v1',
    info: {
        title: 'demo API',
        version: pkg.version
    },
    definitions: {},
    paths: {}
};

module.exports = apiDoc;