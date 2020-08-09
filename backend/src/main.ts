import express from 'express';
import { router as diagramsRouter } from './routes/api/v1/diagrams';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/api/v1', (_, res) => {
  res.json({ message: 'Hello, World!' });
});

app.use('/api/v1/diagrams', diagramsRouter);

app.listen(port, () => {
  console.error(`Example app listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.error('Received SIGINT: shutting down...');
  process.exit();
});
