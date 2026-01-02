# Money Tracker

A premium money tracking application to manage your income and expenses.

## Features
- **Automatic Category Detection**: Transactions are automatically classified as Income or Expense based on the category.
- **Real-time Balance**: View your total balance, income, and expenses instantly.
- **Transaction History**: Keep track of all your financial activities.
- **Premium UI**: Modern dark mode design.

## Prerequisites
- **Node.js**: Make sure Node.js is installed on your machine.
- **MongoDB**: Ensure MongoDB is installed and running locally.

## Installation

1. Clone the repository or download the source code.
2. Open a terminal in the project directory.
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration
The application uses a `.env` file for configuration. It is already set up with default values:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/moneytracker
```

## Running the Project

1. Start the server:
   ```bash
   npm start
   ```
   OR
   ```bash
   node server.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage
- Enter a description for your transaction.
- Enter the amount (always positive).
- Select a category (e.g., Salary, Food).
- Click "Add Transaction".
- The app will automatically determine if it's an income or expense.
