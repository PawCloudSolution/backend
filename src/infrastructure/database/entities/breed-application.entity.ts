import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('breed_applications')
export class BreedApplicationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  names: Record<string, string>;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ name: 'requester_id', type: 'uuid' })
  requesterId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'requester_id' })
  requester: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
