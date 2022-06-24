import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { todoRoutes } from './routes/todo-routes.js';
import { logRequest } from './util/simple-logger.js';

const app = express();
const port = 3000;
// const hostname = '127.0.0.1';

const basedir = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(`${basedir}/`)));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: `${basedir}/` });
});
app.use(logRequest());
app.use(todoRoutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});