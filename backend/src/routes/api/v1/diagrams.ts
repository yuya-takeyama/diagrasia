import express from 'express';
import { Diagram } from '../../../interfaces';

export const router = express.Router();

interface DiagramsResponse {
  diagrams: Diagram[];
}

router.get<Record<string, string>, DiagramsResponse>('/', (_, res) => {
  res.json({ diagrams: [] });
});
