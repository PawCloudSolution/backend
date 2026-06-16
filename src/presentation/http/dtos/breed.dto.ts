import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BreedNamesDto {
  @ApiProperty({ example: 'Golden Retriever', description: 'English name (required)', type: String })
  en: string;

  @ApiPropertyOptional({ example: 'Золотистий ретривер', type: String, nullable: true })
  uk?: string;

  [languageCode: string]: string | undefined;
}

export class AddBreedLanguageDtoHttp {
  @ApiProperty({ example: 'fr', description: 'Language code (e.g. en, uk, fr)', type: String })
  languageCode: string;

  @ApiProperty({ example: 'Berger Allemand', description: 'Name of the breed in the specified language', type: String })
  name: string;
}

export class CreateBreedDtoHttp {
  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' }, example: { en: 'Golden Retriever', ru: 'Золотистый ретривер' } })
  names: { [languageCode: string]: string };
}

export class SubmitBreedApplicationDtoHttp {
  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' }, example: { en: 'Golden Retriever', ru: 'Золотистый ретривер' } })
  names: { [languageCode: string]: string };
}

export class ApproveBreedApplicationDtoHttp {
}
