import dotenv from 'dotenv';
import { app } from './express';
import { config } from '../config/config';

dotenv.config();

const port = Number(config.app.port);

app.listen(port, () => {
   console.log(`🚀 Server is running on port ${port}`);
});