
# The Insurance Policy API is a NestJS-based API for managing insurance policies. It includes features such as user authentication, policy creation, updating, and retrieval

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication (JWT)
- Create, read, update, and delete insurance policies
- Protected routes using JWT authentication
- Comprehensive API documentation with Swagger

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- PostgreSQL

### Steps

  1. **Clone the repository:**

    git clone https://github.com/mianhaseeb1/insurance-policy-api.git
    cd insurance-policy-api

  2. **Install dependencies:**

    npm install

  3. **Set up PostgreSQL database:**

    Create a PostgreSQL database and note down the connection details.

  4. **Set up environment variables:**

    Create a .env file in the root directory and add the following environment variables:

    
      ALLOWED_METHODS=
      DATABASE_URL=
      DEBUG=
      JWT_EXPIRES_IN=
      JWT_SECRET_KEY=
      LOG_LEVEL=
      NODE_ENV=
      PINO_LOG_LEVEL=
      PORT=
      TOKEN_EXPIRATION=
    

## Configuration

  Configuration settings are managed via environment variables. You can find the configuration in the `src/configs/app.config.ts` file.

## Running the Application

### Development

  To start the application in development mode with hot reloading:

  
  npm run start:dev
  

### Production

  To start the application in production mode:

  
  npm run build
  npm run start:prod
  

## API Documentation

  API documentation is available via Swagger. After starting the application, navigate to `http://localhost:3000/api` to view the documentation.

## Authentication

  Authentication is handled using JWT (JSON Web Tokens). You need to include the JWT token in the Authorization header for protected routes.

### Register a User

  ```http
  POST /auth/register
  Content-Type: application/json

  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

### Login a User

  ```http
  POST /auth/login
  Content-Type: application/json

  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Using the Token

  Include the JWT token in the Authorization header for protected routes:

  ```http
  Authorization: Bearer <your_jwt_token>
  ```

## Usage

### Policies Endpoints

#### Create a Policy

  ```http
  POST /policies
  Authorization: Bearer <your_jwt_token>
  Content-Type: application/json

  {
    "policyNumber": "P123456789",
    "holderName": "John Doe",
    "startDate": "2024-06-16T00:00:00Z",
    "endDate": "2025-06-16T00:00:00Z",
    "premium": 1000
  }
  ```

#### Get All Policies

  ```http
  GET /policies
  Authorization: Bearer <your_jwt_token>
  ```

#### Get a Policy by UUID

  ```http
  GET /policies/:uuid
  Authorization: Bearer <your_jwt_token>
  ```

#### Update a Policy

  ```http
  PATCH /policies/:uuid
  Authorization: Bearer <your_jwt_token>
  Content-Type: application/json

  {
    "policyNumber": "P123456789",
    "holderName": "John Doe Updated",
    "startDate": "2024-06-16T00:00:00Z",
    "endDate": "2025-06-16T00:00:00Z",
    "premium": 1500
  }
  ```

#### Delete a Policy

  ```http
  DELETE /policies/:uuid
  Authorization: Bearer <your_jwt_token>
  ```

## Contributing

  Contributions are welcome! Please fork the repository and create a pull request.

## License

  This project is licensed under the MIT License. See the LICENSE file for details.
