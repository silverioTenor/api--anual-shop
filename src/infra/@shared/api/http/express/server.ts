import 'reflect-metadata';
import '@infra/@shared/provider/ioc';
import '@infra/@shared/provider/tsyringe-container';

import dotenv from 'dotenv';
import { app } from './express';
import { config } from '../../../config/config';
import MapperRegistry from '../../../config/mapper/profile-registry.mapper';

dotenv.config();

MapperRegistry.regiterAll();

const port = Number(config.app.port);
const host = config.app.host;
const protocol = config.app.protocol;

app.listen(port, () => {
   console.log(`🚀 Server is running on port ${port}`);
   console.log(`📄 The documentation is available at ${protocol}://${host}:${port}/docs`);
});
