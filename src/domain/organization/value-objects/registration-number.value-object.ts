import { CountryCodeValueObject } from '../../shared/value-objects/country-code.value-object';

export class RegistrationNumberValueObject {
  private constructor(private readonly value: string) {}

  public static create(regNumber: string, country: CountryCodeValueObject): RegistrationNumberValueObject {
    const cleaned = regNumber.replace(/\\s+/g, '').toUpperCase();
    
    if (cleaned.length === 0) {
      throw new Error('Registration number cannot be empty');
    }

    // Future country-specific validation

    return new RegistrationNumberValueObject(cleaned);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: RegistrationNumberValueObject): boolean {
    return this.value === other.value;
  }
}
