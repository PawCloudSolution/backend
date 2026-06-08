import { BreedApplication } from '../../../domain/breed/breed-application';
import { IBreedApplicationRepository } from '../../../application/breed/ports/breed-application.repository.interface';
import { AppDataSource } from '../data-source';
import { BreedApplicationEntity } from '../entities/breed-application.entity';

export class TypeOrmBreedApplicationRepository implements IBreedApplicationRepository {
  private applicationRepository = AppDataSource.getRepository(BreedApplicationEntity);

  public async save(application: BreedApplication): Promise<void> {
    const entity = new BreedApplicationEntity();
    entity.id = application.getId();
    entity.names = application.getNames();
    entity.status = application.getStatus();
    entity.requesterId = application.getRequesterId();
    entity.createdAt = application.getCreatedAt();
    await this.applicationRepository.save(entity);
  }

  public async findById(id: string): Promise<BreedApplication | null> {
    const entity = await this.applicationRepository.findOne({ where: { id } });
    if (!entity) return null;
    return BreedApplication.restore({
      id: entity.id,
      names: entity.names,
      status: entity.status,
      requesterId: entity.requesterId,
      createdAt: entity.createdAt,
    });
  }

  public async findPending(): Promise<BreedApplication[]> {
    const entities = await this.applicationRepository.find({ where: { status: 'pending' } });
    return entities.map(entity => BreedApplication.restore({
      id: entity.id,
      names: entity.names,
      status: entity.status,
      requesterId: entity.requesterId,
      createdAt: entity.createdAt,
    }));
  }
}
