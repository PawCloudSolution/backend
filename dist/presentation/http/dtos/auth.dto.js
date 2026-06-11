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
export class RegisterUserDto {
}
__decorate([
    ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Organization ID if the user is joining an existing organization', type: String, nullable: true }),
    __metadata("design:type", Object)
], RegisterUserDto.prototype, "organizationId", void 0);
__decorate([
    ApiProperty({ example: 'John', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'Doe', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "surname", void 0);
__decorate([
    ApiProperty({ example: 'john.doe@example.com', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'johndoe', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ example: 'employee', description: 'User role, e.g., superAdmin, roleManager, employee, member', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
__decorate([
    ApiProperty({ example: 'US', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "countryCode", void 0);
__decorate([
    ApiPropertyOptional({ example: '+12025550123', type: String, nullable: true }),
    __metadata("design:type", Object)
], RegisterUserDto.prototype, "phoneNumber", void 0);
__decorate([
    ApiProperty({ example: 'strongpassword123', description: 'Plain password', type: String }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
export class LoginUserDto {
}
__decorate([
    ApiProperty({ example: 'john.doe@example.com', type: String }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'strongpassword123', type: String }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
export class TokenPairDto {
}
__decorate([
    ApiProperty({ type: String }),
    __metadata("design:type", String)
], TokenPairDto.prototype, "accessToken", void 0);
__decorate([
    ApiProperty({ type: String }),
    __metadata("design:type", String)
], TokenPairDto.prototype, "refreshToken", void 0);
export class UserPayloadDto {
}
__decorate([
    ApiProperty({ type: String }),
    __metadata("design:type", String)
], UserPayloadDto.prototype, "id", void 0);
__decorate([
    ApiProperty({ type: String }),
    __metadata("design:type", String)
], UserPayloadDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ type: String }),
    __metadata("design:type", String)
], UserPayloadDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional({ nullable: true, type: String }),
    __metadata("design:type", Object)
], UserPayloadDto.prototype, "organizationId", void 0);
export class LoginResponseDto {
}
__decorate([
    ApiProperty({ type: () => UserPayloadDto }),
    __metadata("design:type", UserPayloadDto)
], LoginResponseDto.prototype, "user", void 0);
