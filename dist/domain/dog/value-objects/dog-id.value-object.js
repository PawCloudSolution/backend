import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
export class DogIdValueObject {
    constructor(value) {
        this.value = value;
    }
    static generate() {
        return new DogIdValueObject(uuidv4());
    }
    static create(value) {
        if (!uuidValidate(value)) {
            throw new Error(`Invalid Dog ID format: ${value}`);
        }
        return new DogIdValueObject(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
