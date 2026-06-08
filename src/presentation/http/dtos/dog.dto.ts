import { ApiProperty } from '@nestjs/swagger';

export class RegisterDogDtoHttp {
  @ApiProperty({ example: 'uuid', description: 'ID of the user who owns the dog' })
  ownerId: string;

  @ApiProperty({ example: 'uuid', description: 'ID of the breeder (kennel owner)' })
  breederId: string;

  @ApiProperty({ example: 'uuid', description: 'ID of the breed' })
  breedId: string;

  @ApiProperty({ example: 'Buddy' })
  name: string;

  @ApiProperty({ example: 'male', enum: ['male', 'female'] })
  sex: string;

  @ApiProperty({ example: '15-05-2020', description: 'Date of birth in DD-MM-YYYY format' })
  dateBirth: string;

  @ApiProperty({ example: 'uuid', description: 'ID of the employee registering the dog' })
  requesterId: string;
}
