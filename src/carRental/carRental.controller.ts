import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CarRentalService } from './carRental,service';
import {
  CalculateRentalPriceParams,
  CheckCarParams,
  CreateRentalSessionParams,
  ReportCarLoadMonth,
} from './carRental.dto';

@Controller('carRental')
export class CarRentalController {
  constructor(private readonly bookingService: CarRentalService) {}

  @Get('/checkCar')
  async checkCar(@Query() params: CheckCarParams): Promise<boolean> {
    return this.bookingService.checkCarAccessible(params);
  }

  @Get('/calculateRentalPrice')
  async calculateRentalPrice(@Query() params: CalculateRentalPriceParams) {
    return this.bookingService.calculateRentalPrice(params);
  }

  @Post('/createRentalSession')
  async createRentalSession(@Body() params: CreateRentalSessionParams) {
    return this.bookingService.createRentalSession(params);
  }

  @Get('/reportCarLoadMonth')
  async reportCarLoadMonth(@Query() params: ReportCarLoadMonth) {
    return this.bookingService.reportCarLoadMonth(params);
  }
}
