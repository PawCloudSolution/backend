export class BreedIdValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('BreedId cannot be empty');
        }
        return new BreedIdValueObject(value);
    }
    static generate() {
        return new BreedIdValueObject(crypto.randomUUID());
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
