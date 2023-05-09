import { BadRequestException } from '@nestjs/common';
import { RENTAL_ERRORS } from '@shared/constants/errors';

export function calculateDifferenceInDays(start: string, end: string) {
  const startRentalDay = new Date(start).getTime();
  const endRentalDay = new Date(end).getTime();
  const differenceInTime = endRentalDay - startRentalDay;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays > 30) {
    throw new BadRequestException(RENTAL_ERRORS.EXCEED_DAYS);
  }

  return differenceInDays;
}
