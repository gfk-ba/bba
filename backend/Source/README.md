# gfk-bba-backend

## Description

The backend of the gfk-bba project, based on nestjs

## Dependencies

- Node v10.15
- npm 6.11
- PostgreSQL 9.5

(might work with others versions, but untested)

Make sure you don't use outdated versions of nest (e.g. 5.1)

```bash
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```

will update to 5.3.6 ... and this is needed for auth.

## Server installation

make sure to run

```bash
apt-get install git-core curl build-essential
```

on the server.

## Installation

```bash
npm install
```

For migrations we need typeorm globally:

```bash
npm i typeorm -g
```

## Database config

A sample ormconfig.json can be found in Config/Database/ormconfig.json
Please check / update the values, especially ...
This file will be copied while running npm run start:dev to /Source

- "host": "localhost",
- "port": 5432,
- "username": "MY_USER_NAME",
- "password": "",
- "database": "postgres",

## Copy / edit config files

There are enviroment files (.env) for production / development /Config/Backend
Please check / update the values, especially ...
.env.dev be copied to /Source/.env while running npm run start:dev to /Source

## Getting: "TypeError: JwtStrategy requires a secret or key"

Please see "Copy / edit config files"
make you run npm run start:dev at least once

## TypeOrm problems

Please read [https://github.com/typeorm/typeorm/issues/2572]()

## Running the app

```bash
# watch mode development
npm run start:dev

# development
npm run start

# production mode
npm run start:prod
```

## Filling the database with test data

Test data is included in the migrations, so please run them

```bash
npm run migrate
```

## Access of the backend

Check HTTP_PORT in the ./Source/env for the port being used (e.g. 3001 or 3003)

[http://localhost:3001]()

e.g.

[http://localhost:3001/coupons]()

## Authorization

JWT-based

Call http://localhost:3001/auth/token
to get a token

```bash
curl -X POST \
  http://localhost:3001/auth/token \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'email=MY_EMAIL_ADDRESS&password=MY_PASSWORD'
```

This will deliver the token, e.g.

```bash
{"expiresIn":3600,"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyLmRpY2t0ZW5AZGNzLWZ1ZXJ0aC5kZSIsImlhdCI6MTUzNzE2NzA3MSwiZXhwIjoxNTM3MTcwNjcxfQ.OzJJRBEMF_0pclYMBkM9BbA7UQQoTU3vs4tVrYJfxHU"}
```

Token testen / verwenden

```bash
curl -X GET \
  http://localhost:3001/auth/data \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyLmRpY2t0ZW5AZGNzLWZ1ZXJ0aC5kZSIsImlhdCI6MTUzNzE2NzA3MSwiZXhwIjoxNTM3MTcwNjcxfQ.OzJJRBEMF_0pclYMBkM9BbA7UQQoTU3vs4tVrYJfxHU' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

This should return

`Welcome user 1`

or

`{"statusCode":401,"error":"Unauthorized"}` if the token is invalid

## Run on Server

in /root/Source
screen ./start.sh

(and CTRL+A + CTRL+D to exit the screen without stopping)
