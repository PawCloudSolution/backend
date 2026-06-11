var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
let UserEntity = class UserEntity {
};
__decorate([
    PrimaryColumn('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "organizationId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], UserEntity.prototype, "status", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], UserEntity.prototype, "surname", void 0);
__decorate([
    Column('varchar', { unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    Column('varchar', { unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], UserEntity.prototype, "countryCode", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], UserEntity.prototype, "hashedPassword", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
UserEntity = __decorate([
    Entity('users')
], UserEntity);
export { UserEntity };
