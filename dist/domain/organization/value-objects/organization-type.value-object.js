export class OrganizationTypeValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(type) {
        const validTypes = ['international', 'headquarter', 'club', 'kennel', 'training_ground'];
        if (!validTypes.includes(type)) {
            throw new Error(`Invalid organization type: ${type}`);
        }
        return new OrganizationTypeValueObject(type);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isInternational() {
        return this.value === 'international';
    }
    isHeadquarter() {
        return this.value === 'headquarter';
    }
}
