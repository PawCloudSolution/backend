import { ApiProperty } from '@nestjs/swagger';

export class BreedNamesDto {
  @ApiProperty({ example: 'Golden Retriever', description: 'English name (required)' })
  en: string;

  @ApiProperty({ example: 'Золотистий ретривер', required: false })
  uk?: string;

  [key: string]: string | undefined;
}

export class CreateBreedDtoHttp {
  @ApiProperty({ type: BreedNamesDto })
  names: Record<string, string>;

  @ApiProperty({ example: 'uuid', description: 'ID of the superAdmin or HQ president' })
  requesterId: string;
}

export class SubmitBreedApplicationDtoHttp {
  @ApiProperty({ type: BreedNamesDto })
  names: Record<string, string>;

  @ApiProperty({ example: 'uuid', description: 'ID of the club employee' })
  requesterId: string;
}

export class ApproveBreedApplicationDtoHttp {
  @ApiProperty({ example: 'uuid', description: 'ID of the superAdmin or HQ president' })
  approverId: string;
}
