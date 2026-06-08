import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';

@Entity('dogs')
export class DogEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  sex: string;

  @Column({ name: 'date_birth', type: 'varchar', length: 20 })
  dateBirth: string;

  @Column({ name: 'breed_id', type: 'uuid' })
  breedId: string;

  @ManyToOne(() => BreedEntity)
  @JoinColumn({ name: 'breed_id' })
  breed: BreedEntity;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @Column({ name: 'breeder_id', type: 'uuid' })
  breederId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'breeder_id' })
  breeder: UserEntity;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;
}
