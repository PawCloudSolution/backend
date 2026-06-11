import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
describe('End-to-End User Flow', () => {
    let app;
    let superAdminId;
    let applicationId;
    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        // Reset database for clean test run
        await AppDataSource.synchronize(true);
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.use(require('cookie-parser')());
        await app.init();
    });
    afterAll(async () => {
        await app.close();
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });
    it('1. should register a super admin user', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/auth/register')
            .send({
            organizationId: null,
            name: 'Super',
            surname: 'Admin',
            email: 'superadmin@example.com',
            username: 'superadmin',
            role: 'superAdmin',
            countryCode: 'US',
            phoneNumber: '+12025550123',
            password: 'superadminpass'
        });
        if (res.status !== 201) {
            console.log('Register Error:', res.body);
        }
        expect(res.status).toBe(201);
    });
    let superAdminCookies;
    it('2. should login as super admin and extract ID', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
            email: 'superadmin@example.com',
            password: 'superadminpass'
        });
        expect(res.status).toBe(201); // NestJS POST default is 201
        expect(res.body.user.id).toBeDefined();
        superAdminId = res.body.user.id;
        superAdminCookies = res.headers['set-cookie'];
    });
    it('3. should submit an application for a new International org', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/internationals/submit')
            .send({
            documents: ['http://example.com/doc1.pdf'],
            organizationName: 'Global Dogs Federation',
            countryCode: 'US',
            taxNumber: '123456789',
            registrationNumber: 'REG123',
            presidentName: 'John',
            presidentSurname: 'Doe',
            presidentEmail: 'john.doe@example.com',
            presidentPhone: '+12025550123',
            presidentPasswordPlain: 'securepassword123'
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        applicationId = res.body.id;
    });
    it('4. should approve the submitted application by the super admin', async () => {
        expect(applicationId).toBeDefined();
        expect(superAdminCookies).toBeDefined();
        const res = await request(app.getHttpServer())
            .post('/api/v1/internationals/approve')
            .set('Cookie', superAdminCookies)
            .send({
            applicationId
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Application approved');
    });
    it('5. should allow the new president to login after approval', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
            email: 'john.doe@example.com',
            password: 'securepassword123'
        });
        expect(res.status).toBe(201);
        expect(res.headers['set-cookie']).toBeDefined();
    });
});
