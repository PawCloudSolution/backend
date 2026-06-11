var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
let BreedApplicationEntity = class BreedApplicationEntity {
};
__decorate([
    PrimaryColumn('uuid'),
    __metadata("design:type", String)
], BreedApplicationEntity.prototype, "id", void 0);
__decorate([
    Column({ type: 'jsonb' }),
    __metadata("design:type", Object)
], BreedApplicationEntity.prototype, "names", void 0);
__decorate([
    Column({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], BreedApplicationEntity.prototype, "status", void 0);
__decorate([
    Column({ name: 'requester_id', type: 'uuid' }),
    __metadata("design:type", String)
], BreedApplicationEntity.prototype, "requesterId", void 0);
__decorate([
    Column({ name: 'international_id', type: 'uuid' }),
    __metadata("design:type", String)
], BreedApplicationEntity.prototype, "internationalId", void 0);
__decorate([
    ManyToOne(() => UserEntity),
    JoinColumn({ name: 'requester_id' }),
    __metadata("design:type", UserEntity)
], BreedApplicationEntity.prototype, "requester", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], BreedApplicationEntity.prototype, "createdAt", void 0);
BreedApplicationEntity = __decorate([
    Entity('breed_applications')
], BreedApplicationEntity);
export { BreedApplicationEntity };
