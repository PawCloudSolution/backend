import { OrganizationIdValueObject } from './value-objects/organization-id.value-object';
import { OrganizationNameValueObject } from './value-objects/organization-name.value-object';
import { OrganizationTypeValueObject } from './value-objects/organization-type.value-object';
import { TaxNumberValueObject } from './value-objects/tax-number.value-object';
import { RegistrationNumberValueObject } from './value-objects/registration-number.value-object';
import { CountryCodeValueObject } from '../shared/value-objects/country-code.value-object';
export class Organization {
    constructor(props) {
        this.props = props;
    }
    static create(raw) {
        const country = CountryCodeValueObject.create(raw.countryCode);
        const type = OrganizationTypeValueObject.create(raw.type);
        let parentOrganizationId = null;
        if (raw.parentOrganizationId) {
            if (type.isInternational()) {
                throw new Error('An international organization cannot have a parent organization');
            }
            parentOrganizationId = OrganizationIdValueObject.create(raw.parentOrganizationId);
        }
        else if (!type.isInternational()) {
            throw new Error(`An organization of type ${raw.type} must have a parent organization`);
        }
        const taxNumber = raw.taxNumber ? TaxNumberValueObject.create(raw.taxNumber, country) : null;
        const registrationNumber = raw.registrationNumber ? RegistrationNumberValueObject.create(raw.registrationNumber, country) : null;
        return new Organization({
            id: OrganizationIdValueObject.generate(),
            parentOrganizationId,
            name: OrganizationNameValueObject.create(raw.name),
            type,
            country,
            taxNumber,
            registrationNumber
        });
    }
    static restore(raw) {
        const country = CountryCodeValueObject.create(raw.countryCode);
        const type = OrganizationTypeValueObject.create(raw.type);
        const taxNumber = raw.taxNumber ? TaxNumberValueObject.create(raw.taxNumber, country) : null;
        const registrationNumber = raw.registrationNumber ? RegistrationNumberValueObject.create(raw.registrationNumber, country) : null;
        const parentOrganizationId = raw.parentOrganizationId ? OrganizationIdValueObject.create(raw.parentOrganizationId) : null;
        return new Organization({
            id: OrganizationIdValueObject.create(raw.id),
            parentOrganizationId,
            name: OrganizationNameValueObject.create(raw.name),
            type,
            country,
            taxNumber,
            registrationNumber
        });
    }
    getId() {
        return this.props.id.toString();
    }
    getParentOrganizationId() {
        return this.props.parentOrganizationId ? this.props.parentOrganizationId.toString() : null;
    }
    getName() {
        return this.props.name.toString();
    }
    getType() {
        return this.props.type.toString();
    }
    getCountry() {
        return this.props.country.toString();
    }
    getTaxNumber() {
        return this.props.taxNumber ? this.props.taxNumber.toString() : null;
    }
    getRegistrationNumber() {
        return this.props.registrationNumber ? this.props.registrationNumber.toString() : null;
    }
}
