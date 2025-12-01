export class ExternalPersonNameValueObject {
  private constructor(private readonly value: string) {}

  public static create(raw: string): ExternalPersonNameValueObject {
    if (!raw) {
      throw new Error('External person name is required');
    }

    const name = raw.trim();

    if (name.length < 2) {
      throw new Error('External person name must be at least 2 characters long');
    }

    const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґŁłŚśŹźŻżĆćĄąĘęÓó\-]+$/;

    if (!nameRegex.test(name)) {
      throw new Error('External person name contains invalid characters');
    }

    return new ExternalPersonNameValueObject(name);
  }

  public toString() {
    return this.value;
  }
}
