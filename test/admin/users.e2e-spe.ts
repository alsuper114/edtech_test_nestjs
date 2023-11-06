import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';
import request from 'supertest';
import { RoleEnum } from 'src/roles/roles.enum';
import { INestApplication } from '@nestjs/common';
import { setupContinuousIntegrationTest, truncateTables } from 'test/utils/setup-ci-integration';

describe('Users admin (e2e)', () => {
    let app: INestApplication;
    let newUserFirst: any;
    const newUserEmailFirst = `user-first.${Date.now()}@example.com`;
    const newUserPasswordFirst = `secret`;
    const newUserChangedPasswordFirst = `new-secret`;
    const newUserByAdminEmailFirst = `user-created-by-admin.${Date.now()}@example.com`;
    const newUserByAdminPasswordFirst = `secret`;
    let apiToken: any;

    beforeAll(async () => {
        app = await setupContinuousIntegrationTest();
        await request(app.getHttpServer())
            .post('/auth/email/login')
            .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
            .then(({ body }) => {
                apiToken = body.token;
            });

        await request(app.getHttpServer())
            .post('/auth/email/register')
            .send({
                email: newUserEmailFirst,
                password: newUserPasswordFirst,
                firstName: `First${Date.now()}`,
                lastName: 'E2E',
            });

        await request(app.getHttpServer())
            .post('/auth/email/login')
            .send({ email: newUserEmailFirst, password: newUserPasswordFirst })
            .then(({ body }) => {
                newUserFirst = body.user;
            });
    });


    it('Change password for new user: /api/v1/users/:id (PATCH)', async () => {
        return await request(app.getHttpServer())
            .patch(`/users/${newUserFirst.id}`)
            .auth(apiToken, {
                type: 'bearer',
            })
            .send({ password: newUserChangedPasswordFirst })
            .expect(200);
    });

    it('Login via registered user: /api/v1/auth/email/login (POST)', async () => {
        return await request(app.getHttpServer())
            .post('/auth/email/login')
            .send({ email: newUserEmailFirst, password: newUserChangedPasswordFirst })
            .expect(200)
    });

    it('Fail create new user by admin: /api/v1/users (POST)', async () => {
        return await request(app.getHttpServer())
            .post(`/users`)
            .auth(apiToken, {
                type: 'bearer',
            })
            .send({ email: 'fail-data' })
            .expect(400);
    });

    it('Success create new user by admin: /api/v1/users (POST)', async () => {
        return await request(app.getHttpServer())
            .post(`/users`)
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
        return await request(app.getHttpServer())
            .post('/auth/email/login')
            .send({
                email: newUserByAdminEmailFirst,
                password: newUserByAdminPasswordFirst,
            })
            .expect(200)
    });

    it('Get list of users by admin: /api/v1/users (GET)', async () => {
        return await request(app.getHttpServer())
            .get(`/users`)
            .auth(apiToken, {
                type: 'bearer',
            })
            .expect(200)
    });
});