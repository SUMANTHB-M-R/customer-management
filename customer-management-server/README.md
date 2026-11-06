
# Customer Management - Backend

Node.js and Express.js backend for the Customer Management System.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)

## Features

- User authentication
- JWT token generation and verification
- Protected customer APIs
- Create, read, update, and delete customers
- Search customers by name or email
- Server-side pagination
- Input validation

## Server File Structure
customer-management-server/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── prisma.config.ts
├── package.json
└── README.md

## Setup and Run

Install dependencies:

```bash
npm install
```

Create a `.env` file with the following configuration:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

USER1_EMAIL=your_first_email
USER1_PASSWORD=your_first_password

USER2_EMAIL=your_second_email
USER2_PASSWORD=your_second_password
```

Configure PostgreSQL and run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

## API Base URL

```text
http://localhost:5000/api
```
