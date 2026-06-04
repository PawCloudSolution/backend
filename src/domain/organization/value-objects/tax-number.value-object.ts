import { CountryCodeValueObject } from '../../shared/value-objects/country-code.value-object';

export class TaxNumberValueObject {
  private constructor(private readonly value: string) {}

  public static create(taxNumber: string, country: CountryCodeValueObject): TaxNumberValueObject {
    const cleaned = taxNumber.replace(/\\s+/g, '').toUpperCase();
    
    if (cleaned.length === 0) {
      throw new Error('Tax number cannot be empty');
    }

    // In the future, we can add country-specific regex validation here

    return new TaxNumberValueObject(cleaned);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: TaxNumberValueObject): boolean {
    return this.value === other.value;
  }
}
