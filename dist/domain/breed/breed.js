import { BreedIdValueObject } from './value-objects/breed-id.value-object';
import { BreedNameValueObject } from './value-objects/breed-name.value-object';
export class Breed {
    constructor(props) {
        this.id = props.id;
        this.names = props.names;
        this.internationalId = props.internationalId;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    static create(names, internationalId) {
        if (!names.en) {
            throw new Error('English name (names.en) is required');
        }
        const nameVOs = {};
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
    static restore(raw) {
        const nameVOs = {};
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
    update(updates) {
        for (const lang in updates) {
            this.names[lang] = BreedNameValueObject.create(updates[lang]);
        }
        this.updatedAt = new Date();
    }
    addLanguage(languageCode, value) {
        this.names[languageCode] = BreedNameValueObject.create(value);
        this.updatedAt = new Date();
    }
    removeLanguage(languageCode) {
        if (languageCode === 'en') {
            throw new Error('English translation cannot be removed');
        }
        delete this.names[languageCode];
        this.updatedAt = new Date();
    }
    getId() {
        return this.id;
    }
    getInternationalId() {
        return this.internationalId;
    }
    getNames() {
        const rawNames = {};
        for (const lang in this.names) {
            rawNames[lang] = this.names[lang].toString();
        }
        return rawNames;
    }
    getName(lang) {
        const nameVO = this.names[lang] ?? this.names['en'];
        return nameVO.toString();
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
}
