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
export class SubmitInternationalApplicationDto {
}
__decorate([
    ApiProperty({ type: [String], description: 'List of document URLs or identifiers' }),
    __metadata("design:type", Array)
], SubmitInternationalApplicationDto.prototype, "documents", void 0);
__decorate([
    ApiProperty({ example: 'Paw Club International', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "organizationName", void 0);
__decorate([
    ApiProperty({ example: 'US', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "countryCode", void 0);
__decorate([
    ApiProperty({ example: '123456789', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "taxNumber", void 0);
__decorate([
    ApiProperty({ example: 'REG987654321', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "registrationNumber", void 0);
__decorate([
    ApiProperty({ example: 'Jane', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "presidentName", void 0);
__decorate([
    ApiProperty({ example: 'Smith', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "presidentSurname", void 0);
__decorate([
    ApiProperty({ example: 'jane.smith@pawclub.com', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "presidentEmail", void 0);
__decorate([
    ApiPropertyOptional({ example: '+12025550123', type: String, nullable: true }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "presidentPhone", void 0);
__decorate([
    ApiProperty({ example: 'securepresidentpass123', type: String }),
    __metadata("design:type", String)
], SubmitInternationalApplicationDto.prototype, "presidentPasswordPlain", void 0);
export class SubmitHqApplicationDto {
}
__decorate([
    ApiProperty({ type: [String], description: 'List of document URLs or identifiers' }),
    __metadata("design:type", Array)
], SubmitHqApplicationDto.prototype, "documents", void 0);
__decorate([
    ApiProperty({ example: 'Ukrainian Kennel Union', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "organizationName", void 0);
__decorate([
    ApiProperty({ example: 'UA', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "countryCode", void 0);
__decorate([
    ApiProperty({ example: '123456789', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "taxNumber", void 0);
__decorate([
    ApiProperty({ example: 'REG987654321', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "registrationNumber", void 0);
__decorate([
    ApiProperty({ example: 'John', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "presidentName", void 0);
__decorate([
    ApiProperty({ example: 'Doe', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "presidentSurname", void 0);
__decorate([
    ApiProperty({ example: 'john.doe@pawclub.com', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "presidentEmail", void 0);
__decorate([
    ApiPropertyOptional({ example: '+380501234567', type: String, nullable: true }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "presidentPhone", void 0);
__decorate([
    ApiProperty({ example: 'securepresidentpass123', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "presidentPasswordPlain", void 0);
__decorate([
    ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the parent International organization', type: String }),
    __metadata("design:type", String)
], SubmitHqApplicationDto.prototype, "internationalId", void 0);
export class ApproveInternationalApplicationDto {
}
__decorate([
    ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The ID of the application to approve', type: String }),
    __metadata("design:type", String)
], ApproveInternationalApplicationDto.prototype, "applicationId", void 0);
export class ApproveHqApplicationDto {
}
__decorate([
    ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The ID of the application to approve', type: String }),
    __metadata("design:type", String)
], ApproveHqApplicationDto.prototype, "applicationId", void 0);
