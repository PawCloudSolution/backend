import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { AppDataSource } from '../../../infrastructure/database/data-source';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Stage 3 Flow (E2E) - Dogs and Breeds', () => {
  let app: INestApplication;
  let superAdminId: string;
  let clubPresidentId: string;
  let clubOrgId: string;
  let breedId: string;
  let breedApplicationId: string;
  let ownerId: string;
  let breederId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await AppDataSource.initialize();
    await AppDataSource.synchronize(true); // Drop and recreate schema

    // 1. Setup: Create SuperAdmin
    const saRes = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
      organizationId: null,
      name: 'Super',
      surname: 'Admin',
      email: 'sa3@example.com',
      username: 'superadmin3',
      role: 'superAdmin',
      countryCode: 'US',
      phoneNumber: '+12025550123',
      password: 'password123'
    });
    if (saRes.status !== 201) throw new Error('SA register failed: ' + JSON.stringify(saRes.body));
    
    // We have to extract superAdmin ID from DB since register doesn't return it
    const saRow = await AppDataSource.query(`SELECT id FROM users WHERE email = 'sa3@example.com'`);
    superAdminId = saRow[0].id;

    // 2. Setup: Create HQ Application -> Approve it -> Get Club President ID & Org ID
    const hqAppRes = await request(app.getHttpServer()).post('/api/v1/onboarding/hq/submit').send({
      documents: ['http://example.com/doc.pdf'],
      organizationName: 'HQ Org',
      countryCode: 'US',
      taxNumber: '1234',
      registrationNumber: 'REG1234',
      presidentName: 'HQ',
      presidentSurname: 'President',
      presidentEmail: 'hqp3@example.com',
      presidentPhone: '+12025550199',
      presidentPasswordPlain: 'password123'
    });
    if (hqAppRes.status !== 201) throw new Error('HQ submit failed: ' + JSON.stringify(hqAppRes.body));
    const hqAppId = hqAppRes.body.id;

    const hqApproveRes = await request(app.getHttpServer()).post('/api/v1/onboarding/hq/approve').send({
      applicationId: hqAppId,
      approverId: superAdminId
    });
    if (hqApproveRes.status !== 200 && hqApproveRes.status !== 201) throw new Error('HQ approve failed: ' + JSON.stringify(hqApproveRes.body));

    const hqUserRow = await AppDataSource.query(`SELECT id, "organizationId" FROM users WHERE email = 'hqp3@example.com'`);
    const hqPresidentId = hqUserRow[0].id;
    const hqOrgId = hqUserRow[0].organizationId;

    // 3. Setup: Create a Club branch
    const clubRes = await request(app.getHttpServer()).post(`/api/v1/organizations/${hqOrgId}/branches`).send({
      name: 'Local Dog Club',
      countryCode: 'US',
      taxNumber: '9999',
      registrationNumber: 'REG9999',
      requesterId: hqPresidentId
    });
    if (clubRes.status !== 201) throw new Error('Branch failed: ' + JSON.stringify(clubRes.body));
    clubOrgId = clubRes.body.id;

    // 4. Setup: Register Club President (roleManager)
    const clubPresRes = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
      organizationId: clubOrgId,
      name: 'Club',
      surname: 'President',
      email: 'clubp3@example.com',
      username: 'clubpresident',
      role: 'roleManager',
      countryCode: 'US',
      phoneNumber: '+12025550124',
      password: 'password123'
    });
    if (clubPresRes.status !== 201) throw new Error('Club pres reg failed: ' + JSON.stringify(clubPresRes.body));
    const cpRow = await AppDataSource.query(`SELECT id FROM users WHERE email = 'clubp3@example.com'`);
    clubPresidentId = cpRow[0].id;
    // Approve club president by HQ president
    await request(app.getHttpServer()).post(`/api/v1/employees/${clubPresidentId}/approve`).send({ approverId: hqPresidentId });

    // 5. Setup: Register ordinary members (owner and breeder)
    const ownerRes = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
      organizationId: clubOrgId,
      name: 'Owner',
      surname: 'User',
      email: 'owner3@example.com',
      username: 'owneruser',
      role: 'member',
      countryCode: 'US',
      phoneNumber: '+12025550125',
      password: 'password123'
    });
    if (ownerRes.status !== 201) throw new Error('Owner reg failed: ' + JSON.stringify(ownerRes.body));
    const owRow = await AppDataSource.query(`SELECT id FROM users WHERE email = 'owner3@example.com'`);
    ownerId = owRow[0].id;
    await request(app.getHttpServer()).post(`/api/v1/employees/${ownerId}/approve`).send({ approverId: clubPresidentId });

    const breederRes = await request(app.getHttpServer()).post('/api/v1/auth/register').send({
      organizationId: clubOrgId,
      name: 'Breeder',
      surname: 'User',
      email: 'breeder3@example.com',
      username: 'breederuser',
      role: 'member',
      countryCode: 'US',
      phoneNumber: '+12025550126',
      password: 'password123'
    });
    if (breederRes.status !== 201) throw new Error('Breeder reg failed: ' + JSON.stringify(breederRes.body));
    const brRow = await AppDataSource.query(`SELECT id FROM users WHERE email = 'breeder3@example.com'`);
    breederId = brRow[0].id;
    await request(app.getHttpServer()).post(`/api/v1/employees/${breederId}/approve`).send({ approverId: clubPresidentId });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    await app.close();
  });

  it('1. Club President submits a Breed Application', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/breeds/applications')
      .send({
        names: {
          en: 'German Shepherd',
          uk: 'Німецька вівчарка'
        },
        requesterId: clubPresidentId
      });

    if (res.status !== 201) console.log('Test 1 error:', res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    breedApplicationId = res.body.id;
  });

  it('2. SuperAdmin approves the Breed Application', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/breeds/applications/${breedApplicationId}/approve`)
      .send({ approverId: superAdminId });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('breedId');
    breedId = res.body.breedId;
  });

  it('3. Anyone can fetch the list of breeds', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/breeds');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    
    const breed = res.body.find((b: any) => b.id === breedId);
    expect(breed).toBeDefined();
    expect(breed.names.en).toBe('German Shepherd');
  });

  it('4. Club President registers a dog for a member', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/dogs')
      .send({
        ownerId: ownerId,
        breederId: breederId,
        breedId: breedId,
        name: 'Rex',
        sex: 'male',
        dateBirth: '12-05-2022',
        requesterId: clubPresidentId
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('5. Fetch dogs by ownerId', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/dogs?ownerId=${ownerId}`);
      
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Rex');
    expect(res.body[0].ownerId).toBe(ownerId);
    expect(res.body[0].breederId).toBe(breederId);
    expect(res.body[0].organizationId).toBe(clubOrgId);
  });
});
