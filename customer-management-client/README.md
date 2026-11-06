
# Customer Management - Frontend

React-based frontend for the Customer Management.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- React Router
- Vite

## Features

- User login
- Customer listing
- Add and edit customers
- Delete customers
- Search customers
- Pagination
- Logout

## Client File Structure
customer-management-client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md

## Setup and Run

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the application:

```bash
npm run dev
```

Open the URL displayed in the terminal.

## Backend

The frontend communicates with the Customer Management backend through REST APIs.
