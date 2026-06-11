import parsePhoneNumberFromString from "libphonenumber-js";
export class PhoneNumberValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(raw, country) {
        if (raw === null) {
            return new PhoneNumberValueObject(null);
        }
        const parsed = parsePhoneNumberFromString(raw, country.toString());
        if (!parsed || !parsed.isValid()) {
            throw new Error('Invalid phone number');
        }
        return new PhoneNumberValueObject(parsed.number);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    isEmpty() {
        return this.value === null;
    }
}
