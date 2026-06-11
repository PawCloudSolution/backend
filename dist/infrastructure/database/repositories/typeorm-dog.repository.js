import { Dog } from '../../../domain/dog/dog';
import { AppDataSource } from '../data-source';
import { DogEntity } from '../entities/dog.entity';
import { Breed } from '../../../domain/breed/breed';
export class TypeOrmDogRepository {
    constructor() {
        this.dogRepository = AppDataSource.getRepository(DogEntity);
    }
    async save(dog) {
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
    async findById(id) {
        const entity = await this.dogRepository.findOne({
            where: { id },
            relations: ['breed']
        });
        if (!entity)
            return null;
        return this.mapToDomain(entity);
    }
    async findByOwnerId(ownerId) {
        const entities = await this.dogRepository.find({
            where: { ownerId },
            relations: ['breed']
        });
        return entities.map(e => this.mapToDomain(e));
    }
    async findByOrganizationId(organizationId) {
        const entities = await this.dogRepository.find({
            where: { organizationId },
            relations: ['breed']
        });
        return entities.map(e => this.mapToDomain(e));
    }
    mapToDomain(entity) {
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
