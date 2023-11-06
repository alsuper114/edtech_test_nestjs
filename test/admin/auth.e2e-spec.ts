import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';
import {
  setupContinuousIntegrationTest,
  truncateTables,
} from '../utils/setup-ci-integration';

describe('Auth admin (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupContinuousIntegrationTest();
  });

  afterAll(async () => {
    await truncateTables();
    await app.close();
  });

  it.only('Login: /api/v1/auth/email/login (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .expect(200);
  });
});
