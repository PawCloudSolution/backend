import { ApiProperty } from '@nestjs/swagger';

export class ApproveEmployeeDtoHttp {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the requester (president or superAdmin)', type: String })
  approverId: string;
}

export class GetPendingEmployeesDtoHttp {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'ID of the organization', type: String })
  organizationId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the requester (president or superAdmin)', type: String })
  requesterId: string;
}
