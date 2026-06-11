export class TaxNumberValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(taxNumber, country) {
        const cleaned = taxNumber.replace(/\\s+/g, '').toUpperCase();
        if (cleaned.length === 0) {
            throw new Error('Tax number cannot be empty');
        }
        // In the future, we can add country-specific regex validation here
        return new TaxNumberValueObject(cleaned);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
