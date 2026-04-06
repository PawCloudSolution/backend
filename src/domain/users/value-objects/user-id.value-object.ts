export class UserIdValueObject {
  private constructor(private readonly value: string) {}

  public static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }

    return new UserIdValueObject(value);
  }

  public static generate() {
    return new UserIdValueObject(crypto.randomUUID());
  }

  public toString() {
    return this.value;
  }

  public equals(other: UserIdValueObject) {
    return this.value === other.value;
  }
}