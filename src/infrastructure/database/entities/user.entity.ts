import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  organizationId: string | null;

  @Column('varchar')
  status: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  role: string;

  @Column('varchar')
  countryCode: string;

  @Column('varchar', { nullable: true })
  phoneNumber: string | null;

  @Column('varchar')
  hashedPassword: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
