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
        expect(user.isAnyPresident()).toBe(false);
    });
    it('should allow changing role if actor is manager', () => {
        const manager = User.register({ ...validRawData, role: 'branchPresident', username: 'manager_xyz' });
        const user = User.register({ ...validRawData, username: 'user_two_xyz' });
        user.changeRoleBy(manager, UserRoleValueObject.create('employee'));
        expect(user.getRole().toString()).toBe('employee');
    });
    it('should not allow a user to change their own role', () => {
        const manager = User.register({ ...validRawData, role: 'branchPresident', username: 'manager_xyz' });
        expect(() => manager.changeRoleBy(manager, UserRoleValueObject.create('employee'))).toThrow('User cannot change own role');
    });
    it('should prevent non-managers from changing roles', () => {
        const member = User.register(validRawData);
        const user = User.register({ ...validRawData, username: 'user_two_xyz' });
        expect(() => user.changeRoleBy(member, UserRoleValueObject.create('branchPresident'))).toThrow('Only a roleManager or superAdmin can change roles');
    });
    it('should approve a user successfully if actor is manager', () => {
        const manager = User.register({ ...validRawData, role: 'branchPresident', username: 'manager_xyz' });
        const user = User.register({ ...validRawData, username: 'user_two_xyz' });
        user.approve(manager);
        expect(user.getStatus()).toBe('active');
    });
    it('should throw an error if assigning the same role', () => {
        const manager = User.register({ ...validRawData, role: 'branchPresident', username: 'manager_xyz' });
        const user = User.register(validRawData); // is member
        expect(() => user.changeRoleBy(manager, UserRoleValueObject.create('member'))).toThrow('User already has this role');
    });
    it('should restore a user correctly', () => {
        const user = User.restore({
            id: '550e8400-e29b-41d4-a716-446655440000',
            ...validRawData,
            role: 'branchPresident',
            username: 'manager_xyz',
            status: 'active'
        });
        expect(user.getId()).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(user.isAnyPresident()).toBe(true);
    });
});
