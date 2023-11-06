import request from 'supertest';
import { TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';
import { setupContinuousIntegrationTest } from 'test/utils/setup-ci-integration';
import { INestApplication } from '@nestjs/common';

describe('Auth user (e2e)', () => {
  let app: INestApplication;
  const newUserFirstName = `Tester${Date.now()}`;
  const newUserLastName = `E2E`;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;

  beforeEach(async () => {
    app = await setupContinuousIntegrationTest();
  });

  it('Login: /auth/email/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .expect(200);
  });

  it('Do not allow register user with exists email: /auth/email/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/email/register')
      .send({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
        firstName: 'Tester',
        lastName: 'E2E',
      })
      .expect(400);
  });

  it('Register new user: /auth/email/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/email/register')
      .send({
        email: newUserEmail,
        password: newUserPassword,
        firstName: newUserFirstName,
        lastName: newUserLastName,
      })
      .expect(204);
  });

  it('Login unconfirmed user: /auth/email/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(200);
  });

  it('Login confirmed user: /auth/email/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(200);
  });

  it('Confirmed user retrieve profile: /auth/me (GET)', async () => {
    const newUserApiToken = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.token);

    await request(app.getHttpServer())
      .get('/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send()
      .expect(200);
  });

  it('Refresh token: /auth/refresh (GET)', async () => {
    const newUserRefreshToken = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.refreshToken);

    await request(app.getHttpServer())
      .post('/auth/refresh')
      .auth(newUserRefreshToken, {
        type: 'bearer',
      })
      .send()
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        expect(body.tokenExpires).toBeDefined();
      });
  });

  it('New user update profile: /auth/me (PATCH)', async () => {
    const newUserNewName = Date.now();
    const newUserNewPassword = 'new-secret';
    const newUserApiToken = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.token);

    await request(app.getHttpServer())
      .patch('/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({
        firstName: newUserNewName,
        password: newUserNewPassword,
      })
      .expect(422);

    await request(app.getHttpServer())
      .patch('/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({
        firstName: newUserNewName,
        password: newUserNewPassword,
        oldPassword: newUserPassword,
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserNewPassword })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });

    await request(app.getHttpServer())
      .patch('/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      })
      .send({ password: newUserPassword, oldPassword: newUserNewPassword })
      .expect(200);
  });

  it('New user delete profile: /auth/me (DELETE)', async () => {
    const newUserApiToken = await request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .then(({ body }) => body.token);

    await request(app.getHttpServer())
      .delete('/auth/me')
      .auth(newUserApiToken, {
        type: 'bearer',
      });

    return request(app.getHttpServer())
      .post('/auth/email/login')
      .send({ email: newUserEmail, password: newUserPassword })
      .expect(400);
  });
});
