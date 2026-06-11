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
export class CreateClubDtoHttp {
}
__decorate([
    ApiProperty({ example: 'Paw Club Branch NY', type: String }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'US', type: String }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "countryCode", void 0);
__decorate([
    ApiPropertyOptional({ example: 'TAX123456', type: String, nullable: true }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "taxNumber", void 0);
__decorate([
    ApiPropertyOptional({ example: 'REG123456', type: String, nullable: true }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "registrationNumber", void 0);
__decorate([
    ApiProperty({ example: 'John', type: String }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "presidentName", void 0);
__decorate([
    ApiProperty({ example: 'Doe', type: String }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "presidentSurname", void 0);
__decorate([
    ApiProperty({ example: 'club.president@example.com', type: String }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "presidentEmail", void 0);
__decorate([
    ApiPropertyOptional({ example: '+12025550123', type: String, nullable: true }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "presidentPhone", void 0);
__decorate([
    ApiProperty({ example: 'securepassword123', type: String }),
    __metadata("design:type", String)
], CreateClubDtoHttp.prototype, "presidentPasswordPlain", void 0);
