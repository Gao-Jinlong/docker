import { SetMetadata } from '@nestjs/common';

export const RequireLogin = (isNeedLogin = true) =>
  SetMetadata('require-login', isNeedLogin);
