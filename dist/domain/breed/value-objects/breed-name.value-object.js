export class BreedNameValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(raw) {
        if (!raw) {
            throw new Error('Breed name is required');
        }
        const name = raw.trim();
        if (name.length < 2) {
            throw new Error('Breed name must be at least 2 characters long');
        }
        return new BreedNameValueObject(name);
    }
    toString() {
        return this.value;
    }
}
