# Project Assigment Overview

The Customer Management System is a web application developed using React, Node.js, Express.js, PostgreSQL, and Prisma ORM.

The application provides secure login functionality and allows users to perform customer management operations such as creating, viewing, updating, deleting, searching, and browsing customers with pagination.

## Key Features

- User authentication using static credentials.
- JWT-based authentication.
- Protected customer management APIs.
- Create new customer records.
- View customer details.
- Update existing customer information.
- Delete customer records with confirmation.
- Search customers by name or email.
- Server-side pagination.
- Form validation and duplicate email handling.
- Logout functionality.

## Technologies Used

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- React Router
- Vite

### Backend
- Node.js
- Express.js
- Prisma ORM
- JSON Web Token (JWT)

### Database
- PostgreSQL

## Project Structure

```text
customer-management/
│
├── customer-management-client/
│   ├── README.md
│   └── src/
│
├── customer-management-server/
│   ├── README.md
│   ├── prisma/
│   └── src/
│
└── README.md
```

## Application Architecture

The application follows a client-server architecture.

1. The React frontend provides the user interface.
2. The frontend communicates with the backend through REST APIs.
3. The Express backend handles authentication and customer operations.
4. JWT middleware protects customer management endpoints.
5. Prisma ORM communicates with the PostgreSQL database.

### Prerequisites

Install the following before running the application:

- Node.js
- npm
- PostgreSQL

## Authentication

The application uses two predefined user accounts configured through backend environment variables.

- No user registration functionality.
- Login using configured email and password.
- JWT token generated after successful authentication.
- Protected APIs require a valid JWT token.

## Customer Data

Each customer record contains:

| Field | Description |
|---|---|
| ID | Unique customer identifier |
| Name | Customer name |
| Email | Customer email address |

## Documentation

For detailed setup and implementation instructions, refer to:

- [Frontend Documentation](./customer-management-client/README.md)
- [Backend Documentation](./customer-management-server/README.md)
