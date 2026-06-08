import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class OrganizationApplicationIdValueObject {
  private constructor(private readonly value: string) {}

  public static generate() {
    return new OrganizationApplicationIdValueObject(uuidv4());
  }

  public static create(value: string) {
    if (!uuidValidate(value)) {
      throw new Error('Invalid organization application id');
    }
    return new OrganizationApplicationIdValueObject(value);
  }

  public toString() {
    return this.value;
  }

  public equals(other: OrganizationApplicationIdValueObject) {
    return this.value === other.value;
  }
}
