export class EmailValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(raw) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(raw)) {
            throw new Error("Incorrect email format.");
        }
        return new EmailValueObject(raw.toLowerCase());
    }
    toString() {
        return this.value;
    }
}
