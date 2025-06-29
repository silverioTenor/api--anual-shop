import 'reflect-metadata';

import dotenv from 'dotenv';
import { app } from './express';
import { config } from '../config/config';
import MapperRegistry from '../config/mapper/profile-registry.mapper';

dotenv.config();

MapperRegistry.regiterAll();

const port = Number(config.app.port);

app.listen(port, () => {
   console.log(`🚀 Server is running on port ${port}`);
});