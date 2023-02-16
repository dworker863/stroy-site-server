import { ConfigModule } from '@nestjs/config';

export const getSecretKey = async () => {
  await ConfigModule.envVariablesLoaded;
  return process.env.PRIVATE_KEY;
};
