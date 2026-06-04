export class SexValueObject {
  private value: 'male' | 'female';

  private constructor(v: 'male' | 'female') {
    this.value = v;
  }

  public static create(sex: string): SexValueObject {
    if (sex !== 'male' && sex !== 'female') {
      throw new Error('The dog must be a female or a male');
    }

    return new SexValueObject(sex);
  }

  public toString() {
    return this.value;
  }
}
