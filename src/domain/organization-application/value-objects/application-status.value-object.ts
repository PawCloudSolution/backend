export type ApplicationStatusEnum = 'pending' | 'approved' | 'rejected';

export class ApplicationStatusValueObject {
  private constructor(private readonly value: ApplicationStatusEnum) {}

  public static create(value: string) {
    if (!['pending', 'approved', 'rejected'].includes(value)) {
      throw new Error('Invalid application status');
    }
    return new ApplicationStatusValueObject(value as ApplicationStatusEnum);
  }

  public toString() {
    return this.value;
  }

  public equals(other: ApplicationStatusValueObject) {
    return this.value === other.value;
  }

  public isPending() { return this.value === 'pending'; }
  public isApproved() { return this.value === 'approved'; }
  public isRejected() { return this.value === 'rejected'; }
}
