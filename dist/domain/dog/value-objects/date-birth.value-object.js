export class DateBirthValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(raw) {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/;
        if (!dateRegex.test(raw)) {
            throw new Error('Date must be in dd-mm-yyyy format');
        }
        return new DateBirthValueObject(raw);
    }
    toString() {
        return this.value;
    }
}
