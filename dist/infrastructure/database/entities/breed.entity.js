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
let BreedEntity = class BreedEntity {
};
__decorate([
    PrimaryColumn('uuid'),
    __metadata("design:type", String)
], BreedEntity.prototype, "id", void 0);
__decorate([
    Column({ type: 'jsonb' }),
    __metadata("design:type", Object)
], BreedEntity.prototype, "names", void 0);
__decorate([
    Column({ name: 'international_id', type: 'uuid' }),
    __metadata("design:type", String)
], BreedEntity.prototype, "internationalId", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], BreedEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BreedEntity.prototype, "updatedAt", void 0);
BreedEntity = __decorate([
    Entity('breeds')
], BreedEntity);
export { BreedEntity };
