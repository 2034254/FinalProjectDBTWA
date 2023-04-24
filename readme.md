# Final Project Web DB

This project contains both the backend and frontend components of a web application for authentication.

## Backend

To start the server's backend, follow these steps:

1. Change directory to Backend: `cd Backend`
2. Install dependencies: `npm i`
3. Create a .env file with the following content:
    ```
    SECRET=<Enter secret of your choice>
    MONGO_URL=<Enter Mongo URL, default being "mongodb://localhost:27017">
    ```
4. Start the backend server: `npm start`

## Frontend

To start the server's frontend, follow these steps:

1. Change directory to Frontend/my-auth-app: `cd Frontend/my-auth-app`
2. Install dependencies: `npm i`
3. Run the frontend in development mode: `npm run dev`