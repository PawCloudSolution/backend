export class UserStatusValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!['pending_approval', 'active', 'suspended'].includes(value)) {
            throw new Error('Invalid user status');
        }
        return new UserStatusValueObject(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isPending() { return this.value === 'pending_approval'; }
    isActive() { return this.value === 'active'; }
    isSuspended() { return this.value === 'suspended'; }
}
