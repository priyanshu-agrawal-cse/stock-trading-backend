already deplyed and tested

# Stock Trading Backend

A Node.js backend application for a stock trading platform, built with Express.js and MongoDB. This API provides endpoints for user authentication, managing holdings, positions, orders, and watchlists.

## Features

- User registration and login with JWT authentication
- Manage stock holdings, positions, orders, and watchlists
- CORS enabled for frontend integration
- Cookie-based authentication

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3002
   MONGO_URL=mongodb://localhost:27017/stocktrading
   TOKEN_KEY=your_secret_jwt_key
   ```

4. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:3002`.

## API Endpoints

### Authentication

- **POST /signup**
  - Registers a new user.
  - Body: `{ "email": "user@example.com", "password": "password", "username": "username", "createdAt": "timestamp" }`

- **POST /login**
  - Logs in a user.
  - Body: `{ "email": "user@example.com", "password": "password" }`

- **POST /userVerification**
  - Verifies user authentication via JWT token in cookies.

### Data Retrieval

- **GET /allHoldings**
  - Retrieves all holdings.

- **GET /allwatchlist**
  - Retrieves all watchlist items.

- **GET /allPositions**
  - Retrieves all positions.

- **GET /allOrders**
  - Retrieves all orders.

### Orders

- **POST /newOrder**
  - Creates a new order and updates holdings.
  - Body: `{ "name": "stock_name", "price": "price", "qty": "quantity", "mode": "mode" }`

## Dependencies

- express: Web framework
- mongoose: MongoDB object modeling
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- passport & passport-local: Authentication strategies
- cors: Cross-origin resource sharing
- body-parser: Request body parsing
- cookie-parser: Cookie parsing
- dotenv: Environment variable management

## Project Structure

- `index.js`: Main server file
- `model/`: Mongoose models
  - `UserModel.js`
  - `HoldingModel.js`
  - `OrdersModel.js`
  - `PositionsModel.js`
  - `WatchListModel.js`
- `schemas/`: Mongoose schemas
  - `HoldingsSchema.js`
  - `OrdersSchema.js`
  - `PositionsSchema.js`
  - `WatchListSchema.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the ISC License.   



