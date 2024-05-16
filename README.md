# Game Application

## Overview
This application allows users to play a game where they can win pastries. The winners' details, including the pastries they won, are displayed in a table once all pastries are won.

## Setup

### Backend
Ensure that your MongoDB service is running as the backend requires a MongoDB database to store user and pastry data.

1. Navigate to the backend directory: cd server
2. Install dependencies: npm install
3. Start the server: npm start

### Frontend
The frontend is a React application that communicates with the backend.

1. Navigate to the frontend directory: cd frontend
2. Install dependencies: npm install
3. Start the frontend : npm start


## Key Functionalities

### Playing the Game
- Users can play the game by rolling dice.
- The backend determines if the user wins a pastry based on the dice outcome.
- Users are limited to three game plays.

### Displaying Winners
Once all pastries are won, the game ends, and the winners are displayed in a table. The winners are grouped by email, showing all the pastries each user has won.

### Code Snippets

#### Redirecting to Winners Table with State
When the game ends and winners are determined, the frontend navigates to the winners table:

### Code advice
The good code is in gameTest, don't check game.

## Routes
- `/gametest` : Main game interface.
- `/winners` : Displays the winners and the pastries they have won.


## Conclusion
This application provides an interactive gaming experience with a backend that handles game logic and a frontend that displays game results and winners effectively.
