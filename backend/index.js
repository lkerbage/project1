import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';

import {fileURLToPath} from 'url';
import {todoRoutes} from './routes/todo-routes.js';
import {logRequest} from './util/simple-logger.js';

const app = express();
const port = 3000;

const basedir = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve('public/')));
app.use(bodyParser.json());

app.use(express.static(path.resolve(`${basedir}/public/`)));
app.use(bodyParser.json());
app.get(`${basedir}/public/`, (req, res) => {
    res.sendFile(`${basedir}/index.html/`, {root: `${basedir}/public/`});
});

app.use(logRequest());
app.use(todoRoutes);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});