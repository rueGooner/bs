import { PartialType } from '@nestjs/swagger';
import { CreateClientDto, CreateAdminDto } from './create-user.dto';

export class UpdateUserDto
  extends PartialType(CreateAdminDto)
  implements Partial<CreateClientDto> {}
