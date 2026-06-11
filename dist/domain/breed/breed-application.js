import { BreedNameValueObject } from './value-objects/breed-name.value-object';
import { BreedApplicationStatusValueObject } from './value-objects/breed-application-status.value-object';
import { v4 as uuidv4 } from 'uuid';
export class BreedApplication {
    constructor(props) {
        this.id = props.id;
        this.names = props.names;
        this.status = props.status;
        this.requesterId = props.requesterId;
        this.internationalId = props.internationalId;
        this.createdAt = props.createdAt;
    }
    static create(raw) {
        if (!raw.names.en) {
            throw new Error('English name (names.en) is required for breed application');
        }
        const nameVOs = {};
        for (const lang in raw.names) {
            nameVOs[lang] = BreedNameValueObject.create(raw.names[lang]);
        }
        return new BreedApplication({
            id: uuidv4(),
            names: nameVOs,
            status: BreedApplicationStatusValueObject.create('pending'),
            requesterId: raw.requesterId,
            internationalId: raw.internationalId,
            createdAt: new Date(),
        });
    }
    static restore(raw) {
        const nameVOs = {};
        for (const lang in raw.names) {
            nameVOs[lang] = BreedNameValueObject.create(raw.names[lang]);
        }
        return new BreedApplication({
            id: raw.id,
            names: nameVOs,
            status: BreedApplicationStatusValueObject.create(raw.status),
            requesterId: raw.requesterId,
            internationalId: raw.internationalId,
            createdAt: raw.createdAt,
        });
    }
    approve() {
        if (!this.status.isPending()) {
            throw new Error('Only pending applications can be approved');
        }
        this.status = BreedApplicationStatusValueObject.create('approved');
    }
    reject() {
        if (!this.status.isPending()) {
            throw new Error('Only pending applications can be rejected');
        }
        this.status = BreedApplicationStatusValueObject.create('rejected');
    }
    getId() {
        return this.id;
    }
    getRequesterId() {
        return this.requesterId;
    }
    getInternationalId() {
        return this.internationalId;
    }
    getStatus() {
        return this.status.toString();
    }
    getNames() {
        const rawNames = {};
        for (const lang in this.names) {
            rawNames[lang] = this.names[lang].toString();
        }
        return rawNames;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
