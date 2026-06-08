import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitHqApplicationDto {
  @ApiProperty({ type: [String], description: 'List of document URLs or identifiers' })
  documents: string[];

  @ApiProperty({ example: 'Paw Club International', type: String })
  organizationName: string;

  @ApiProperty({ example: 'US', type: String })
  countryCode: string;

  @ApiProperty({ example: '123456789', type: String })
  taxNumber: string;

  @ApiProperty({ example: 'REG987654321', type: String })
  registrationNumber: string;

  @ApiProperty({ example: 'Jane', type: String })
  presidentName: string;

  @ApiProperty({ example: 'Smith', type: String })
  presidentSurname: string;

  @ApiProperty({ example: 'jane.smith@pawclub.com', type: String })
  presidentEmail: string;

  @ApiPropertyOptional({ example: '+12025550123', type: String, nullable: true })
  presidentPhone: string;

  @ApiProperty({ example: 'securepresidentpass123', type: String })
  presidentPasswordPlain: string;
}

export class ApproveHqApplicationDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The ID of the application to approve', type: String })
  applicationId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'The ID of the user (superAdmin) approving the application', type: String })
  approverId: string;
}
