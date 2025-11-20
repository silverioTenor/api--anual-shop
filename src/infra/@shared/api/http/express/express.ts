import 'express-async-errors';
import express from 'express';
import path from "path";
import { apiReference } from '@scalar/express-api-reference';

import { RegisterRoutes } from './routes/routes';

const openapiPath = path.resolve(__dirname, "openapi", "swagger.json");

const openapi = require(openapiPath);

export const app = express();
app.use(express.json());

// Register TSOA generated routes
RegisterRoutes(app);

// API Documentation Route
app.use(
   '/docs',
   apiReference({
      theme: 'dark',
      spec: {
         content: openapi
      },
   })
)
