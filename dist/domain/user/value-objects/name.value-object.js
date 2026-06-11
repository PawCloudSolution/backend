export class NameValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(raw) {
        if (!raw) {
            throw new Error("Name is required");
        }
        const name = raw.trim();
        if (name.length < 2) {
            throw new Error("Name should be at least 2 characters long");
        }
        const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґŁłŚśŹźŻżĆćĄąĘęÓó\-]+$/;
        if (!nameRegex.test(name)) {
            throw new Error("Name contains invalid characters");
        }
        return new NameValueObject(name);
    }
    toString() {
        return this.value;
    }
}
