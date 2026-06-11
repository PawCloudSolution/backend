export class BreedApplicationStatusValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(status) {
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid breed application status: ${status}`);
        }
        return new BreedApplicationStatusValueObject(status);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isPending() {
        return this.value === 'pending';
    }
}
