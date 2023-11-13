// viewEngineConfig.js
import express from 'express';

const configureViewEngine = (app) => {
    app.use(express.static('./swerver/src/public'))
    // Cấu hình view engine là EJS
    app.set('view engine', 'ejs');
    app.set('views', './server/src/views');
};

module.exports = configureViewEngine;
