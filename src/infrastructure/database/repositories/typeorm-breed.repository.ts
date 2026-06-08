import { Breed } from '../../../domain/breed/breed';
import { IBreedRepository } from '../../../application/breed/ports/breed.repository.interface';
import { AppDataSource } from '../data-source';
import { BreedEntity } from '../entities/breed.entity';

export class TypeOrmBreedRepository implements IBreedRepository {
  private breedRepository = AppDataSource.getRepository(BreedEntity);

  public async save(breed: Breed): Promise<void> {
    const entity = new BreedEntity();
    entity.id = breed.getId().toString();
    entity.names = breed.getNames();
    entity.createdAt = breed.getCreatedAt();
    entity.updatedAt = breed.getUpdatedAt();
    await this.breedRepository.save(entity);
  }

  public async findById(id: string): Promise<Breed | null> {
    const entity = await this.breedRepository.findOne({ where: { id } });
    if (!entity) return null;
    return Breed.restore({
      id: entity.id,
      names: entity.names,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  public async findAll(): Promise<Breed[]> {
    const entities = await this.breedRepository.find();
    return entities.map(entity => Breed.restore({
      id: entity.id,
      names: entity.names,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }
}
