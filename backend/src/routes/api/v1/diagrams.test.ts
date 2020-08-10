import request from 'supertest';
import { clearFirestoreData } from '@firebase/testing';
import { app } from '../../../app';
import { Diagram } from '../../../interfaces';
import { diagramsCollection } from '../../../firestore';
import { TestProjectId } from '../../../testing';

if (process.env.NODE_ENV !== 'test') {
  throw new Error(
    `This should be run in testing environment: NODE_ENV is ${JSON.stringify(
      process.env.NODE_ENV,
    )}`,
  );
}

describe('diagrams router', () => {
  beforeEach(async () => {
    await clearFirestoreData({ projectId: TestProjectId });
  });

  describe('GET /api/v1/diagrams', () => {
    it('returns an empty array', async () => {
      const res = await request(app).get('/api/v1/diagrams');
      expect(JSON.parse(res.text)).toEqual({ diagrams: [] });
    });

    describe('with diagrams are stored', () => {
      const diagrams: Diagram[] = [
        {
          id: '0575cafe-8f02-427c-822b-954338e5a129',
          userId: 'yuya-takeyama',
          content: 'foo',
        },
        {
          id: '55b40c12-5c50-49b8-b2a9-e29c96f99d47',
          userId: 'yuya-takeyama',
          content: 'bar',
        },
        {
          id: 'ea255909-7acb-40d4-9f41-a20e1236ad91',
          userId: 'yuya-takeyama',
          content: 'baz',
        },
      ];

      beforeEach(async () => {
        for (const diagram of diagrams) {
          await diagramsCollection
            .doc(diagram.id)
            .set({ userId: diagram.userId, content: diagram.content });
        }
      });

      it('returns all diagrams as an array', async () => {
        const res = await request(app).get('/api/v1/diagrams');
        expect(JSON.parse(res.text)).toEqual({ diagrams: diagrams });
      });
    });
  });

  describe('POST /api/v1/diagrams', () => {
    it('returns a created diagram', async () => {
      const res = await request(app)
        .post('/api/v1/diagrams')
        .set('Content-Type', 'application/json')
        .send({
          diagram: { userId: 'yuya-takeyama', content: 'foo' },
        });

      const parsedBody = JSON.parse(res.text);
      const diagramId = parsedBody.diagram.id;

      expect(diagramId).toMatch(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      );

      const expectedBody = {
        diagram: {
          id: parsedBody.diagram.id,
          userId: 'yuya-takeyama',
          content: 'foo',
        },
      };

      expect(parsedBody).toEqual(expectedBody);

      const getRes = await request(app).get(`/api/v1/diagrams/${diagramId}`);

      expect(JSON.parse(getRes.text)).toEqual(expectedBody);
    });
  });

  describe('GET /api/v1/diagrams/:id', () => {
    describe('when the ID does not exist', () => {
      it('returns 404 and error message', async () => {
        const res = await request(app).get('/api/v1/diagrams/foo');
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.text)).toEqual({
          error: { message: 'Diagram is not found' },
        });
      });
    });
  });
});
