export class UsernameValueObject {
    constructor(value) {
        this.value = value;
    }
    static create(usernameRaw) {
        if (!usernameRaw) {
            throw new Error("The username field is required");
        }
        const username = usernameRaw.toLowerCase().trim();
        if (username.length < 7) {
            throw new Error("The username field must be at least 7 characters long");
        }
        return new UsernameValueObject(username);
    }
    toString() {
        return this.value;
    }
}
