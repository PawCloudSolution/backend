import { Dog } from '../../../domain/dog/dog';
import { IDogRepository } from '../../../application/dog/ports/dog.repository.interface';
import { AppDataSource } from '../data-source';
import { DogEntity } from '../entities/dog.entity';
import { Breed } from '../../../domain/breed/breed';

export class TypeOrmDogRepository implements IDogRepository {
  private dogRepository = AppDataSource.getRepository(DogEntity);

  public async save(dog: Dog): Promise<void> {
    const entity = new DogEntity();
    entity.id = dog.getId();
    entity.ownerId = dog.getOwnerId();
    entity.breederId = dog.getBreederId();
    entity.organizationId = dog.getOrganizationId();
    entity.name = dog.getName();
    entity.sex = dog.getSex();
    entity.dateBirth = dog.getDateBirth();
    entity.breedId = dog.getBreed().getId().toString();
    await this.dogRepository.save(entity);
  }

  public async findById(id: string): Promise<Dog | null> {
    const entity = await this.dogRepository.findOne({
      where: { id },
      relations: ['breed']
    });
    if (!entity) return null;
    return this.mapToDomain(entity);
  }

  public async findByOwnerId(ownerId: string): Promise<Dog[]> {
    const entities = await this.dogRepository.find({
      where: { ownerId },
      relations: ['breed']
    });
    return entities.map(e => this.mapToDomain(e));
  }

  public async findByOrganizationId(organizationId: string): Promise<Dog[]> {
    const entities = await this.dogRepository.find({
      where: { organizationId },
      relations: ['breed']
    });
    return entities.map(e => this.mapToDomain(e));
  }

  private mapToDomain(entity: DogEntity): Dog {
    const breed = Breed.restore({
      id: entity.breed.id,
      names: entity.breed.names,
      internationalId: entity.breed.internationalId,
      createdAt: entity.breed.createdAt,
      updatedAt: entity.breed.updatedAt,
    });

    return Dog.restore({
      id: entity.id,
      ownerId: entity.ownerId,
      breederId: entity.breederId,
      organizationId: entity.organizationId,
      name: entity.name,
      sex: entity.sex,
      dateBirth: entity.dateBirth,
      breed: breed
    });
  }
}

