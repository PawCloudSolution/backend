export class DateBirthValueObject {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string) {
    // TODO: create regex to check the date formate dd-mm-yyyy
    return new DateBirthValueObject(raw);
  }
}
