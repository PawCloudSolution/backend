import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClubDtoHttp {
  @ApiProperty({ example: 'Paw Club Branch NY', type: String })
  name: string;

  @ApiProperty({ example: 'US', type: String })
  countryCode: string;

  @ApiPropertyOptional({ example: 'TAX123456', type: String, nullable: true })
  taxNumber?: string;

  @ApiPropertyOptional({ example: 'REG123456', type: String, nullable: true })
  registrationNumber?: string;

  @ApiProperty({ example: 'John', type: String })
  presidentName: string;

  @ApiProperty({ example: 'Doe', type: String })
  presidentSurname: string;

  @ApiProperty({ example: 'club.president@example.com', type: String })
  presidentEmail: string;

  @ApiPropertyOptional({ example: '+12025550123', type: String, nullable: true })
  presidentPhone?: string;

  @ApiProperty({ example: 'securepassword123', type: String })
  presidentPasswordPlain: string;
}
