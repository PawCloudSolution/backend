import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('breeds')
export class BreedEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  names: Record<string, string>;

  @Column({ name: 'international_id', type: 'uuid' })
  internationalId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
