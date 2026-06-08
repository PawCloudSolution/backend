import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDtoHttp {
  @ApiProperty({ example: 'Paw Club Branch NY', type: String })
  name: string;

  @ApiProperty({ example: 'US', type: String })
  countryCode: string;

  @ApiPropertyOptional({ example: 'TAX123456', type: String, nullable: true })
  taxNumber?: string;

  @ApiPropertyOptional({ example: 'REG123456', type: String, nullable: true })
  registrationNumber?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the requester (president or superAdmin)', type: String })
  requesterId: string;
}
