export class PhoneNumberValueObject {
  private constructor(private readonly value: string | null) {}

  public static create(value: string | null): PhoneNumberValueObject {
    if (value === null) {
      return new PhoneNumberValueObject(null);
    }

    const normalized = value.trim();

    if (normalized.length === 0) {
      throw new Error('Phone number cannot be empty string');
    }

    // TODO: add the lib to validate
    
    // const phoneRegex = /^\+?[0-9]{7,15}$/;

    // if (!phoneRegex.test(normalized)) {
    //   throw new Error('Invalid phone number format');
    // }

    return new PhoneNumberValueObject(normalized);
  }

  public toString(): string | null {
    return this.value;
  }

  public equals(other: PhoneNumberValueObject): boolean {
    return this.value === other.value;
  }

  public isEmpty(): boolean {
    return this.value === null;
  }
}