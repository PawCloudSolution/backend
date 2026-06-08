import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiPropertyOptional({ description: 'Organization ID if the user is joining an existing organization' })
  organizationId: string | null;

  @ApiProperty({ example: 'John' })
  name: string;

  @ApiProperty({ example: 'Doe' })
  surname: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'employee', description: 'User role, e.g., superAdmin, roleManager, employee, member' })
  role: string;

  @ApiProperty({ example: 'US' })
  countryCode: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  phoneNumber: string | null;

  @ApiProperty({ example: 'strongpassword123', description: 'Plain password' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'strongpassword123' })
  password: string;
}
