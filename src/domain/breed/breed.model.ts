import { BreedProps } from './types/BreedProps';
import { v4 as uuid } from 'uuid';

export class BreedModel {
  private readonly id: string;
  private readonly names: { [languageCode: string]: string };
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

    for (const lang in names) {
      const trimmed = names[lang].trim();

      if (trimmed.length < 2) {
        throw new Error(`Name for language "${lang}" must be at least 2 characters long`);
      }

      names[lang] = trimmed;
    }

    return new BreedModel({
      id: uuid(),
      names,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public update(updates: { [languageCode: string]: string }) {
    for (const lang in updates) {
      const trimmed = updates[lang].trim();

      if (trimmed.length < 2) {
        throw new Error(`Name for language "${lang}" must be at least 2 characters long`);
      }

      this.names[lang] = trimmed;
    }

    this.updatedAt = new Date();
  }

  public addLanguage(languageCode: string, value: string) {
    const trimmed = value.trim();

    if (trimmed.length < 2) {
      throw new Error(`Name for language "${languageCode}" must be at least 2 characters long`);
    }

    this.names[languageCode] = trimmed;
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
    return this.names;
  }

  public getName(lang: string) {
    return this.names[lang] ?? this.names['en'];
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getUpdatedAt() {
    return this.updatedAt;
  }
}
