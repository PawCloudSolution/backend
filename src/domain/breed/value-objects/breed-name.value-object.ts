export class BreedNameValueObject {
  private constructor(private readonly value: string) {}

  public static create(raw: string): BreedNameValueObject {
    if (!raw) {
      throw new Error('Breed name is required');
    }

    const name = raw.trim();

    if (name.length < 2) {
      throw new Error('Breed name must be at least 2 characters long');
    }

    return new BreedNameValueObject(name);
  }

  public toString() {
    return this.value;
  }
}
