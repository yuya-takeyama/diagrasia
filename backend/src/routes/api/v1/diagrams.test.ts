import request from 'supertest';
import { clearFirestoreData } from '@firebase/testing';
import tk from 'timekeeper';
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
          id: 'ea255909-7acb-40d4-9f41-a20e1236ad91',
          userId: 'yuya-takeyama',
          title: 'baz',
          content: 'baz content',
          createdAt: new Date('2020-08-17T16:16:20.875Z'),
        },
        {
          id: '55b40c12-5c50-49b8-b2a9-e29c96f99d47',
          userId: 'yuya-takeyama',
          title: 'bar',
          content: 'bar diagram',
          createdAt: new Date('2020-08-17T16:15:56.561Z'),
        },
        {
          id: '0575cafe-8f02-427c-822b-954338e5a129',
          userId: 'yuya-takeyama',
          title: 'foo',
          content: 'foo diagram',
          createdAt: new Date('2020-08-17T16:15:16.583Z'),
        },
      ];

      beforeEach(async () => {
        for (const diagram of diagrams) {
          await diagramsCollection.doc(diagram.id).set({
            userId: diagram.userId,
            title: diagram.title,
            content: diagram.content,
            createdAt: diagram.createdAt,
          });
        }
      });

      it('returns all diagrams as an array', async () => {
        const res = await request(app).get('/api/v1/diagrams');
        const expected = {
          diagrams: diagrams.map((d) => ({
            ...d,
            createdAt: d.createdAt.toISOString(),
          })),
        };
        expect(JSON.parse(res.text)).toEqual(expected);
      });
    });
  });

  describe('POST /api/v1/diagrams', () => {
    it('returns a created diagram', async () => {
      const now = new Date('2020-08-17T16:23:41.991Z');
      tk.freeze(now);

      try {
        const res = await request(app)
          .post('/api/v1/diagrams')
          .set('Content-Type', 'application/json')
          .send({
            diagram: {
              userId: 'yuya-takeyama',
              title: 'foo',
              content: 'foo diagram',
            },
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
            title: 'foo',
            content: 'foo diagram',
            createdAt: '2020-08-17T16:23:41.991Z',
          },
        };

        expect(parsedBody).toEqual(expectedBody);

        const getRes = await request(app).get(`/api/v1/diagrams/${diagramId}`);

        expect(JSON.parse(getRes.text)).toEqual(expectedBody);
      } finally {
        tk.reset();
      }
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
