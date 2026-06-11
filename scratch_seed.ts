import { AppDataSource } from './src/infrastructure/database/data-source';
import * as bcrypt from 'bcrypt';

async function run() {
  await AppDataSource.initialize();
  await AppDataSource.dropDatabase();
  await AppDataSource.synchronize(true);

  const hashed = await bcrypt.hash('superadminpass', 10);
  await AppDataSource.query(`
    INSERT INTO users (id, name, surname, email, username, role, "countryCode", "hashedPassword", status, "createdAt", "updatedAt")
    VALUES (
      '0acfe545-0000-0000-0000-000000000000',
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
    )
  `, [hashed]);

  console.log('Database synced and superadmin created');
  process.exit(0);
}

run();
