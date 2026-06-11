import jwt from 'jsonwebtoken';
export class JwtTokenService {
    constructor() {
        this.accessSecret = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret';
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';
        this.accessExpiresIn = '10m';
        this.refreshExpiresIn = '7d';
    }
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn });
        const refreshToken = jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn });
        return { accessToken, refreshToken };
    }
    verifyAccessToken(token) {
        try {
            const decoded = jwt.verify(token, this.accessSecret);
            return {
                userId: decoded.userId,
                role: decoded.role,
                organizationId: decoded.organizationId
            };
        }
        catch (error) {
            throw new Error('Invalid or expired access token');
        }
    }
    verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.refreshSecret);
            return {
                userId: decoded.userId,
                role: decoded.role,
                organizationId: decoded.organizationId
            };
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }
}
