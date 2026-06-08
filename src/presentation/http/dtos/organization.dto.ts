import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDtoHttp {
  @ApiProperty({ example: 'Paw Club Branch NY' })
  name: string;

  @ApiProperty({ example: 'US' })
  countryCode: string;

  @ApiPropertyOptional({ example: 'TAX123456' })
  taxNumber?: string;

  @ApiPropertyOptional({ example: 'REG123456' })
  registrationNumber?: string;

  @ApiProperty({ description: 'ID of the requester (president or superAdmin)' })
  requesterId: string;
}
