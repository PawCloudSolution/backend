export class RegistrationNumberValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(regNumber, country) {
        const cleaned = regNumber.replace(/\\s+/g, '').toUpperCase();
        if (cleaned.length === 0) {
            throw new Error('Registration number cannot be empty');
        }
        // Future country-specific validation
        return new RegistrationNumberValueObject(cleaned);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
