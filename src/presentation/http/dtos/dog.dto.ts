import { ApiProperty } from '@nestjs/swagger';

export class RegisterDogDtoHttp {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the user who owns the dog', type: String })
  ownerId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'ID of the breeder (kennel owner)', type: String })
  breederId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', description: 'ID of the breed', type: String })
  breedId: string;

  @ApiProperty({ example: 'Buddy', type: String })
  name: string;

  @ApiProperty({ example: 'male', enum: ['male', 'female'], type: String })
  sex: string;

  @ApiProperty({ example: '15-05-2020', description: 'Date of birth in DD-MM-YYYY format', type: String })
  dateBirth: string;
}
