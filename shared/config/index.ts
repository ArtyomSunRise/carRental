import 'dotenv/config';

function getEnv(env: string): string {
  return process.env?.[env] || '';
}

export const PORT = getEnv('PORT');

export const DB = {
  USER: getEnv('DB_USER'),
  HOST: getEnv('DB_HOST'),
  NAME: getEnv('DB_NAME'),
  PASSWORD: getEnv('DB_PASSWORD'),
  PORT: getEnv('DB_PORT'),
};
