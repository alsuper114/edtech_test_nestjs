import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';
import request from 'supertest';
import { RoleEnum } from 'src/roles/roles.enum';

describe('Users admin (e2e)', () => {
  let app;
  let newUserFirst: any;
  const newUserEmailFirst = `user-first.${Date.now()}@example.com`;
  const newUserPasswordFirst = `secret`;
  const newUserChangedPasswordFirst = `new-secret`;
  const newUserByAdminEmailFirst = `user-created-by-admin.${Date.now()}@example.com`;
  const newUserByAdminPasswordFirst = `secret`;
  let apiToken: any;

  beforeAll(async () => {
    app = APP_URL;
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });

    await request(app)
      .post('/api/v1/auth/email/register')
      .send({
        email: newUserEmailFirst,
        password: newUserPasswordFirst,
        firstName: `First${Date.now()}`,
        lastName: 'E2E',
      });

    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmailFirst, password: newUserPasswordFirst })
      .then(({ body }) => {
        newUserFirst = body.user;
      });
  });

  it('Change password for new user: /api/v1/users/:id (PATCH)', async () => {
    return await request(app)
      .patch(`/api/v1/users/${newUserFirst.id}`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ password: newUserChangedPasswordFirst })
      .expect(200);
  });

  it('Login via registered user: /api/v1/auth/email/login (POST)', async () => {
    return await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: newUserEmailFirst, password: newUserChangedPasswordFirst })
      .expect(422);
  });

  it('Fail create new user by admin: /api/v1/users (POST)', async () => {
    return await request(app)
      .post(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({ email: 'fail-data' })
      .expect(422);
  });

  it('Success create new user by admin: /api/v1/users (POST)', async () => {
    return await request(app)
      .post(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
        firstName: `UserByAdmin${Date.now()}`,
        lastName: 'E2E',
        role: {
          id: RoleEnum.user,
        },
      })
      .expect(201);
  });

  it('Login via created by admin user: /api/v1/auth/email/login (GET)', async () => {
    return await request(app)
      .post('/api/v1/auth/email/login')
      .send({
        email: newUserByAdminEmailFirst,
        password: newUserByAdminPasswordFirst,
      })
      .expect(200);
  });

  it('Get list of users by admin: /api/v1/users (GET)', async () => {
    return await request(app)
      .get(`/api/v1/users`)
      .auth(apiToken, {
        type: 'bearer',
      })
      .expect(200);
  });
});
