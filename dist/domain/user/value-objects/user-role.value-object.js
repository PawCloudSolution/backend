export class UserRoleValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!['member', 'employee', 'branchPresident', 'nationalPresident', 'internationalPresident', 'superAdmin'].includes(value)) {
            throw new Error('Invalid user role');
        }
        return new UserRoleValueObject(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isMember() {
        return this.value === 'member';
    }
    isEmployee() {
        return this.value === 'employee';
    }
    isBranchPresident() {
        return this.value === 'branchPresident';
    }
    isNationalPresident() {
        return this.value === 'nationalPresident';
    }
    isInternationalPresident() {
        return this.value === 'internationalPresident';
    }
    isAnyPresident() {
        return this.isBranchPresident() || this.isNationalPresident() || this.isInternationalPresident();
    }
    isSuperAdmin() {
        return this.value === 'superAdmin';
    }
}
