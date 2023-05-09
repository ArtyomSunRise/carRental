import { RATE } from '@shared/constants/rateCarRental';

export function getRentalPrice(differenceInDays: number) {
  let rentalPrice = 0;

  for (let i = 1; i <= differenceInDays; i++) {
    if (i <= 4) {
      rentalPrice += RATE.BASE;
    }

    if (i > 4 && i <= 9) {
      rentalPrice += RATE.FROM_4_TO_9_DAYS;
    }

    if (i > 9 && i <= 17) {
      rentalPrice += RATE.FROM_10_TO_17_DAYS;
    }

    if (i > 17 && i <= 29) {
      rentalPrice += RATE.FROM_18_TO_29_DAYS;
    }
  }

  return rentalPrice;
}
