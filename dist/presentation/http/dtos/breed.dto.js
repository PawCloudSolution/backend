var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class BreedNamesDto {
}
__decorate([
    ApiProperty({ example: 'Golden Retriever', description: 'English name (required)', type: String }),
    __metadata("design:type", String)
], BreedNamesDto.prototype, "en", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Золотистий ретривер', type: String, nullable: true }),
    __metadata("design:type", String)
], BreedNamesDto.prototype, "uk", void 0);
export class CreateBreedDtoHttp {
}
__decorate([
    ApiProperty({ type: 'object', additionalProperties: { type: 'string' }, example: { en: 'Golden Retriever', ru: 'Золотистый ретривер' } }),
    __metadata("design:type", Object)
], CreateBreedDtoHttp.prototype, "names", void 0);
export class SubmitBreedApplicationDtoHttp {
}
__decorate([
    ApiProperty({ type: 'object', additionalProperties: { type: 'string' }, example: { en: 'Golden Retriever', ru: 'Золотистый ретривер' } }),
    __metadata("design:type", Object)
], SubmitBreedApplicationDtoHttp.prototype, "names", void 0);
export class ApproveBreedApplicationDtoHttp {
}
