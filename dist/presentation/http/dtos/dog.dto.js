var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDogDtoHttp {
}
__decorate([
    ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the user who owns the dog', type: String }),
    __metadata("design:type", String)
], RegisterDogDtoHttp.prototype, "ownerId", void 0);
__decorate([
    ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'ID of the breeder (kennel owner)', type: String }),
    __metadata("design:type", String)
], RegisterDogDtoHttp.prototype, "breederId", void 0);
__decorate([
    ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', description: 'ID of the breed', type: String }),
    __metadata("design:type", String)
], RegisterDogDtoHttp.prototype, "breedId", void 0);
__decorate([
    ApiProperty({ example: 'Buddy', type: String }),
    __metadata("design:type", String)
], RegisterDogDtoHttp.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'male', enum: ['male', 'female'], type: String }),
    __metadata("design:type", String)
], RegisterDogDtoHttp.prototype, "sex", void 0);
__decorate([
    ApiProperty({ example: '15-05-2020', description: 'Date of birth in DD-MM-YYYY format', type: String }),
    __metadata("design:type", String)
], RegisterDogDtoHttp.prototype, "dateBirth", void 0);
