export class GetBreedsUseCase {
    constructor(breedRepository) {
        this.breedRepository = breedRepository;
    }
    async execute() {
        return this.breedRepository.findAll();
    }
}
