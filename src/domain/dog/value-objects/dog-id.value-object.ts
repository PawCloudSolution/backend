import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class DogIdValueObject {
  private constructor(private readonly value: string) {}

  public static generate(): DogIdValueObject {
    return new DogIdValueObject(uuidv4());
  }

  public static create(value: string): DogIdValueObject {
    if (!uuidValidate(value)) {
      throw new Error(`Invalid Dog ID format: ${value}`);
    }
    return new DogIdValueObject(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: DogIdValueObject): boolean {
    return this.value === other.value;
  }
}
