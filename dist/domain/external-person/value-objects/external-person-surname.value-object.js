export class ExternalPersonSurnameValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(raw) {
        if (!raw) {
            throw new Error('External person surname is required');
        }
        const surname = raw.trim();
        if (surname.length < 2) {
            throw new Error('External person surname must be at least 2 characters long');
        }
        const surnameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґŁłŚśŹźŻżĆćĄąĘęÓó\-]+$/;
        if (!surnameRegex.test(surname)) {
            throw new Error('External person surname contains invalid characters');
        }
        return new ExternalPersonSurnameValueObject(surname);
    }
    toString() {
        return this.value;
    }
}
