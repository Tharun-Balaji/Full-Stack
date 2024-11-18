// Import the necessary modules
const express = require('express');
const app = express(); // Create an Express application

const path = require('path'); // Module to work with file and directory paths
const http = require('http'); // Module to create an HTTP server
const { Server } = require('socket.io'); // Import Server class from socket.io

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the server object
const io = new Server(server);

// Serve static files from the directory specified
app.use(express.static(path.resolve('')));

const arr = []; // Array to store the names of players that are waiting to play
const playingArray = []; // Array to store the objects of the players that are currently playing

io.on('connection', (socket) => {

  // Listen for the "find" event, which is emitted when a player wants to find another player
  socket.on('find', (e) => { 

    // Check if the player has a valid name
    if (e.name != null) {
      arr.push(e.name) // Add the name to the array

      // If there are at least two players waiting to play, create a game object
      if (arr.length >= 2) {
        const p1obj = {
          p1name: arr[0], // Store the name of the first player
          p1value: "X", // Store the symbol of the first player
          p1move: "" // Store the move of the first player
        }
        const p2obj = {
          p2name: arr[1], // Store the name of the second player
          p2value: "O", // Store the symbol of the second player
          p2move: "" // Store the move of the second player
        }

        // Create a game object that contains the information of the two players
        const obj = {
          p1: p1obj,
          p2: p2obj,
          sum: 1 // Store the sum of the moves made by the two players
        }
        playingArray.push(obj) // Add the game object to the array

        // Remove the names of the two players from the array
        arr.splice(0, 2)

        // Emit the "find" event to all connected clients with the updated array of games
        io.emit("find", { allPlayers: playingArray })
      }
     }

  })

  // Listen for the "playing" event, which is emitted when a player makes a move
  socket.on("playing", (e) => {

    // Check if the player is playing as X
    if (e.value == "X") {

      // Find the object in playingArray that contains the player's name
      let objToChange = playingArray.find(obj => obj.p1.p1name === e.name)

      // Update the move of the player
      objToChange.p1.p1move = e.id

      // Increment the sum of moves made by the two players in the game
      objToChange.sum++
    }
    // Check if the player is playing as O
    else if (e.value == "O") {

      // Find the object in playingArray that contains the player's name
      let objToChange = playingArray.find(obj => obj.p2.p2name === e.name)

      // Update the move of the player
      objToChange.p2.p2move = e.id

      // Increment the sum of moves made by the two players in the game
      objToChange.sum++
    }

    // Emit the "playing" event to all connected clients with the updated array of games
    io.emit("playing", { allPlayers: playingArray });

  });

  // Listen for the "gameOver" event, which is emitted when a game ends
  socket.on("gameOver", (e) => {
    // Remove the game object from playingArray where the player's name matches
    playingArray = playingArray.filter(obj => obj.p1.p1name !== e.name);
    
    // Log the updated array of games
    console.log(playingArray);
    
    // Log a message for debugging purposes
    console.log("lol");
  });


})

// Define a route handler for the default home page
app.get('/', (req, res) => {
  return res.sendFile('index.html'); // Send 'index.html' file as a response
});

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(PORT, () => { 
  console.log('Server is running on port %i', PORT); // Log a message when the server is running
});
