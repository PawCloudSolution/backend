import { describe, it, expect } from 'vitest';
import { SexValueObject } from './sex.value-object';

describe('SexValueObject', () => {
  it('should create a valid male sex value object', () => {
    const sex = SexValueObject.create('male');
    expect(sex.toString()).toBe('male');
  });

  it('should create a valid female sex value object', () => {
    const sex = SexValueObject.create('female');
    expect(sex.toString()).toBe('female');
  });

  it('should throw an error for invalid sex', () => {
    expect(() => SexValueObject.create('other')).toThrow('The dog must be a female or a male');
    expect(() => SexValueObject.create('MALE')).toThrow('The dog must be a female or a male');
  });
});
