import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '@shared/constants/db.constants';
import { checkDayOfWeekCarRental } from '@shared/utils/date/checkDayOfWeekCarRental';
import { BadRequestException } from '@nestjs/common';
import { RENTAL_ERRORS } from '@shared/constants/errors';
import { calculateDifferenceInDays } from '@shared/utils/date/calculateDifferenceInDays';
import { getRentalPrice } from '@shared/utils/date/getRentalPrice';

@Injectable()
export class CarRentalService {
  constructor(@Inject(PG_CONNECTION) private carRental: any) {}

  public async checkCarAccessible({
    carId,
    start,
    end,
  }: {
    carId: string;
    start: string;
    end: string;
  }): Promise<boolean> {
    checkDayOfWeekCarRental(start, end);

    const car = await this.carRental.query(`
      SELECT * FROM car_rental
      WHERE car_id = '${carId}';
    `);

    if (car.rows.length === 0) return true;

    await this.isAlreadyRented({ carId, start, end });

    return true;
  }

  public async calculateRentalPrice({
    carId,
    start,
    end,
  }: {
    carId: string;
    start: string;
    end: string;
  }) {
    checkDayOfWeekCarRental(start, end);

    await this.isAlreadyRented({ carId, start, end });

    const differenceInDays = calculateDifferenceInDays(start, end);

    const rentalPrice = getRentalPrice(differenceInDays);

    return { ok: true, rentalPrice };
  }

  public async createRentalSession({
    carId,
    start,
    end,
  }: {
    carId: string;
    start: string;
    end: string;
  }) {
    checkDayOfWeekCarRental(start, end);

    await this.isAlreadyRented({ carId, start, end });

    const differenceInDays = calculateDifferenceInDays(start, end);

    const rentalPrice = getRentalPrice(differenceInDays);

    const rentalSession = await this.carRental.query(`
      INSERT INTO car_rental AS cr (car_id, "start", "end", "rentalPrice")
      VALUES ('${carId}', '${start}', '${end}', ${rentalPrice} )
      RETURNING cr.id, cr.start, cr.end, cr."rentalPrice", cr.car_id "carId", cr."createdAt", cr."updatedAt"
    `);

    return { ok: true, rentalSession: rentalSession.rows };
  }

  public async reportCarLoadMonth({
    month,
  }: {
    month: string;
  }) {
    const reportCarLoadMonth = await this.carRental.query(`
      SELECT
        cr.car_id AS "carId",
        SUM("rentalPrice") AS "totalProfit",
        SUM(cr."end"::DATE - cr.start::DATE) * 100 / date_part( 'days', (date_trunc('month', date ${month}) + interval '1 month - 1 day')) AS "averageCarLoadPerMonth"
      FROM car_rental cr
      WHERE cr.start >= date_trunc('month', ${month}::timestamp)
      AND cr.end <= date_trunc('month', ${month}::timestamp)+'1month'::interval-'1day'::interval
      GROUP BY cr.car_id
    `);

    return { ok: true, reportCarLoadMonth: reportCarLoadMonth.rows };
  }

  private async isAlreadyRented({
    carId,
    start,
    end,
  }: {
    carId: string;
    start: string;
    end: string;
  }) {
    const alreadyRented = await this.carRental.query(`
    SELECT * FROM car_rental cr
    WHERE cr.car_id = '${carId}'
    AND cr.end > date_trunc('day', '${start}'::timestamp without time zone) - INTERVAL '3 day'
    AND cr.start < date_trunc( 'day', '${end}'::timestamp without time zone) + INTERVAL '3 day';
  `);

    if (alreadyRented.rows.length) {
      throw new BadRequestException(RENTAL_ERRORS.ALREADY_RENTED);
    }
  }
}
