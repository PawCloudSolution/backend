import { ApiProperty } from '@nestjs/swagger';

export class ApproveEmployeeDtoHttp {
  @ApiProperty({ description: 'ID of the requester (president or superAdmin)' })
  approverId: string;
}

export class GetPendingEmployeesDtoHttp {
  @ApiProperty({ description: 'ID of the organization' })
  organizationId: string;

  @ApiProperty({ description: 'ID of the requester (president or superAdmin)' })
  requesterId: string;
}
