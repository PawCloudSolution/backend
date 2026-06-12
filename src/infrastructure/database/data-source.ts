import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { OrganizationApplicationEntity } from './entities/organization-application.entity';
import { BreedEntity } from './entities/breed.entity';
import { BreedApplicationEntity } from './entities/breed-application.entity';
import { DogEntity } from './entities/dog.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5439/paw_cloud',
  synchronize: true, // Auto create tables based on entities for development
  logging: false,
  entities: [
    UserEntity, 
    OrganizationEntity, 
    OrganizationApplicationEntity,
    BreedEntity,
    BreedApplicationEntity,
    DogEntity
  ],
  migrations: [],
  subscribers: [],
});
