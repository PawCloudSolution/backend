import { describe, it, expect } from 'vitest';
import { Organization } from './organization';

describe('Organization Aggregate', () => {
  it('should create an international organization successfully', () => {
    const intOrg = Organization.create({
      name: 'Global Kennel Union',
      type: 'international',
      countryCode: 'US',
      taxNumber: 'INT-12345678',
      registrationNumber: 'REG-INT-123'
    });

    expect(intOrg.getId()).toBeDefined();
    expect(intOrg.getParentOrganizationId()).toBeNull();
    expect(intOrg.getName()).toBe('Global Kennel Union');
    expect(intOrg.getType()).toBe('international');
  });

  it('should create a headquarter successfully', () => {
    const intOrg = Organization.create({
      name: 'Global Kennel Union',
      type: 'international',
      countryCode: 'US'
    });

    const hq = Organization.create({
      name: 'Ukrainian Kennel Union',
      type: 'headquarter',
      countryCode: 'UA',
      parentOrganizationId: intOrg.getId(),
      taxNumber: '12345678',
      registrationNumber: 'REG-123'
    });

    expect(hq.getId()).toBeDefined();
    expect(hq.getParentOrganizationId()).toBe(intOrg.getId());
    expect(hq.getName()).toBe('Ukrainian Kennel Union');
    expect(hq.getType()).toBe('headquarter');
    expect(hq.getCountry()).toBe('UA');
    expect(hq.getTaxNumber()).toBe('12345678');
    expect(hq.getRegistrationNumber()).toBe('REG-123');
  });

  it('should create a local club linked to a headquarter', () => {
    const intOrg = Organization.create({ name: 'GKU', type: 'international', countryCode: 'US' });
    const hq = Organization.create({
      name: 'UKU',
      type: 'headquarter',
      countryCode: 'UA',
      parentOrganizationId: intOrg.getId()
    });

    const branch = Organization.create({
      name: 'Kyiv Kennel Club',
      type: 'club',
      countryCode: 'UA',
      parentOrganizationId: hq.getId()
    });

    expect(branch.getParentOrganizationId()).toBe(hq.getId());
    expect(branch.getType()).toBe('club');
  });

  it('should throw an error if a branch has no parent', () => {
    expect(() => Organization.create({
      name: 'Kyiv Kennel Club',
      type: 'club',
      countryCode: 'UA'
    })).toThrow('An organization of type club must have a parent organization');
  });

  it('should throw an error if an international org has a parent', () => {
    import('uuid').then(({ v4 }) => {
       const fakeId = v4();
       expect(() => Organization.create({
          name: 'Global Kennel Club',
          type: 'international',
          countryCode: 'UA',
          parentOrganizationId: fakeId
        })).toThrow('An international organization cannot have a parent organization');
    });
  });

  it('should validate organization name length', () => {
    expect(() => Organization.create({
      name: 'AB',
      type: 'international',
      countryCode: 'UA'
    })).toThrow('Organization name must be at least 3 characters long');
  });
});
