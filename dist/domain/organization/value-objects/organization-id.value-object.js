import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
export class OrganizationIdValueObject {
    constructor(value) {
        this.value = value;
    }
    static generate() {
        return new OrganizationIdValueObject(uuidv4());
    }
    static create(id) {
        if (!uuidValidate(id)) {
            throw new Error('Invalid Organization ID format');
        }
        return new OrganizationIdValueObject(id);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
