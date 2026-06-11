export class DocumentLinksValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error('At least one document link is required');
        }
        for (const link of value) {
            if (typeof link !== 'string' || link.trim() === '') {
                throw new Error('Invalid document link');
            }
        }
        return new DocumentLinksValueObject([...value]); // shallow copy for immutability
    }
    getLinks() {
        return [...this.value];
    }
}
