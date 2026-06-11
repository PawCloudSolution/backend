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
let OrganizationEntity = class OrganizationEntity {
};
__decorate([
    PrimaryColumn('uuid'),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "name", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "type", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "countryCode", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationEntity.prototype, "taxNumber", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationEntity.prototype, "registrationNumber", void 0);
__decorate([
    Column({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], OrganizationEntity.prototype, "parentOrganizationId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], OrganizationEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], OrganizationEntity.prototype, "updatedAt", void 0);
OrganizationEntity = __decorate([
    Entity('organizations')
], OrganizationEntity);
export { OrganizationEntity };
