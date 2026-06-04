import parsePhoneNumberFromString from "libphonenumber-js";
import { CountryCodeValueObject } from "../../shared/value-objects/country-code.value-object";

export class PhoneNumberValueObject {
  private constructor(private readonly value: string | null) {}

  public static create(
    raw: string | null,
    country: CountryCodeValueObject,
  ): PhoneNumberValueObject {
    if (raw === null) {
      return new PhoneNumberValueObject(null);
    }

    const parsed = parsePhoneNumberFromString(
      raw,
      country.toString() as any,
    );

    if (!parsed || !parsed.isValid()) {
      throw new Error('Invalid phone number');
    }

    return new PhoneNumberValueObject(parsed.number);
  }

  public toString(): string | null {
    return this.value;
  }

  public equals(other: PhoneNumberValueObject): boolean {
    return this.value === other.value;
  }

  public isEmpty(): boolean {
    return this.value === null;
  }
}