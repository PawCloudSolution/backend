import { User } from '../../../domain/user/user';
import { AppDataSource } from '../data-source';
import { UserEntity } from '../entities/user.entity';
export class TypeOrmUserRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(UserEntity);
    }
    async save(user) {
        const entity = this.repository.create({
            id: user.getId(),
            organizationId: user.getOrganizationId(),
            status: user.getStatus(),
            name: user.getName(),
            surname: user.getSurname(),
            email: user.getEmail(),
            username: user.getUsername(),
            role: user.getRole().toString(),
            countryCode: user.getCountryCode(),
            phoneNumber: user.getPhoneNumber(),
            hashedPassword: user.getHashedPassword(),
        });
        await this.repository.save(entity);
    }
    async findByEmail(email) {
        const raw = await this.repository.findOneBy({ email });
        if (!raw)
            return null;
        return User.restore(raw);
    }
    async findByUsername(username) {
        const raw = await this.repository.findOneBy({ username });
        if (!raw)
            return null;
        return User.restore(raw);
    }
    async findById(id) {
        const raw = await this.repository.findOneBy({ id });
        if (!raw)
            return null;
        return User.restore(raw);
    }
    async findByOrganizationIdAndStatus(organizationId, status) {
        const rawList = await this.repository.findBy({ organizationId, status });
        return rawList.map(raw => User.restore(raw));
    }
}
