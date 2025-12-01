export class Sex {
    private value: 'male' | 'female';

    private constructor(v: 'male' | 'female') {
        this.value = v;
    }

    static create(sex: string): "male" | "female" {
        if (sex !== 'male' && sex !== 'female') {
            throw new Error('The dog must be a female or a male');
        }

        return new Sex(sex).value;
    }
}
