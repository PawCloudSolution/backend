import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
export class OrganizationApplicationIdValueObject {
    constructor(value) {
        this.value = value;
    }
    static generate() {
        return new OrganizationApplicationIdValueObject(uuidv4());
    }
    static create(value) {
        if (!uuidValidate(value)) {
            throw new Error('Invalid organization application id');
        }
        return new OrganizationApplicationIdValueObject(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
