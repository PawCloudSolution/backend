export class BreedIdValueObject {
  private constructor(private readonly value: string) {}

  public static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('BreedId cannot be empty');
    }

    return new BreedIdValueObject(value);
  }

  public static generate() {
    return new BreedIdValueObject(crypto.randomUUID());
  }

  public toString() {
    return this.value;
  }

  public equals(other: BreedIdValueObject) {
    return this.value === other.value;
  }
}
