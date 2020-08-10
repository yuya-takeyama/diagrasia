import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Diagram } from '../../../interfaces';
import { diagramsCollection } from '../../../firestore';

export const router = express.Router();

router.get<Record<string, string>, any>('/', async (_, res, next) => {
  try {
    const documents = await diagramsCollection.get();
    const diagrams: Diagram[] = [];
    documents.forEach((doc) => {
      const data = doc.data();
      diagrams.push({
        id: doc.id,
        userId: data.userId as string,
        content: data.content as string,
      });
    });
    res.json({ diagrams: diagrams });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const diagramParam = req.body;
    const diagramId = uuidv4();
    const userId = 'yuya-takeyama';
    const content = diagramParam.diagram.content;
    diagramsCollection.doc(diagramId).set({
      userId,
      content,
    });
    res.json({
      diagram: {
        id: diagramId,
        userId,
        content,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const diagramId = req.params.id;
    const doc = await diagramsCollection.doc(diagramId).get();

    if (doc.exists) {
      const data = doc.data()!;
      res.json({
        diagram: {
          id: doc.id,
          userId: data.userId,
          content: data.content,
        },
      });
    } else {
      res.status(404).json({ error: { message: 'Diagram is not found' } });
    }
  } catch (err) {
    next(err);
  }
});
