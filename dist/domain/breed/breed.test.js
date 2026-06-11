import { describe, it, expect } from 'vitest';
import { Breed } from './breed';
describe('Breed', () => {
    it('should create a new breed successfully', () => {
        const breed = Breed.create({ en: 'Golden Retriever', uk: 'Золотистий ретривер' }, 'int-123');
        expect(breed.getId()).toBeDefined();
        expect(breed.getName('en')).toBe('Golden Retriever');
        expect(breed.getName('uk')).toBe('Золотистий ретривер');
        expect(breed.getNames()).toEqual({ en: 'Golden Retriever', uk: 'Золотистий ретривер' });
        expect(breed.getInternationalId()).toBe('int-123');
    });
    it('should throw an error if English translation is missing on creation', () => {
        expect(() => Breed.create({ uk: 'Мопс' }, 'int-123')).toThrow('English name (names.en) is required');
    });
    it('should return English translation as a fallback if requested language is missing', () => {
        const breed = Breed.create({ en: 'Pug' }, 'int-123');
        expect(breed.getName('uk')).toBe('Pug');
    });
    it('should add a new language translation', () => {
        const breed = Breed.create({ en: 'Bulldog' }, 'int-123');
        breed.addLanguage('uk', 'Бульдог');
        expect(breed.getName('uk')).toBe('Бульдог');
    });
    it('should update translations successfully', () => {
        const breed = Breed.create({ en: 'Poodle', uk: 'Пудель' }, 'int-123');
        breed.update({ uk: 'Великий пудель' });
        expect(breed.getName('uk')).toBe('Великий пудель');
    });
    it('should remove a language translation successfully', () => {
        const breed = Breed.create({ en: 'Beagle', uk: 'Бігль' }, 'int-123');
        breed.removeLanguage('uk');
        expect(breed.getName('uk')).toBe('Beagle'); // Fallback to en
    });
    it('should throw an error when trying to remove English translation', () => {
        const breed = Breed.create({ en: 'Beagle' }, 'int-123');
        expect(() => breed.removeLanguage('en')).toThrow('English translation cannot be removed');
    });
});
