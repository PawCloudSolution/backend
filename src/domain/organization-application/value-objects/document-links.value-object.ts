export class DocumentLinksValueObject {
  private constructor(private readonly value: string[]) {}

  public static create(value: string[]) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new Error('At least one document link is required');
    }
    for (const link of value) {
      if (typeof link !== 'string' || link.trim() === '') {
        throw new Error('Invalid document link');
      }
    }
    return new DocumentLinksValueObject([...value]); // shallow copy for immutability
  }

  public getLinks(): string[] {
    return [...this.value];
  }
}
