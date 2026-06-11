export class UserIdValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('UserId cannot be empty');
        }
        return new UserIdValueObject(value);
    }
    static generate() {
        return new UserIdValueObject(crypto.randomUUID());
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
