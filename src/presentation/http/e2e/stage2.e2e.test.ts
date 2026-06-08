import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import * as jwt from 'jsonwebtoken';

describe('Stage 2 E2E Flow (Employees and Branches)', () => {
  let app: INestApplication;
  let superAdminId: string;
  let hqId: string;
  let presidentId: string;
  let employeeId: string;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    await AppDataSource.synchronize(true);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it('1. setup: create superadmin and HQ', async () => {
    // 1.1 Register superAdmin
    await request(app.getHttpServer()).post('/api/v1/auth/register').send({
      organizationId: null,
      name: 'Super',
      surname: 'Admin',
      email: 'superadmin2@example.com',
      username: 'superadmin2',
      role: 'superAdmin',
      countryCode: 'US',
      phoneNumber: '+12025550123',
      password: 'superadminpass'
    });

    // 1.2 Login superAdmin
    const resLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'superadmin2@example.com',
      password: 'superadminpass'
    });
    superAdminId = (jwt.decode(resLogin.body.accessToken) as any).userId;

    // 1.3 Submit HQ
    const resSubmit = await request(app.getHttpServer()).post('/api/v1/onboarding/hq/submit').send({
      documents: ['doc.pdf'],
      organizationName: 'Paw Club HQ',
      countryCode: 'US',
      taxNumber: 'TAX001',
      registrationNumber: 'REG001',
      presidentName: 'President',
      presidentSurname: 'One',
      presidentEmail: 'president1@pawclub.com',
      presidentPhone: '+12025550199',
      presidentPasswordPlain: 'prespass'
    });

    // 1.4 Approve HQ
    await request(app.getHttpServer()).post('/api/v1/onboarding/hq/approve').send({
      applicationId: resSubmit.body.id,
      approverId: superAdminId
    });

    // 1.5 Login president to get org ID
    const resPresLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'president1@pawclub.com',
      password: 'prespass'
    });
    const decodedPres = jwt.decode(resPresLogin.body.accessToken) as any;
    presidentId = decodedPres.userId;
    hqId = decodedPres.organizationId;
  });

  it('2. should list organizations and find the HQ', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/organizations');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(hqId);
    expect(res.body[0].type).toBe('headquarter');
  });

  it('3. should register a new employee to the HQ', async () => {
    const res = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
      organizationId: hqId,
      name: 'Emp',
      surname: 'Loyee',
      email: 'employee1@pawclub.com',
      username: 'employee1',
      role: 'employee',
      countryCode: 'US',
      phoneNumber: '+12025550111',
      password: 'emppass'
    });
    if (res.status !== 201) {
      console.log('Register Employee Error:', res.body);
    }
    expect(res.status).toBe(201);

    const resLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'employee1@pawclub.com',
      password: 'emppass'
    });
    employeeId = (jwt.decode(resLogin.body.accessToken) as any).userId;
  });

  it('4. should list pending employees', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/employees/pending?organizationId=${hqId}&requesterId=${presidentId}`);
    
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].id).toBe(employeeId);
  });

  it('5. should approve the pending employee', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/employees/${employeeId}/approve`)
      .send({ approverId: presidentId });

    expect(res.status).toBe(201);

    // Verify list is empty now
    const resPending = await request(app.getHttpServer())
      .get(`/api/v1/employees/pending?organizationId=${hqId}&requesterId=${presidentId}`);
    expect(resPending.body.length).toBe(0);
  });

  it('6. should create a branch under the HQ', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/organizations/${hqId}/branches`)
      .send({
        name: 'Paw Club Branch NY',
        countryCode: 'US',
        requesterId: presidentId
      });

    if (res.status !== 201) {
      console.log('Create Branch Error:', res.body);
    }
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    // Verify orgs list
    const orgs = await request(app.getHttpServer()).get('/api/v1/organizations');
    expect(orgs.body.length).toBe(2);
    const branch = orgs.body.find((o: any) => o.type === 'club');
    expect(branch).toBeDefined();
    expect(branch.parentOrganizationId).toBe(hqId);
  });
});
