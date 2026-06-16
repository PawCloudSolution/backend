import { AppDataSource } from './src/infrastructure/database/data-source';
import * as bcrypt from 'bcrypt';

async function run() {
  await AppDataSource.initialize();
  // await AppDataSource.dropDatabase();
  // await AppDataSource.synchronize(true);

  const hashed = await bcrypt.hash('superadminpass', 10);
  await AppDataSource.query(`
    INSERT INTO users (id, name, surname, email, username, role, "countryCode", "hashedPassword", status, "createdAt", "updatedAt")
    VALUES (
      gen_random_uuid(),
      'Super',
      'Admin',
      'superadmin@example.com',
      'superadmin@example.com',
      'superAdmin',
      'US',
      $1,
      'active',
      NOW(),
      NOW()
    ) ON CONFLICT (email) DO UPDATE SET "hashedPassword" = $1;
  `, [hashed]);

  console.log('Database synced and superadmin created');
  process.exit(0);
}

run();
