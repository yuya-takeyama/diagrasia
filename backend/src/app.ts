import express from 'express';
import bodyParser from 'body-parser';
import { router as diagramsRouter } from './routes/api/v1/diagrams';

export const app = express();

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/api/v1', (_, res) => {
  res.json({ message: 'Hello, World!' });
});

app.use('/api/v1/diagrams', diagramsRouter);
