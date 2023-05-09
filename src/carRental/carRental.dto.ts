import { IsDateString, IsUUID } from 'class-validator';

export class CheckCarParams {
  @IsUUID('4')
  public carId: string;

  @IsDateString()
  public start: string;

  @IsDateString()
  public end: string;
}

export class CalculateRentalPriceParams extends CheckCarParams {}

export class CreateRentalSessionParams extends CheckCarParams {}

export class ReportCarLoadMonth {
  @IsDateString()
  public month: string;
}
