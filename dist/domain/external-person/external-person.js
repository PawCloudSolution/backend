import { ExternalPersonNameValueObject } from './value-objects/external-person-name.value-object';
import { ExternalPersonSurnameValueObject } from './value-objects/external-person-surname.value-object';
export class ExternalPerson {
    constructor(props) {
        this.name = props.name;
        this.surname = props.surname;
        this.phoneNumber = props.phoneNumber;
        this.type = props.type;
    }
    static create(raw) {
        const props = {
            name: ExternalPersonNameValueObject.create(raw.name),
            surname: ExternalPersonSurnameValueObject.create(raw.surname),
            phoneNumber: raw.phoneNumber,
            type: raw.type,
        };
        return new ExternalPerson(props);
    }
    getName() {
        return this.name.toString();
    }
    getSurname() {
        return this.surname.toString();
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getType() {
        return this.type;
    }
    updateName(newName) {
        this.name = ExternalPersonNameValueObject.create(newName);
    }
    updateSurname(newSurname) {
        this.surname = ExternalPersonSurnameValueObject.create(newSurname);
    }
    updatePhoneNumber(newPhoneNumber) {
        this.phoneNumber = newPhoneNumber;
    }
    updateType(newType) {
        this.type = newType;
    }
}
