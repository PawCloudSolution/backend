import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BreedNamesDto {
  @ApiProperty({ example: 'Golden Retriever', description: 'English name (required)', type: String })
  en: string;

  @ApiPropertyOptional({ example: 'Золотистий ретривер', type: String, nullable: true })
  uk?: string;

  [languageCode: string]: string | undefined;
}

export class CreateBreedDtoHttp {
  @ApiProperty({ type: BreedNamesDto })
  names: { [languageCode: string]: string };

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the superAdmin or International president', type: String })
  requesterId: string;
}

export class SubmitBreedApplicationDtoHttp {
  @ApiProperty({ type: BreedNamesDto })
  names: { [languageCode: string]: string };

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'ID of the club employee or HQ president', type: String })
  requesterId: string;
}

export class ApproveBreedApplicationDtoHttp {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', description: 'ID of the superAdmin or International president', type: String })
  approverId: string;
}
