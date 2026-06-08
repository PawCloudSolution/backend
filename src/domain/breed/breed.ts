import { BreedProps } from './types/BreedProps';
import { BreedIdValueObject } from './value-objects/breed-id.value-object';
import { BreedNameValueObject } from './value-objects/breed-name.value-object';

export class Breed {
  private readonly id: BreedIdValueObject;
  private readonly names: { [languageCode: string]: BreedNameValueObject };
  private readonly internationalId: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: BreedProps) {
    this.id = props.id;
    this.names = props.names;
    this.internationalId = props.internationalId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public static create(names: { [languageCode: string]: string }, internationalId: string) {
    if (!names.en) {
      throw new Error('English name (names.en) is required');
    }

    const nameVOs: { [languageCode: string]: BreedNameValueObject } = {};
    for (const lang in names) {
      nameVOs[lang] = BreedNameValueObject.create(names[lang]);
    }

    return new Breed({
      id: BreedIdValueObject.generate(),
      names: nameVOs,
      internationalId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static restore(raw: import('./types/breed-restore-raw-data.type').BreedRestoreRawData): Breed {
    const nameVOs: { [languageCode: string]: BreedNameValueObject } = {};
    for (const lang in raw.names) {
      nameVOs[lang] = BreedNameValueObject.create(raw.names[lang]);
    }

    return new Breed({
      id: BreedIdValueObject.create(raw.id),
      names: nameVOs,
      internationalId: raw.internationalId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  public update(updates: { [languageCode: string]: string }) {
    for (const lang in updates) {
      this.names[lang] = BreedNameValueObject.create(updates[lang]);
    }

    this.updatedAt = new Date();
  }

  public addLanguage(languageCode: string, value: string) {
    this.names[languageCode] = BreedNameValueObject.create(value);
    this.updatedAt = new Date();
  }

  public removeLanguage(languageCode: string) {
    if (languageCode === 'en') {
      throw new Error('English translation cannot be removed');
    }

    delete this.names[languageCode];
    this.updatedAt = new Date();
  }

  public getId() {
    return this.id;
  }

  public getInternationalId() {
    return this.internationalId;
  }

  public getNames() {
    const rawNames: { [lang: string]: string } = {};
    for (const lang in this.names) {
      rawNames[lang] = this.names[lang].toString();
    }
    return rawNames;
  }

  public getName(lang: string) {
    const nameVO = this.names[lang] ?? this.names['en'];
    return nameVO.toString();
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getUpdatedAt() {
    return this.updatedAt;
  }
}
