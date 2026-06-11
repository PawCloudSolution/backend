import { BreedApplication } from '../../../domain/breed/breed-application';
import { AppDataSource } from '../data-source';
import { BreedApplicationEntity } from '../entities/breed-application.entity';
export class TypeOrmBreedApplicationRepository {
    constructor() {
        this.applicationRepository = AppDataSource.getRepository(BreedApplicationEntity);
    }
    async save(application) {
        const entity = new BreedApplicationEntity();
        entity.id = application.getId();
        entity.names = application.getNames();
        entity.status = application.getStatus();
        entity.requesterId = application.getRequesterId();
        entity.internationalId = application.getInternationalId();
        entity.createdAt = application.getCreatedAt();
        await this.applicationRepository.save(entity);
    }
    async findById(id) {
        const entity = await this.applicationRepository.findOne({ where: { id } });
        if (!entity)
            return null;
        return BreedApplication.restore({
            id: entity.id,
            names: entity.names,
            status: entity.status,
            requesterId: entity.requesterId,
            internationalId: entity.internationalId,
            createdAt: entity.createdAt,
        });
    }
    async findPending() {
        const entities = await this.applicationRepository.find({ where: { status: 'pending' } });
        return entities.map(entity => BreedApplication.restore({
            id: entity.id,
            names: entity.names,
            status: entity.status,
            requesterId: entity.requesterId,
            internationalId: entity.internationalId,
            createdAt: entity.createdAt,
        }));
    }
}
