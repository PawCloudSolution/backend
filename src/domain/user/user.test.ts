import { describe, it, expect } from 'vitest';
import { User } from './user';
import { UserRoleValueObject } from './value-objects/user-role.value-object';

describe('User Aggregate', () => {
  const validRawData = {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    role: 'member',
    phoneNumber: '+12133734253',
    countryCode: 'US',
    hashedPassword: 'hashed_password_1234567890',
    organizationId: '123e4567-e89b-12d3-a456-426614174000',
  };

  it('should register a new user successfully', () => {
    const user = User.register(validRawData);
    expect(user.getId()).toBeDefined();
    expect(user.getName()).toBe('John');
    expect(user.getSurname()).toBe('Doe');
    expect(user.getEmail()).toBe('john.doe@example.com');
    expect(user.getUsername()).toBe('johndoe');
    expect(user.getPhoneNumber()).toBe('+12133734253');
    expect(user.getRole().toString()).toBe('member');
    expect(user.isMember()).toBe(true);
    expect(user.isRoleManager()).toBe(false);
  });

  it("should allow a manager to change another user's role", () => {
    const manager = User.register({ ...validRawData, role: 'roleManager', username: 'manager1' });
    const user = User.register({ ...validRawData, username: 'user123' });

    user.changeRoleBy(manager, UserRoleValueObject.create('employee'));
    expect(user.isEmployee()).toBe(true);
  });

  it('should not allow a user to change their own role', () => {
    const manager = User.register({ ...validRawData, role: 'roleManager' });
    expect(() => manager.changeRoleBy(manager, UserRoleValueObject.create('employee'))).toThrow('User cannot change own role');
  });

  it('should not allow a non-manager to change roles', () => {
    const member = User.register(validRawData);
    const user = User.register({ ...validRawData, username: 'user123' });
    expect(() => user.changeRoleBy(member, UserRoleValueObject.create('roleManager'))).toThrow('Only a roleManager or superAdmin can change roles');
  });

  it('should throw an error if assigning the same role', () => {
    const manager = User.register({ ...validRawData, role: 'roleManager', username: 'manager1' });
    const user = User.register(validRawData); // is member
    expect(() => user.changeRoleBy(manager, UserRoleValueObject.create('member'))).toThrow('User already has this role');
  });

  it('should update user properties', () => {
    const user = User.register(validRawData);
    user.updateName('Jane');
    user.updateSurname('Smith');
    expect(user.getName()).toBe('Jane');
    expect(user.getSurname()).toBe('Smith');
  });
});
