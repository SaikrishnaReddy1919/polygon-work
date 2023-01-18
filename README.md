# Polygon Task

NOTE: as this server is not deployed, here is a small video that takes through all the apis.
[youtube](https://www.youtube.com/watch?v=JK8ReBh1stQ)

## Table of Contents

- [Polygon Task](#polygon-task)
  - [Table of Contents](#table-of-contents)
  - [Testing](#testing)
  - [Installation](#installation)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [API Endpoints](#api-endpoints)

## Testing
* Steps(User Signup):
  * Run the server and go to http://localhost:3000/v1/docs
  * Click on auth/register route and then on try it out.
  * Create a new user with email and password.
  * Check email and click on the link received to verify email.(open gmail app where the server is running otherwise email cant be verified as server is not deployed.)
  * Use this email and password inside auth/login route to get access token.
* Setps(Web3 Platform)
  * There are two routes here :
    * ```events/start-listening``` : once this api hits, backend will start listening for erc20 transfer events. We can do this when the server starts running but here, I am using infura provider (polygon mainnet) which has limit over number of requests made. That's why separate route is made to make the backend start listening for erc-20 transfer events.
    * ```events/fetch-events``` : this api will take ```page``` and ```address``` as query params and returns the results(5 per page)
## Installation

Clone the repo:

```bash
git clone https://github.com/SaikrishnaReddy1919/polygon-work.git
cd polygon-work
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and update MONGODB_URL
```

Then run the server using :

```bash
npm run dev
```

Server will run on port 3000 and docs for the apis will be available at <a href="http://localhost:3000/v1/docs" target="_blank">docs</a>

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)

These features can be extended, like response data can be compressed, input data to requests can be sanitized etc...

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/logout` - logout

**Book routes**:\
`GET /v1/events/start-listening` - starts listening for erc-20 transfer events\
`GET /v1/events/fetch-events` - fetchs events based on provided query params\

