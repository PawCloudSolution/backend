import * as bcrypt from 'bcrypt';
export class BcryptPasswordHasher {
    constructor() {
        this.saltRounds = 10;
    }
    async hash(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    async compare(password, hashed) {
        return bcrypt.compare(password, hashed);
    }
}
