import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@shared/database/database.module';
import { CarRentalModule } from 'src/carRental/carRental.module';

@Module({
  imports: [DbModule, CarRentalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
