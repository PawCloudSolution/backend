import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BreedNamesDto {
  @ApiProperty({ example: 'Golden Retriever', description: 'English name (required)', type: String })
  en: string;

  @ApiPropertyOptional({ example: 'Золотистий ретривер', type: String, nullable: true })
  uk?: string;

  [languageCode: string]: string | undefined;
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
