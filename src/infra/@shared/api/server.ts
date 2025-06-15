import 'express-async-errors';
import express from 'express';

export const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
   console.log(`🚀 Server is running on port ${port}`);
});