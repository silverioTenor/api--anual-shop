import 'express-async-errors';
import express from 'express';

import routes from './routes/main';

export const app = express();
app.use(express.json());
app.use(routes);