import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  checkApp(): boolean {
    return true;
  }
}
