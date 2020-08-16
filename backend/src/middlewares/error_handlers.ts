import { Request, Response, NextFunction } from 'express';

export const productionErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ error: { message: 'Internal server error' } });
};

export const developmentErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ error: { message: err.message, stack: err.stack } });
};
