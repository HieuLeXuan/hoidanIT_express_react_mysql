import express from 'express';
import morgan from 'morgan';
const app = express();
require('dotenv').config();

import viewEngine from './config/viewEngine';
import initWebRoutes from './route/initWebRoutes';

// Middleware để ghi lại log khi thực hiện bất kỳ request nào
app.use(morgan('combined'))

// Middleware để xử lý JSON
app.use(express.json());

// Middleware để xử lý URL-encoded data
app.use(express.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`fullstack about web dev running at port ${port}!`);
})
