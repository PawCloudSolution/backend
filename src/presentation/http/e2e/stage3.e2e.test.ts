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

  let superAdminCookies: any;
  let hqPresidentCookies: any;
  let clubPresidentCookies: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(require('cookie-parser')());
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
    
    const saLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'sa3@example.com',
      password: 'password123'
    });
    superAdminId = saLogin.body.user.id;
    superAdminCookies = saLogin.headers['set-cookie'];

    // 2. Setup: Create International Application -> Approve it
    const intAppRes = await request(app.getHttpServer())
      .post('/api/v1/internationals/submit')
      .set('Cookie', superAdminCookies)
      .send({
      documents: ['http://example.com/doc.pdf'],
      organizationName: 'Int Org',
      countryCode: 'US',
      taxNumber: 'INT1234',
      registrationNumber: 'REGINT1234',
      presidentName: 'Int',
      presidentSurname: 'President',
      presidentEmail: 'intp3@example.com',
      presidentPhone: '+12025550188',
      presidentPasswordPlain: 'password123'
    });
    if (intAppRes.status !== 201) throw new Error('Int submit failed: ' + JSON.stringify(intAppRes.body));
    
    await request(app.getHttpServer()).post('/api/v1/internationals/approve')
      .set('Cookie', superAdminCookies)
      .send({
        applicationId: intAppRes.body.id
      });

    const intLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'intp3@example.com',
      password: 'password123'
    });
    const intOrgId = intLogin.body.user.organizationId;

    // 2.5 Setup: Create HQ Application -> Approve it -> Get Club President ID & Org ID
    const intPresidentCookies = intLogin.headers['set-cookie'];
    const hqAppRes = await request(app.getHttpServer())
      .post(`/api/v1/internationals/${intOrgId}/hqs/submit`)
      .set('Cookie', intPresidentCookies)
      .send({
        documents: ['http://example.com/doc.pdf'],
        organizationName: 'Central HQ',
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

    const hqApproveRes = await request(app.getHttpServer())
      .post(`/api/v1/internationals/${intOrgId}/hqs/approve`)
      .set('Cookie', superAdminCookies)
      .send({
        applicationId: hqAppId
      });
    if (hqApproveRes.status !== 200 && hqApproveRes.status !== 201) throw new Error('HQ approve failed: ' + JSON.stringify(hqApproveRes.body));

    const hqLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'hqp3@example.com',
      password: 'password123'
    });
    const hqPresidentId = hqLogin.body.user.id;
    const hqOrgId = hqLogin.body.user.organizationId;
    hqPresidentCookies = hqLogin.headers['set-cookie'];

    // 3. Setup: Create a Club branch
    const clubRes = await request(app.getHttpServer())
      .post(`/api/v1/hqs/${hqOrgId}/clubs`)
      .set('Cookie', hqPresidentCookies)
      .send({
        name: 'New York Club Branch',
        countryCode: 'US',
        taxNumber: 'T999',
        registrationNumber: 'R999',
        presidentName: 'Club',
        presidentSurname: 'President',
        presidentEmail: 'clubp3@example.com',
        presidentPasswordPlain: 'password123'
      });
    if (clubRes.status !== 201) throw new Error('Club create failed: ' + JSON.stringify(clubRes.body));
    clubOrgId = clubRes.body.id;

    // 4. Setup: Login as Club President (created with club)
    const cpLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'clubp3@example.com',
      password: 'password123'
    });
    clubPresidentId = cpLogin.body.user.id;
    clubPresidentCookies = cpLogin.headers['set-cookie'];

    // Approve club president by HQ president
    await request(app.getHttpServer()).post(`/api/v1/employees/${clubPresidentId}/approve`)
      .set('Cookie', hqPresidentCookies)
      .send({});

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
    const owLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'owner3@example.com',
      password: 'password123'
    });
    ownerId = owLogin.body.user.id;
    await request(app.getHttpServer()).post(`/api/v1/employees/${ownerId}/approve`)
      .set('Cookie', clubPresidentCookies)
      .send({});

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
    const brLogin = await request(app.getHttpServer()).post('/api/v1/auth/login').send({
      email: 'breeder3@example.com',
      password: 'password123'
    });
    breederId = brLogin.body.user.id;
    await request(app.getHttpServer()).post(`/api/v1/employees/${breederId}/approve`)
      .set('Cookie', clubPresidentCookies)
      .send({});
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    await app.close();
  });

  it('1. Club President submits a Breed Application', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/breeds/applications')
      .set('Cookie', clubPresidentCookies)
      .send({
        names: {
          en: 'German Shepherd',
          uk: 'Німецька вівчарка'
        }
      });

    if (res.status !== 201) console.log('Test 1 error:', res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    breedApplicationId = res.body.id;
  });

  it('2. SuperAdmin approves the Breed Application', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/breeds/applications/${breedApplicationId}/approve`)
      .set('Cookie', superAdminCookies)
      .send({});

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('breedId');
    breedId = res.body.breedId;
  });

  it('3. Anyone can fetch the list of breeds', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/breeds')
      .set('Cookie', superAdminCookies);
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
      .set('Cookie', clubPresidentCookies)
      .send({
        ownerId: ownerId,
        breederId: breederId,
        breedId: breedId,
        name: 'Rex',
        sex: 'male',
        dateBirth: '12-05-2022'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('5. Fetch dogs by ownerId', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/dogs?ownerId=${ownerId}`)
      .set('Cookie', clubPresidentCookies);
      
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Rex');
    expect(res.body[0].ownerId).toBe(ownerId);
    expect(res.body[0].breederId).toBe(breederId);
    expect(res.body[0].organizationId).toBe(clubOrgId);
  });
});
