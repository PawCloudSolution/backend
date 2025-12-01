export class ExternalPersonSurnameValueObject {
  private constructor(private readonly value: string) {}

  public static create(raw: string): ExternalPersonSurnameValueObject {
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

  public toString() {
    return this.value;
  }
}
