var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
let JwtAuthGuard = class JwtAuthGuard {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['accessToken'];
        if (!token) {
            throw new UnauthorizedException('Access token is missing in cookies');
        }
        try {
            const payload = this.tokenService.verifyAccessToken(token);
            // We attach the payload to the request. It contains userId, role, and organizationId.
            request.user = {
                id: payload.userId,
                role: payload.role,
                organizationId: payload.organizationId
            };
            return true;
        }
        catch (e) {
            throw new UnauthorizedException('Invalid or expired access token');
        }
    }
};
JwtAuthGuard = __decorate([
    Injectable(),
    __param(0, Inject('TOKEN_SERVICE')),
    __metadata("design:paramtypes", [Object])
], JwtAuthGuard);
export { JwtAuthGuard };
