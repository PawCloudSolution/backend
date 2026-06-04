export class NameValueObject {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string): NameValueObject {
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

  public toString(): string {
    return this.value;
  }
}
