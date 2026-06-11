export class PasswordHashValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Password hash cannot be empty');
        }
        // TODO: figure out how to check that the string is a hash
        if (value.length < 20) {
            throw new Error('Invalid password hash');
        }
        return new PasswordHashValueObject(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
