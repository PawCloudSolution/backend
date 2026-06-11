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
let OrganizationApplicationEntity = class OrganizationApplicationEntity {
};
__decorate([
    PrimaryColumn('uuid'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "status", void 0);
__decorate([
    Column({ name: 'application_type', type: 'varchar' }),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "applicationType", void 0);
__decorate([
    Column({ name: 'international_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], OrganizationApplicationEntity.prototype, "internationalId", void 0);
__decorate([
    Column('text', { array: true }),
    __metadata("design:type", Array)
], OrganizationApplicationEntity.prototype, "documents", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "organizationName", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "countryCode", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "taxNumber", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "registrationNumber", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "presidentName", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "presidentSurname", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "presidentEmail", void 0);
__decorate([
    Column('varchar', { nullable: true }),
    __metadata("design:type", Object)
], OrganizationApplicationEntity.prototype, "presidentPhone", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], OrganizationApplicationEntity.prototype, "presidentPasswordHash", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], OrganizationApplicationEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], OrganizationApplicationEntity.prototype, "updatedAt", void 0);
OrganizationApplicationEntity = __decorate([
    Entity('organization_applications')
], OrganizationApplicationEntity);
export { OrganizationApplicationEntity };
