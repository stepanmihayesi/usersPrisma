import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@app/auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user || !user.sub) {
      throw new Error('Utilisateur inexistant !');
    }
    return user.sub;
  },
);