import request from 'supertest';
import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';

describe('Lessons (e2e)', () => {
  const app = APP_URL;
  let authToken = '';
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => (authToken = body.token));
  });

  it('Create: /api/v1/quizes (POST)', async () => {
    let lessonId = 1;
    await request(app)
      .post('/api/v1/lessons')
      .send({ chapter: 1, section: 1, title: 'Chapter1-Section-1' })
      .set('Authorization', `bearer ${authToken}`)
      .then(({ body }) => (lessonId = body.id));
    return await request(app)
      .post('/api/v1/quizes')
      .send({
        question: 'QUESTION',
        subQuestion:
          '["1. SubQuestion1", "2. SubQuestion2", "3. SubQuestion3"]',
        answer: '1,3',
        score: 2,
        lessonId: lessonId,
      })
      .set('Authorization', `bearer ${authToken}`)
      .expect(200);
  });

  it('Get quize by quize ID: /api/v1/quizes/{quizeId} (GET)', async () => {
    let lessonId = 1;
    await request(app)
      .post('/api/v1/lessons')
      .send({ chapter: 1, section: 1, title: 'Chapter1-Section-1' })
      .set('Authorization', `bearer ${authToken}`)
      .then(({ body }) => (lessonId = body.id));

    let quizId = 1;
    await request(app)
      .post('/api/v1/quizes')
      .send({
        question: 'QUESTION',
        subQuestion:
          '["1. SubQuestion1", "2. SubQuestion2", "3. SubQuestion3"]',
        answer: '1,3',
        score: 2,
        lessonId: lessonId,
      })
      .set('Authorization', `bearer ${authToken}`)
      .then(({ body }) => (quizId = body.id));

    return await request(app)
      .get(`/api/v1/quizes/${quizId}`)
      .send()
      .set('Authorization', `bearer ${authToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.question).toBe('QUESTION');
        expect(body.subQuesions).toBe(
          '["1. SubQuestion1", "2. SubQuestion2", "3. SubQuestion3"]',
        );
        expect(body.answer).toBe('1,3');
        expect(body.score).toBe(2);
      });
  });
});
