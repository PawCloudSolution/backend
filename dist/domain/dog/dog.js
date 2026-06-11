import { SexValueObject } from './value-objects/sex.value-object';
import { DateBirthValueObject } from './value-objects/date-birth.value-object';
import { DogIdValueObject } from './value-objects/dog-id.value-object';
import { UserIdValueObject } from '../user/value-objects/user-id.value-object';
import { OrganizationIdValueObject } from '../organization/value-objects/organization-id.value-object';
export class Dog {
    constructor(props) {
        this.id = props.id;
        this.ownerId = props.ownerId;
        this.breederId = props.breederId;
        this.organizationId = props.organizationId;
        this.name = props.name;
        this.sex = props.sex;
        this.dateBirth = props.dateBirth;
        this.breed = props.breed;
    }
    static create(raw) {
        const props = {
            id: DogIdValueObject.generate(),
            ownerId: UserIdValueObject.create(raw.ownerId),
            breederId: UserIdValueObject.create(raw.breederId),
            organizationId: OrganizationIdValueObject.create(raw.organizationId),
            name: raw.name,
            sex: SexValueObject.create(raw.sex),
            dateBirth: DateBirthValueObject.create(raw.dateBirth),
            breed: raw.breed,
        };
        return new Dog(props);
    }
    static restore(raw) {
        const props = {
            id: DogIdValueObject.create(raw.id),
            ownerId: UserIdValueObject.create(raw.ownerId),
            breederId: UserIdValueObject.create(raw.breederId),
            organizationId: OrganizationIdValueObject.create(raw.organizationId),
            name: raw.name,
            sex: SexValueObject.create(raw.sex),
            dateBirth: DateBirthValueObject.create(raw.dateBirth),
            breed: raw.breed,
        };
        return new Dog(props);
    }
    getId() {
        return this.id.toString();
    }
    getOwnerId() {
        return this.ownerId.toString();
    }
    getBreederId() {
        return this.breederId.toString();
    }
    getOrganizationId() {
        return this.organizationId.toString();
    }
    getName() {
        return this.name;
    }
    getSex() {
        return this.sex.toString();
    }
    getDateBirth() {
        return this.dateBirth.toString();
    }
    getBreed() {
        return this.breed;
    }
}
