import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';

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
    const saRes = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
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
    if (saRes.status !== 201) throw new Error('SA Register failed: ' + JSON.stringify(saRes.body));

    const resLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'superadmin2@example.com',
      password: 'superadminpass'
    });
    if (resLogin.status !== 201) throw new Error('SA Login failed: ' + JSON.stringify(resLogin.body));
    superAdminId = (jwt.decode(resLogin.body.tokens.accessToken) as any).userId;

    // 1.25 Submit and Approve International
    const resIntSubmit = await request(app.getHttpServer()).post('/api/v1/internationals/submit').send({
      documents: ['http://example.com/doc1.pdf'],
      organizationName: 'Int Org',
      countryCode: 'US',
      taxNumber: '12345',
      registrationNumber: 'REG123',
      presidentName: 'Int',
      presidentSurname: 'President',
      presidentEmail: 'int@example.com',
      presidentPhone: '+12025550123',
      presidentPasswordPlain: 'intpass'
    });
    if (resIntSubmit.status !== 201) throw new Error('Int submit failed: ' + JSON.stringify(resIntSubmit.body));
    const intId = resIntSubmit.body.id;

    const resIntApprove = await request(app.getHttpServer()).post('/api/v1/internationals/approve').send({
      applicationId: intId,
      approverId: superAdminId
    });

    const resIntLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'int@example.com',
      password: 'intpass'
    });
    const intOrgId = resIntLogin.body.user.organizationId;

    // 1.3 Submit application for HQ
    const resApp = await request(app.getHttpServer()).post(`/api/v1/internationals/${intOrgId}/hqs/submit`).send({
      documents: ['http://example.com/doc.pdf'],
      organizationName: 'UKU',
      countryCode: 'UA',
      taxNumber: '12345678',
      registrationNumber: 'REG123',
      presidentName: 'John',
      presidentSurname: 'Doe',
      presidentEmail: 'president1@pawclub.com',
      presidentPhone: '+380501234567',
      presidentPasswordPlain: 'prespass'
    });
    if (resApp.status !== 201) throw new Error('HQ submit failed: ' + JSON.stringify(resApp.body));
    const hqAppId = resApp.body.id;

    // 1.4 Approve HQ
    const resApprove = await request(app.getHttpServer()).post(`/api/v1/internationals/${intOrgId}/hqs/approve`).send({
      applicationId: hqAppId,
      approverId: superAdminId
    });

    // 1.5 Login president to get org ID
    const resPresLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'president1@pawclub.com',
      password: 'prespass'
    });
    if (resPresLogin.status !== 201) throw new Error('Pres Login failed: ' + JSON.stringify(resPresLogin.body));
    const decodedPres = jwt.decode(resPresLogin.body.tokens.accessToken) as any;
    presidentId = decodedPres.userId;
    hqId = resPresLogin.body.user.organizationId;
  });

  it('2. should list organizations and find the HQ', async () => {
    // getIntOrgId
    const intOrgUserRow = await AppDataSource.query(`SELECT "organizationId" FROM users WHERE email = 'int@example.com'`);
    const intOrgId = intOrgUserRow[0].organizationId;
    const res = await request(app.getHttpServer()).get(`/api/v1/internationals/${intOrgId}/hqs`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    const hqOrg = res.body[0];
    expect(hqOrg.id).toBe(hqId);
    expect(hqOrg.type).toBe('headquarter');
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
    employeeId = (jwt.decode(resLogin.body.tokens.accessToken) as any).userId;
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
      .post(`/api/v1/hqs/${hqId}/clubs`)
      .send({
        name: 'Kyiv Dogs Club',
        countryCode: 'UA',
        taxNumber: '987654321',
        registrationNumber: 'REG987',
        requesterId: presidentId
      });

    if (res.status !== 201) {
      console.log('Create Branch Error:', res.body);
    }
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    // Verify orgs list
    const clubs = await request(app.getHttpServer()).get(`/api/v1/hqs/${hqId}/clubs`);
    expect(clubs.body.length).toBe(1);
    const branch = clubs.body[0];
    expect(branch).toBeDefined();
    expect(branch.hqId).toBe(hqId);
  });
});
