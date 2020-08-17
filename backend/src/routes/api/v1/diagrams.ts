import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Diagram } from '../../../interfaces';
import { diagramsCollection } from '../../../firestore';

export const router = express.Router();

interface GetDiagramsResponse {
  diagrams: Diagram[];
}

router.get<Record<string, string>, GetDiagramsResponse>(
  '/',
  async (_, res, next) => {
    try {
      const documents = await diagramsCollection.get();
      const diagrams: Diagram[] = [];
      documents.forEach((doc) => {
        const data = doc.data();
        diagrams.push({
          id: doc.id,
          userId: data.userId as string,
          title: data.title as string,
          content: data.content as string,
          createdAt: data.createdAt.toDate().toISOString(),
        });
      });
      res.json({ diagrams: diagrams });
    } catch (err) {
      next(err);
    }
  },
);

interface PostDiagramResponse {
  diagram: Diagram;
}

router.post<Record<string, string>, PostDiagramResponse>(
  '/',
  async (req, res, next) => {
    try {
      const diagramParam = req.body;
      const diagramId = uuidv4();
      const userId = 'yuya-takeyama';
      const title = diagramParam.diagram.title;
      const content = diagramParam.diagram.content;
      const createdAt = new Date();
      diagramsCollection.doc(diagramId).set({
        userId,
        title,
        content,
        createdAt,
      });
      res.json({
        diagram: {
          id: diagramId,
          userId,
          title,
          content,
          createdAt: createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

interface GetDiagramResponse {
  diagram: Diagram;
}

interface DiagramNotFoundError {
  error: {
    message: string;
  };
}

router.get<Record<string, string>, GetDiagramResponse | DiagramNotFoundError>(
  '/:id',
  async (req, res, next) => {
    try {
      const diagramId = req.params.id;
      const doc = await diagramsCollection.doc(diagramId).get();

      if (doc.exists) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const data = doc.data()!;
        res.json({
          diagram: {
            id: doc.id,
            userId: data.userId,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt.toDate().toISOString(),
          },
        });
      } else {
        res.status(404).json({ error: { message: 'Diagram is not found' } });
      }
    } catch (err) {
      next(err);
    }
  },
);
