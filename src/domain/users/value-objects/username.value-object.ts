export class UsernameValueObject {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(usernameRaw: string): UsernameValueObject {
    if (!usernameRaw) {
      throw new Error("The username field is required");
    }

    const username = usernameRaw.toLowerCase().trim();

    if (username.length < 7) {
      throw new Error("The username field must be at least 7 characters long");
    }

    return new UsernameValueObject(username);
  }

  public toString() {
    return this.value;
  }
}
