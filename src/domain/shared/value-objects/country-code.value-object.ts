import { CountryCode, getCountries } from 'libphonenumber-js';

export class CountryCodeValueObject {
  private constructor(private readonly value: CountryCode) {}

  public static create(value: string): CountryCodeValueObject {
    const normalized = value.trim().toUpperCase();

    if (!getCountries().includes(normalized as CountryCode)) {
      throw new Error('Invalid country code');
    }

    return new CountryCodeValueObject(normalized as CountryCode);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: CountryCodeValueObject): boolean {
    return this.value === other.value;
  }
}