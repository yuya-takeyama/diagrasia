import { app } from './app';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.error(`Example app listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.error('Received SIGINT: shutting down...');
  process.exit();
});
