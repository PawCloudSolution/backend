var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';
let DogEntity = class DogEntity {
};
__decorate([
    PrimaryColumn('uuid'),
    __metadata("design:type", String)
], DogEntity.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], DogEntity.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DogEntity.prototype, "sex", void 0);
__decorate([
    Column({ name: 'date_birth', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DogEntity.prototype, "dateBirth", void 0);
__decorate([
    Column({ name: 'breed_id', type: 'uuid' }),
    __metadata("design:type", String)
], DogEntity.prototype, "breedId", void 0);
__decorate([
    ManyToOne(() => BreedEntity),
    JoinColumn({ name: 'breed_id' }),
    __metadata("design:type", BreedEntity)
], DogEntity.prototype, "breed", void 0);
__decorate([
    Column({ name: 'owner_id', type: 'uuid' }),
    __metadata("design:type", String)
], DogEntity.prototype, "ownerId", void 0);
__decorate([
    ManyToOne(() => UserEntity),
    JoinColumn({ name: 'owner_id' }),
    __metadata("design:type", UserEntity)
], DogEntity.prototype, "owner", void 0);
__decorate([
    Column({ name: 'breeder_id', type: 'uuid' }),
    __metadata("design:type", String)
], DogEntity.prototype, "breederId", void 0);
__decorate([
    ManyToOne(() => UserEntity),
    JoinColumn({ name: 'breeder_id' }),
    __metadata("design:type", UserEntity)
], DogEntity.prototype, "breeder", void 0);
__decorate([
    Column({ name: 'organization_id', type: 'uuid' }),
    __metadata("design:type", String)
], DogEntity.prototype, "organizationId", void 0);
__decorate([
    ManyToOne(() => OrganizationEntity),
    JoinColumn({ name: 'organization_id' }),
    __metadata("design:type", OrganizationEntity)
], DogEntity.prototype, "organization", void 0);
DogEntity = __decorate([
    Entity('dogs')
], DogEntity);
export { DogEntity };
