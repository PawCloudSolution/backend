import { describe, it, expect } from 'vitest';
import { DateBirthValueObject } from './date-birth.value-object';

describe('DateBirthValueObject', () => {
  it('should create a valid date birth value object', () => {
    const validDate = '15-08-2023';
    const dateBirth = DateBirthValueObject.create(validDate);
    expect(dateBirth.toString()).toBe(validDate);
  });

  it('should throw an error for invalid date formats', () => {
    const invalidDates = [
      '2023-08-15', // Wrong format
      '15/08/2023', // Wrong separator
      '32-01-2023', // Invalid day
      '15-13-2023', // Invalid month
      '15-08-23',   // Short year
      'not-a-date'
    ];

    invalidDates.forEach(date => {
      expect(() => DateBirthValueObject.create(date)).toThrow('Date must be in dd-mm-yyyy format');
    });
  });
});
