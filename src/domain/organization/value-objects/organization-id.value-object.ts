import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class OrganizationIdValueObject {
  private constructor(private readonly value: string) {}

  public static generate(): OrganizationIdValueObject {
    return new OrganizationIdValueObject(uuidv4());
  }

  public static create(id: string): OrganizationIdValueObject {
    if (!uuidValidate(id)) {
      throw new Error('Invalid Organization ID format');
    }
    return new OrganizationIdValueObject(id);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: OrganizationIdValueObject): boolean {
    return this.value === other.value;
  }
}
