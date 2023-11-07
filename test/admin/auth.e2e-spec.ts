import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';

describe('Auth admin (e2e)', () => {
  const app = APP_URL;

  it('Login: /api/v1/auth/email/login (POST)', async () => {
    return await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200);
  });
});
