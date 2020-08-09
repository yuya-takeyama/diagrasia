import request from 'supertest';
import { app } from './app';

describe('app', () => {
  describe('GET /', () => {
    it('returns Hello, World!', async () => {
      const res = await request(app).get('/');
      expect(res.text).toEqual('Hello World!');
    });
  });

  describe('GET /api/v1', () => {
    it('returns Hello, World!', async () => {
      const res = await request(app).get('/api/v1');
      expect(JSON.parse(res.text)).toEqual({ message: 'Hello, World!' });
    });
  });
});
