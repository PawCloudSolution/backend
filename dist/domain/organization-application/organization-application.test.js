import { describe, it, expect } from 'vitest';
import { OrganizationApplication } from './organization-application';
describe('OrganizationApplication Aggregate', () => {
    const validRawData = {
        documents: ['https://s3.aws.com/doc1.pdf'],
        organizationName: 'Super Dogs Club',
        countryCode: 'US',
        taxNumber: '123456789',
        registrationNumber: 'REG-123',
        presidentName: 'John',
        presidentSurname: 'Doe',
        presidentEmail: 'john.doe@example.com',
        presidentPhone: '+12133734253',
        presidentPasswordHash: 'hashed_password_string',
        applicationType: 'headquarter',
        internationalId: 'int-123'
    };
    it('should submit a new application successfully', () => {
        const app = OrganizationApplication.submit(validRawData);
        expect(app.isPending()).toBe(true);
        expect(app.getOrganizationName()).toBe('Super Dogs Club');
        expect(app.getApplicationType()).toBe('headquarter');
        expect(app.getInternationalId()).toBe('int-123');
    });
    it('should be able to approve a pending application', () => {
        const app = OrganizationApplication.submit(validRawData);
        app.approve();
        expect(app.isPending()).toBe(false);
    });
    it('should throw if trying to approve an already approved application', () => {
        const app = OrganizationApplication.submit(validRawData);
        app.approve();
        expect(() => app.approve()).toThrow('Can only approve pending applications');
    });
    it('should be able to reject a pending application', () => {
        const app = OrganizationApplication.submit(validRawData);
        app.reject();
        expect(app.isPending()).toBe(false);
    });
});
