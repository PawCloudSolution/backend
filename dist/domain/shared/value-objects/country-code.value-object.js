import { getCountries } from 'libphonenumber-js';
export class CountryCodeValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        const normalized = value.trim().toUpperCase();
        if (!getCountries().includes(normalized)) {
            throw new Error('Invalid country code');
        }
        return new CountryCodeValueObject(normalized);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
