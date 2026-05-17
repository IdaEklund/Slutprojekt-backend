# Slutprojekt backend

A final project for the backend course in my education program.

It is a REST API for managing a database of video games, including their platforms, genres and publishers.

## Built with

- Node.js 
- Express
- MySQL

## Description

The API supports CRUD operations for the database. The focus of the project was to create a solid layered architecture and stable error handling.

## Installation

1. **Clone the repository:** git clone https://github.com/IdaEklund/Slutprojekt-backend.git
2. **Navigate to the project folder:** cd Slutprojekt-backend
3. **Create a .env-file and add your values:**
PORT=?
DB_HOST=?
DB_PORT=?
DB_USER=?
DB_PASSWORD=?
DB_NAME=?
4. **Install dependencies:** npm install
5. **Start the server:** node server.js

## Endpoints

| **Method** | **Endpoint** | **Description** |
|------|--------|------|
| GET | / | Get all games plus all the info about each game. |
| GET | /:id | Get a game with a specific id. |
| GET | /count | Get the number of the total amount of games in the db. |
| GET | /stats | Count games per genre. |
| POST | / | Add a game to the db. |
| PUT | /:id | Update a game with a specific id. |
| DELETE | /:id | Delete a game from the db. |





