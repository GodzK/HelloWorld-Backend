# README

## API Testing Guide

This project is a backend API built with Express.js, designed for handling user authentication, room bookings, and staff management. This guide will help you test all functions using Postman.

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [Postman](https://www.postman.com/).
3. Clone this repository and install dependencies:
   ```sh
   git clone https://github.com/GodzK/HelloWorld-Backend.git
   cd server
   npm install
   ```

### Running the Server
1. Create a `.env` file and configure the following variables:
   ```env
   PORT=3000
   SESSION_SECRET=your_secret_key
   JWT_SECRET=your_jwt_secret
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```
2. Start the server:
   ```sh
   npm start
   ```

### Testing API Endpoints
Use Postman to test the following endpoints.

#### Authentication
- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Logout:** `POST /api/auth/logout`

#### User Routes
- **Get User Profile:** `GET /api/users/profile`
- **Get User ID:** `GET /api/users/userId`
- **Get User Role:** `GET /api/users/role`

#### Room Routes
- **Get All Rooms:** `GET /api/rooms`
- **Get Room by ID:** `GET /api/rooms/:id`
- **Create Room (Admin Only):** `POST /api/rooms`

#### Booking Routes
- **Book a Room:** `POST /api/bookings`
- **Cancel Booking:** `DELETE /api/bookings/:booking_id`

#### Staff Routes
- **Get Staff Details (Staff Only):** `GET /api/staff`

### Middleware & Security
- `verifyToken` is used to ensure authentication.
- `checkRole` ensures access control for different user roles.
- CORS is configured for specific frontend origins.

### Error Handling
All errors are handled using a custom middleware `errorHandler`.

### Notes
- The API uses JWT for authentication.
- Sessions are stored securely.
- Database queries are handled via MySQL.

### Contributors
- Developer: [Phakaphol Dherachaisuphakij ]

### License

