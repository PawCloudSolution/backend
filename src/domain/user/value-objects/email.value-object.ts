export class EmailValueObject {
  private constructor(private readonly value: string) {}

  static create(raw: string): EmailValueObject {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(raw)) {
      throw new Error("Incorrect email format.");
    }

    return new EmailValueObject(raw.toLowerCase());
  }

  toString() {
    return this.value;
  }
}
