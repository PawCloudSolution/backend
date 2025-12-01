export class SurnameValueObject {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string): SurnameValueObject {
    if (!raw) {
      throw new Error("Name is required");
    }

    const name = raw.trim();

    if (name.length < 2) {
      throw new Error("Name should be at least 2 characters long");
    }

    const surnameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґŁłŚśŹźŻżĆćĄąĘęÓó\-]+$/;

    if (!surnameRegex.test(name)) {
      throw new Error("Name contains invalid characters");
    }

    return new SurnameValueObject(name);
  }

  public toString(): string {
    return this.value;
  }
}
