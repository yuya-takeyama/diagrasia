import { app } from './app';
import {
  productionErrorHandler,
  developmentErrorHandler,
} from './middlewares/error_handlers';

const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(isProduction ? productionErrorHandler : developmentErrorHandler);

app.listen(port, () => {
  console.error(`Example app listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.error('Received SIGINT: shutting down...');
  process.exit();
});
