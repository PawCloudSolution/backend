export class SexValueObject {
    constructor(v) {
        this.value = v;
    }
    static create(sex) {
        if (sex !== 'male' && sex !== 'female') {
            throw new Error('The dog must be a female or a male');
        }
        return new SexValueObject(sex);
    }
    toString() {
        return this.value;
    }
}
