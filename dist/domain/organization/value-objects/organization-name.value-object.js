export class OrganizationNameValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(name) {
        const trimmed = name.trim();
        if (trimmed.length < 3) {
            throw new Error('Organization name must be at least 3 characters long');
        }
        if (trimmed.length > 100) {
            throw new Error('Organization name cannot exceed 100 characters');
        }
        return new OrganizationNameValueObject(trimmed);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
