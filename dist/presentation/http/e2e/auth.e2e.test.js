import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import cookieParser from 'cookie-parser';
describe('Auth Flow (E2E) - Refresh Tokens', () => {
    let app;
    let userCookies;
    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
        await AppDataSource.initialize();
        await AppDataSource.synchronize(true); // Drop and recreate schema
    });
    afterAll(async () => {
        await AppDataSource.destroy();
        await app.close();
    });
    it('1. should register a new user', async () => {
        const res = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
            organizationId: null,
            name: 'Auth',
            surname: 'Tester',
            email: 'auth_tester@example.com',
            username: 'authtester',
            role: 'superAdmin',
            countryCode: 'US',
            phoneNumber: '+12025550999',
            password: 'password123'
        });
        expect(res.status).toBe(201);
    });
    it('2. should login and return cookies (accessToken and refreshToken)', async () => {
        const res = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
            email: 'auth_tester@example.com',
            password: 'password123'
        });
        expect(res.status).toBe(201);
        expect(res.body.user).toBeDefined();
        // Check if cookies are set
        const cookies = res.headers['set-cookie'];
        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThanOrEqual(2);
        const hasAccessToken = cookies.some((c) => c.includes('accessToken='));
        const hasRefreshToken = cookies.some((c) => c.includes('refreshToken='));
        expect(hasAccessToken).toBeTruthy();
        expect(hasRefreshToken).toBeTruthy();
        userCookies = cookies;
    });
    it('3. should successfully refresh the token using refreshToken cookie', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/auth/refresh')
            .set('Cookie', userCookies)
            .send({});
        expect(res.status).toBe(201);
        expect(res.body.user).toBeDefined();
        const newCookies = res.headers['set-cookie'];
        expect(newCookies).toBeDefined();
        const hasNewAccessToken = newCookies.some((c) => c.includes('accessToken='));
        expect(hasNewAccessToken).toBeTruthy();
    });
    it('4. should fail to refresh if no cookies are provided', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/auth/refresh')
            .send({});
        expect(res.status).toBe(401); // Because refresh token is missing
    });
    it('5. should fail to access protected route without accessToken', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/breeds') // Protected route
            .send({});
        expect(res.status).toBe(401);
    });
});
