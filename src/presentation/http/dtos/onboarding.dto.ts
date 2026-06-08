import { ApiProperty } from '@nestjs/swagger';

export class SubmitHqApplicationDto {
  @ApiProperty({ type: [String], description: 'List of document URLs or identifiers' })
  documents: string[];

  @ApiProperty({ example: 'Paw Club International' })
  organizationName: string;

  @ApiProperty({ example: 'US' })
  countryCode: string;

  @ApiProperty({ example: '123456789' })
  taxNumber: string;

  @ApiProperty({ example: 'REG987654321' })
  registrationNumber: string;

  @ApiProperty({ example: 'Jane' })
  presidentName: string;

  @ApiProperty({ example: 'Smith' })
  presidentSurname: string;

  @ApiProperty({ example: 'jane.smith@pawclub.com' })
  presidentEmail: string;

  @ApiProperty({ example: '+1987654321' })
  presidentPhone: string;

  @ApiProperty({ example: 'securepresidentpass123' })
  presidentPasswordPlain: string;
}

export class ApproveHqApplicationDto {
  @ApiProperty({ description: 'The ID of the application to approve' })
  applicationId: string;

  @ApiProperty({ description: 'The ID of the user (superAdmin) approving the application' })
  approverId: string;
}
