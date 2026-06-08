import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  countryCode: string;

  @Column('varchar', { nullable: true })
  taxNumber: string | null;

  @Column('varchar', { nullable: true })
  registrationNumber: string | null;

  @Column({ type: 'uuid', nullable: true })
  parentOrganizationId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
