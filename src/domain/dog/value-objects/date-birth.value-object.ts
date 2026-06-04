export class DateBirthValueObject {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/;
    if (!dateRegex.test(raw)) {
      throw new Error('Date must be in dd-mm-yyyy format');
    }
    return new DateBirthValueObject(raw);
  }

  public toString() {
    return this.value;
  }
}
