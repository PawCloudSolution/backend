import { Breed } from '../../../domain/breed/breed';
import { AppDataSource } from '../data-source';
import { BreedEntity } from '../entities/breed.entity';
export class TypeOrmBreedRepository {
    constructor() {
        this.breedRepository = AppDataSource.getRepository(BreedEntity);
    }
    async save(breed) {
        const entity = new BreedEntity();
        entity.id = breed.getId().toString();
        entity.names = breed.getNames();
        entity.internationalId = breed.getInternationalId();
        entity.createdAt = breed.getCreatedAt();
        entity.updatedAt = breed.getUpdatedAt();
        await this.breedRepository.save(entity);
    }
    async findById(id) {
        const entity = await this.breedRepository.findOne({ where: { id } });
        if (!entity)
            return null;
        return Breed.restore({
            id: entity.id,
            names: entity.names,
            internationalId: entity.internationalId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
    async findAll() {
        const entities = await this.breedRepository.find();
        return entities.map(entity => Breed.restore({
            id: entity.id,
            names: entity.names,
            internationalId: entity.internationalId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        }));
    }
}
