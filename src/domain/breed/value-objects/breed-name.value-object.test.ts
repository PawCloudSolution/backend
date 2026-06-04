import { describe, it, expect } from 'vitest';
import { BreedNameValueObject } from './breed-name.value-object';

describe('BreedNameValueObject', () => {
  it('should create a valid breed name', () => {
    const name = BreedNameValueObject.create('Golden Retriever');
    expect(name.toString()).toBe('Golden Retriever');
  });

  it('should trim the breed name and create successfully if long enough', () => {
    const name = BreedNameValueObject.create('  Pug  ');
    expect(name.toString()).toBe('Pug');
  });

  it('should throw an error if the name is too short', () => {
    expect(() => BreedNameValueObject.create('A')).toThrow('Breed name must be at least 2 characters long');
    expect(() => BreedNameValueObject.create('  A  ')).toThrow('Breed name must be at least 2 characters long');
  });

  it('should throw an error if the name is empty', () => {
    expect(() => BreedNameValueObject.create('')).toThrow('Breed name is required');
  });
});
