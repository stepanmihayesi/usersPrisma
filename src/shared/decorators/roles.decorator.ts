import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/auth/enums/role.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: Role[]) => SetMetadata(ROLE_KEY, role);