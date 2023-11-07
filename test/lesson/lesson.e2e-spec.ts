import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';
import { setupContinuousIntegrationTest, truncateTables } from 'test/utils/setup-ci-integration';

describe('Lessons (e2e)', () => {
  let app = APP_URL;
  let authToken = "";
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => authToken = body.token);
  })

  it('Create: /api/v1/lessons (POST)', async () => {
    return await request(app)
      .post('/api/v1/lessons')
      .send({ chapter: 1, section: 1, title: "Chapter1-Section-1" })
      .set('Authorization', `bearer ${authToken}`)
      .expect(201);
  });

  it('Get lessons: /api/v1/lessons (GET)', async () => {
    return request(app)
      .get('/api/v1/lessons')
      .send()
      .set('Authorization', `bearer ${authToken}`)
      .expect(200);
  });

  it('Get lesson by id: /api/v1/lessons (GET)', async () => {
    let id = 1;
    await request(app)
      .post('/api/v1/lessons')
      .send({ chapter: 1, section: 1, title: "Chapter1-Section-1" })
      .set('Authorization', `bearer ${authToken}`)
      .then(({body}) => id = body.id);
    return request(app)
      .get(`/api/v1/lessons/${id}`)
      .send()
      .set('Authorization', `bearer ${authToken}`)
      .expect(200);
  });

  it('Update lesson by id: /api/v1/lessons/{id} (PUT)', async () => {
    let id = 1;
    const body = await request(app)
      .post('/api/v1/lessons')
      .send({ chapter: 1, section: 1, title: "Chapter1-Section-1" })
      .set('Authorization', `bearer ${authToken}`)
    id = body["_body"].id;
    return await request(app)
      .put(`/api/v1/lessons/${id}`)
      .send({ title: "test-title", videoLink: "test-videolink" })
      .set('Authorization', `bearer ${authToken}`)
      .expect(200);
  });

  it('Delete lesson by id: /api/v1/lessons/{id} (DELETE)', async () => {
    let id = 1;
    await request(app)
      .post('/api/v1/lessons')
      .send({ chapter: 1, section: 1, title: "Chapter1-Section-1" })
      .set('Authorization', `bearer ${authToken}`)
      .then(({ body }) => id = body.id);
    return await request(app)
      .delete(`/api/v1/lessons/${id}`)
      .send()
      .set('Authorization', `bearer ${authToken}`)
      .expect(200);
  });
});
