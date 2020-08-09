import request from 'supertest';
import { app } from '../../../app';

describe('diagrams router', () => {
  describe('GET /api/v1/diagrams', () => {
    it('returns an empty array', async () => {
      const res = await request(app).get('/api/v1/diagrams');
      expect(JSON.parse(res.text)).toEqual({ diagrams: [] });
    });
  });
});
