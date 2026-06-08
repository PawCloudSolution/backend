import { BreedNameValueObject } from './value-objects/breed-name.value-object';
import { BreedApplicationStatusValueObject } from './value-objects/breed-application-status.value-object';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export interface BreedApplicationCreationRawData {
  names: { [languageCode: string]: string };
  requesterId: string;
}

export interface BreedApplicationRestoreRawData {
  id: string;
  names: { [languageCode: string]: string };
  status: string;
  requesterId: string;
  createdAt: Date;
}

export class BreedApplication {
  private readonly id: string;
  private readonly names: { [languageCode: string]: BreedNameValueObject };
  private status: BreedApplicationStatusValueObject;
  private readonly requesterId: string;
  private readonly createdAt: Date;

  private constructor(props: {
    id: string;
    names: { [languageCode: string]: BreedNameValueObject };
    status: BreedApplicationStatusValueObject;
    requesterId: string;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.names = props.names;
    this.status = props.status;
    this.requesterId = props.requesterId;
    this.createdAt = props.createdAt;
  }

  public static create(raw: BreedApplicationCreationRawData): BreedApplication {
    if (!raw.names.en) {
      throw new Error('English name (names.en) is required for breed application');
    }

    const nameVOs: { [languageCode: string]: BreedNameValueObject } = {};
    for (const lang in raw.names) {
      nameVOs[lang] = BreedNameValueObject.create(raw.names[lang]);
    }

    return new BreedApplication({
      id: uuidv4(),
      names: nameVOs,
      status: BreedApplicationStatusValueObject.create('pending'),
      requesterId: raw.requesterId,
      createdAt: new Date(),
    });
  }

  public static restore(raw: BreedApplicationRestoreRawData): BreedApplication {
    const nameVOs: { [languageCode: string]: BreedNameValueObject } = {};
    for (const lang in raw.names) {
      nameVOs[lang] = BreedNameValueObject.create(raw.names[lang]);
    }

    return new BreedApplication({
      id: raw.id,
      names: nameVOs,
      status: BreedApplicationStatusValueObject.create(raw.status),
      requesterId: raw.requesterId,
      createdAt: raw.createdAt,
    });
  }

  public approve(): void {
    if (!this.status.isPending()) {
      throw new Error('Only pending applications can be approved');
    }
    this.status = BreedApplicationStatusValueObject.create('approved');
  }

  public reject(): void {
    if (!this.status.isPending()) {
      throw new Error('Only pending applications can be rejected');
    }
    this.status = BreedApplicationStatusValueObject.create('rejected');
  }

  public getId(): string {
    return this.id;
  }

  public getRequesterId(): string {
    return this.requesterId;
  }

  public getStatus(): string {
    return this.status.toString();
  }

  public getNames(): { [lang: string]: string } {
    const rawNames: { [lang: string]: string } = {};
    for (const lang in this.names) {
      rawNames[lang] = this.names[lang].toString();
    }
    return rawNames;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
