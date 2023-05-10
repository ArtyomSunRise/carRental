import { Module } from '@nestjs/common';
import { DbModule } from '../../shared/database/database.module';
import { CarRentalService } from './carRental.service';
import { CarRentalController } from './carRental.controller';

@Module({
  imports: [DbModule],
  controllers: [CarRentalController],
  providers: [CarRentalService],
  exports: [CarRentalService],
})
export class CarRentalModule {}
