

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


socket.on("playing", (e) => { 

  // Find the object in the array that contains the name of the current player
  const foundObject = (e.allPlayers).find(obj => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`);

  // Get the id of the cell where the first player made their move
  p1id = foundObject.p1.p1move
  // Get the id of the cell where the second player made their move
  p2id = foundObject.p2.p2move

  // Determine whose turn it is based on the number of moves made
  if ((foundObject.sum) % 2 == 0) {
    // If the number of moves made is even, it's the second player's turn
    document.getElementById("whosTurn").innerText = "O's Turn"
  }
  else {
    // If the number of moves made is odd, it's the first player's turn
    document.getElementById("whosTurn").innerText = "X's Turn"
  }

  // Display the moves made by the players
  if (p1id != '') {
    document.getElementById(`${p1id}`).innerText = "X"
    document.getElementById(`${p1id}`).disabled = true
    document.getElementById(`${p1id}`).style.color = "black"
  }
  if (p2id != '') {
    document.getElementById(`${p2id}`).innerText = "O"
    document.getElementById(`${p2id}`).disabled = true
    document.getElementById(`${p2id}`).style.color = "black"
  }

  check(name, foundObject.sum);

});

function check(name, sum) {

  // Initialize variables for each button's text, default to unique letters if empty
  let b1 = document.getElementById("btn1").innerText || "a";
  let b2 = document.getElementById("btn2").innerText || "b";
  let b3 = document.getElementById("btn3").innerText || "c";
  let b4 = document.getElementById("btn4").innerText || "d";
  let b5 = document.getElementById("btn5").innerText || "e";
  let b6 = document.getElementById("btn6").innerText || "f";
  let b7 = document.getElementById("btn7").innerText || "g";
  let b8 = document.getElementById("btn8").innerText || "h";
  let b9 = document.getElementById("btn9").innerText || "i";

  // Check all possible winning combinations
  if (
    (b1 === b2 && b2 === b3) || (b4 === b5 && b5 === b6) || (b7 === b8 && b8 === b9) || 
    (b1 === b4 && b4 === b7) || (b2 === b5 && b5 === b8) || (b3 === b6 && b6 === b9) || 
    (b1 === b5 && b5 === b9) || (b3 === b5 && b5 === b7)
  ) {
    // Emit 'gameOver' event to server with player's name
    socket.emit("gameOver", { name: name });

    // Alert the winner and reload the page after a delay
    setTimeout(() => {
      sum % 2 === 0 ? alert("X WON !!") : alert("O WON !!");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 100);
  } 
  // Check for a draw condition
  else if (sum === 10) {
    // Emit 'gameOver' event to server with player's name
    socket.emit("gameOver", { name: name });

    // Alert draw and reload the page after a delay
    setTimeout(() => {
      alert("DRAW!!");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, 100);
  }
}

