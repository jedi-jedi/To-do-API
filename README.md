📝 To-Do API

A RESTful API built with Node.js, Express, and MongoDB for managing user authentication and to-do tasks.
Users can sign up, sign in, log out, and perform full CRUD operations on their tasks.
The API uses JWT-based authentication for securing endpoints, ensuring scalability and maintainability.

🚀 Features

🔑 User Authentication

Sign Up with name, email, and password (hashed with bcrypt).

Sign In with email and password to obtain a JWT token.

Log Out and blacklist the token to prevent reuse.

✅ To-Do Management

Create, Read, Update, and Delete (CRUD) tasks.

Filter to-dos by status (pending or completed).

Each task is linked to the authenticated user.

🔒 Security

JWT authentication for protected routes.

Token blacklisting after logout.

Basic input validation & error handling.

🗄️ Database

MongoDB with Mongoose for schema modeling.

📂 Project Structure

├── controllers

|   ├── toDoController.js    # Handles to-do CRUD operations

|   ├── userController.js    # Manages user authentication

├── models

│   ├── blackListedToken.js  # Schema for blacklisted JWT tokens

│   ├── toDoModel.js         # Schema for to-do items

│   ├── userModel.js         # Schema for users

├── middlewares

│   ├── isLoggedIn.js        # Middleware for JWT authentication

├── routes

│   ├── toDoRouter.js        # To-do endpoints

│   ├── userRouter.js        # Authentication endpoints

├── connectDb.js             # MongoDB connection

└── README.md                # Documentation

⚙️ Prerequisites

Node.js v14+

MongoDB (local or cloud e.g. Atlas)

Postman (for API testing)

Git

🛠️ Setup Instructions

Clone the Repository

git clone https://github.com/jedi-jedi/To-do-API.git

cd To-do-API


Install Dependencies

npm install


Required packages:

express

mongoose

bcrypt

jsonwebtoken

dotenv

Configure Environment Variables
Create a .env file:

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

PORT=3000


Run the Application

npm start


Server runs on: http://localhost:3000

📡 API Endpoints

🔑 Authentication

Method	Endpoint	Description

POST	/users	Register a new user

POST	/users/signin	Sign in & get token

POST	/users/logout	Log out & blacklist token

📝 To-Do Management

(All require Authorization: Bearer <token> header)

Method	Endpoint	Description

POST	/get-Todo	Create a new to-do

GET	/get-Todo	Get all to-dos (filter by ?status=)

GET	/get-Todo/:id	Get a specific to-do

PATCH	/update-Todo/:id	Update a to-do

DELETE	/delete-Todo/:id	Delete a to-do

🔔 Error Responses

400 – Invalid input/parameters

401 – Missing/invalid token

403 – Blacklisted token

404 – Resource not found

500 – Server error

🧪 Testing with Postman

Obtain Token

Send POST /users/signin with valid credentials.

Copy the token.

Authenticate Requests

Add header:

Authorization: Bearer <token>


Filter Tasks

GET /get-Todo?status=pending

GET /get-Todo?status=completed

Error Handling

Test with invalid or blacklisted tokens.

🔮 Future Improvements

Input validation with Joi or express-validator

Global error-handling middleware

CORS support

Rate limiting

Unit tests with Jest + Supertest

Standardize route names (e.g., /todos instead of /get-Todo)

🤝 Contributing

Fork the repository

Create a feature branch

git checkout -b feature/your-feature


Commit your changes

git commit -m "Add your feature"


Push and open a PR

📜 License

Licensed under the MIT License.
