export type BreedApplicationStatusEnum = 'pending' | 'approved' | 'rejected';

export class BreedApplicationStatusValueObject {
  private constructor(private readonly value: BreedApplicationStatusEnum) {}

  public static create(status: string): BreedApplicationStatusValueObject {
    const validStatuses: BreedApplicationStatusEnum[] = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status as BreedApplicationStatusEnum)) {
      throw new Error(`Invalid breed application status: ${status}`);
    }
    return new BreedApplicationStatusValueObject(status as BreedApplicationStatusEnum);
  }

  public toString(): BreedApplicationStatusEnum {
    return this.value;
  }

  public equals(other: BreedApplicationStatusValueObject): boolean {
    return this.value === other.value;
  }

  public isPending(): boolean {
    return this.value === 'pending';
  }
}
