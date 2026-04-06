export class PasswordHashValueObject {
  private constructor(private readonly value: string) {}

  public static create(value: string): PasswordHashValueObject {
    if (!value || value.trim().length === 0) {
      throw new Error('Password hash cannot be empty');
    }

    // TODO: figure out how to check that the string is a hash
    if (value.length < 20) {
      throw new Error('Invalid password hash');
    }

    return new PasswordHashValueObject(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: PasswordHashValueObject): boolean {
    return this.value === other.value;
  }
}