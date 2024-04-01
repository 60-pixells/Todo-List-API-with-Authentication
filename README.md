# Todo-List-API-with-Authentication


Title: Todo  CRUD APIs
Description: This Node.js backend application provides a set of CRUD (Create, Read, Update, Delete) APIs for managing todo's of user.

## Dependencies

1. Node
2. Npm

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run start` to start the server.

## Usage

1. Make sure the server is running.
2. Send HTTP requests to the appropriate endpoints.
   Example:
    POST /register - Register a new user
    POST /login - Login in an existing user
    GET /todos/:id - Retrieve a todo
    PUT /todos - Update a todo
    DELETE /todos - Delete a todo
    POST /todos - Create a todo


## Testing

1. Run `npm run test` to execute the tests.

## Live demo deployed using Render


1. Base URL : https://todo-list-api-with-authentication.onrender.com

2. To Register A New User Use - BASE URL + /register
    Example: https://todo-list-api-with-authentication.onrender.com/register
    Send appropriate body while making the request in the above case i.e. userName and password
    To Get ToDo list of a user use - BASE URL + /todos/:id
    Example : https://todo-list-api-with-authentication.onrender.com/todos/f776042e-5e97-4780-83e5-692e82a59968
3. The instance will spin down with inactivity, which can delay requests by 50 seconds or more for the first request after inactivity