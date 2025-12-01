import { ExternalPersonRawData } from './types/external-person-raw-data.type';
import { ExternalPersonProps } from './types/external-person-props.type';
import { ExternalPersonNameValueObject } from './value-objects/external-person-name.value-object';
import { ExternalPersonSurnameValueObject } from './value-objects/external-person-surname.value-object';

export class ExternalPersonModel {
  private name: ExternalPersonNameValueObject;
  private surname: ExternalPersonSurnameValueObject;
  private phoneNumber: string | null;
  private type: 'breeder' | 'previousOwner' | 'seller';

  private constructor(props: ExternalPersonProps) {
    this.name = props.name;
    this.surname = props.surname;
    this.phoneNumber = props.phoneNumber;
    this.type = props.type;
  }

  public static create(raw: ExternalPersonRawData) {
    const props: ExternalPersonProps = {
      name: ExternalPersonNameValueObject.create(raw.name),
      surname: ExternalPersonSurnameValueObject.create(raw.surname),
      phoneNumber: raw.phoneNumber,
      type: raw.type,
    };

    return new ExternalPersonModel(props);
  }

  public getName() {
    return this.name.toString();
  }

  public getSurname() {
    return this.surname.toString();
  }

  public getPhoneNumber() {
    return this.phoneNumber;
  }

  public getType() {
    return this.type;
  }

  public updateName(newName: string) {
    this.name = ExternalPersonNameValueObject.create(newName);
  }

  public updateSurname(newSurname: string) {
    this.surname = ExternalPersonSurnameValueObject.create(newSurname);
  }

  public updatePhoneNumber(newPhoneNumber: string | null) {
    this.phoneNumber = newPhoneNumber;
  }

  public updateType(newType: 'breeder' | 'previousOwner' | 'seller') {
    this.type = newType;
  }
}
