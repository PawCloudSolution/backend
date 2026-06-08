import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('organization_applications')
export class OrganizationApplicationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  status: string;

  @Column('text', { array: true })
  documents: string[];

  @Column('varchar')
  organizationName: string;

  @Column('varchar')
  countryCode: string;

  @Column('varchar')
  taxNumber: string;

  @Column('varchar')
  registrationNumber: string;

  @Column('varchar')
  presidentName: string;

  @Column('varchar')
  presidentSurname: string;

  @Column('varchar')
  presidentEmail: string;

  @Column('varchar', { nullable: true })
  presidentPhone: string | null;

  @Column('varchar')
  presidentPasswordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
