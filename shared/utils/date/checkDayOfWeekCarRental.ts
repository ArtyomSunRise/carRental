import { BadRequestException } from '@nestjs/common';
import { RENTAL_ERRORS } from '@shared/constants/errors';

export function checkDayOfWeekCarRental(start: string, end: string) {
  const startRentalDay = new Date(start).getDay();
  const endRentalDay = new Date(end).getDay();

  const condition =
    startRentalDay === 0 ||
    startRentalDay === 6 ||
    endRentalDay === 0 ||
    endRentalDay === 6;

  if (condition) throw new BadRequestException(RENTAL_ERRORS.DAY);

  return true;
}
