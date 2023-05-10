- You need to create a table in the database and also a dependency
  to be able to generate the uuid

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 create table public.car_rental
 (
   id uuid default uuid_generate_v4() not null
   constraint "PK_24625a1d6b1b089c8ae206fe467"
   primary key,
   "createdAt" timestamp default now() not null,
   "updatedAt" timestamp default now() not null,
   "deletedAt" timestamp,
   "start" timestamp not null,
   "end" timestamp not null,
   "rentalPrice" integer not null,
   "car_id" uuid not null
 );

create index car_rental_car_id on public.car_rental (car_id);
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
