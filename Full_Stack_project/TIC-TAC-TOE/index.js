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
