# Task Management Backend

A RESTful API backend service for task management with AI-powered task suggestions.

## Features

- User authentication and authorization using JWT
- CRUD operations for tasks
- AI-powered task suggestions using OpenAI
- MongoDB integration for data persistence

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and receive JWT token

### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

### AI Suggestions

- `GET /api/suggestions` - Get AI-generated task suggestions

## Authentication

All task-related endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## Task Model

```javascript
{
  title: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 404: Resource not found
- 500: Server error

## Development

For development, you can use nodemon:

```bash
npm run dev
```

## Security

- JWT-based authentication
- Password hashing
- Protected routes
- Environment variables for sensitive data
