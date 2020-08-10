import { Firestore } from '@google-cloud/firestore';
import { TestProjectId } from './testing';

const db = new Firestore({
  projectId: process.env.GOOGLE_PROJECT,
});

if (process.env.NODE_ENV !== 'production') {
  db.settings({
    projectId: TestProjectId,
    host: process.env.FIRESTORE_HOST || 'localhost',
    port: Number(process.env.FIRESTORE_PORT) || 8080,
    ssl: false,
  });
}

export const diagramsCollection = db.collection('diagrams');
