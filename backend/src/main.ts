import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.error(`Example app listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.error('Received SIGINT: shutting down...');
  process.exit();
});
