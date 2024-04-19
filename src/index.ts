import express from 'express';
import cors from 'cors';
import { consoleLogTimed } from './utils/app-utils';
import customerController from './controllers/customer-controller';

const app = express();
app.use([express.json(), cors()]);

const PORT = 8080;
app.use('/api/customer', customerController);

app.listen(PORT, () => {
  consoleLogTimed(`Server running on port ${PORT}.`);
});
