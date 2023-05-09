import { Module } from '@nestjs/common';
import { DB } from '@shared/config';
import { PG_CONNECTION } from '@shared/constants/db.constants';
import { Pool } from 'pg';

export const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: DB.USER,
    host: DB.HOST,
    database: DB.NAME,
    password: DB.PASSWORD,
    port: +DB.PORT,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
