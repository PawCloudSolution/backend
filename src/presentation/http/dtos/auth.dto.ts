import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Organization ID if the user is joining an existing organization', type: String, nullable: true })
  organizationId: string | null;

  @ApiProperty({ example: 'John', type: String })
  name: string;

  @ApiProperty({ example: 'Doe', type: String })
  surname: string;

  @ApiProperty({ example: 'john.doe@example.com', type: String })
  email: string;

  @ApiProperty({ example: 'johndoe', type: String })
  username: string;

  @ApiProperty({ example: 'employee', description: 'User role, e.g., superAdmin, roleManager, employee, member', type: String })
  role: string;

  @ApiProperty({ example: 'US', type: String })
  countryCode: string;

  @ApiPropertyOptional({ example: '+12025550123', type: String, nullable: true })
  phoneNumber: string | null;

  @ApiProperty({ example: 'strongpassword123', description: 'Plain password', type: String })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'john.doe@example.com', type: String })
  email: string;

  @ApiProperty({ example: 'strongpassword123', type: String })
  password: string;
}
