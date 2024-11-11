

// Hide all the elements that are not needed when the page first loads
document.getElementById("loading").style.display = "none";
document.getElementById("bigCont").style.display = "none";
document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";
document.getElementById("valueCont").style.display = "none";
document.getElementById("whosTurn").style.display = "none";

// Connect to the server using socket.io
const socket = io();

// Get the value of the name input field
let name;

// Add an event listener to the "Find" button
document.getElementById('find').addEventListener("click", function () {
  // Get the value of the name field
  name = document.getElementById("name").value
  // Display the name in the "You" field
  document.getElementById("user").innerText = name
  
  // Check if the name is valid
  if (name == null || name == '') {
    alert("Please enter a name")
  }
  else {

    // Send the name to the server
    socket.emit("find", { name: name })

    // Show the loading gif
    document.getElementById("loading").style.display = "block"
    // Disable the "Find" button
    document.getElementById("find").disabled = true;

  }
});

// This event is emitted when the server has found another player to play with
socket.on("find", (e) => {

  // Get the array of all the games from the server
  let allPlayersArray = e.allPlayers;

  // If the user has entered a valid name, hide the "Find" button and show the tic-tac-toe board
  if (name != '') {
    // Show the "You" and "Opponent" names
    document.getElementById("userCont").style.display = "block"
    document.getElementById("oppNameCont").style.display = "block"
    document.getElementById("valueCont").style.display = "block"
    // Hide the loading gif
    document.getElementById("loading").style.display = "none"
    // Hide the "Find" button and text input field
    document.getElementById("name").style.display = "none"
    document.getElementById("find").style.display = "none"
    document.getElementById("enterName").style.display = "none"
    // Show the tic-tac-toe board
    document.getElementById("bigCont").style.display = "block"
    // Show the "X's Turn" text
    document.getElementById("whosTurn").style.display = "block"
    document.getElementById("whosTurn").innerText = "X's Turn"

  }

  // Get the name of the opponent and the value of the player
  let oppName;
  let value;

  // Find the object in the array that contains the name of the current player
  const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`);
  // If the current player is the first player, get the opponent's name and the player's value
  if (foundObject.p1.p1name == `${name}`) {
    oppName = foundObject.p2.p2name
    value = foundObject.p1.p1value
  }
  // Otherwise, get the opponent's name and the player's value
  else {
    oppName = foundObject.p1.p1name
    value = foundObject.p2.p2value
  }

  // Display the opponent's name and the player's value
  document.getElementById("oppName").innerText = oppName
  document.getElementById("value").innerText = value

});


// Add an event listener to each of the buttons representing the cells of the tic-tac-toe board
document.querySelectorAll(".btn").forEach(e => {
  e.addEventListener("click", function () {
    // Get the value of the current player (X or O)
    let value = document.getElementById("value").innerText
    // Set the text of the button to the value of the current player
    e.innerText = value

    // Send the value, id of the button, and name of the current player to the server
    socket.emit("playing", { value: value, id: e.id, name: name });

  })
});
