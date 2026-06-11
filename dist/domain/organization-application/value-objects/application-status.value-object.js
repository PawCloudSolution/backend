export class ApplicationStatusValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!['pending', 'approved', 'rejected'].includes(value)) {
            throw new Error('Invalid application status');
        }
        return new ApplicationStatusValueObject(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isPending() { return this.value === 'pending'; }
    isApproved() { return this.value === 'approved'; }
    isRejected() { return this.value === 'rejected'; }
}
