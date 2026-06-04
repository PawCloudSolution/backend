import { BreedProps } from './types/BreedProps';
import { BreedIdValueObject } from './value-objects/breed-id.value-object';
import { BreedNameValueObject } from './value-objects/breed-name.value-object';

export class Breed {
  private readonly id: BreedIdValueObject;
  private readonly names: { [languageCode: string]: BreedNameValueObject };
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: BreedProps) {
    this.id = props.id;
    this.names = props.names;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public static create(names: { [languageCode: string]: string }) {
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
      createdAt: new Date(),
      updatedAt: new Date(),
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
