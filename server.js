'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const openapi = require('express-openapi');
const os = require('os');
const pkg = require('./package');
const v1ApiDoc = require('./v1/info');


// model factories
const demoFactory = require('./lib/models/demo');

// status logging
let logOptions = {
    component: pkg.name,
    version: pkg.version,
    description: pkg.description,
    tags: pkg.keywords,
    platform: os.platform(),
    hostname: os.hostname(),
    pid: process.pid
};

const app = express();

// body parsing
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// enable cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
    next();
});

// api setup
openapi.initialize({
    app,
    apiDoc: v1ApiDoc,
    dependencies: {
        demo: demoFactory(),
    },
    paths: './v1/routes',
    exposeApiDocs: true,
    docsPath: '/docs',
    errorMiddleware(err, req, res, next) { // todo: env-based handling
        console.log(err);
        res.status(400).json(err);
    }
});

app.use('/swagger-ui', express.static('swagger-ui'));

// init
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info(`${pkg.name} v${pkg.version} listening on port ${port}`);
});