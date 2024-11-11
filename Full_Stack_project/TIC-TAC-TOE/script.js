

// Hide all the elements that are not needed when the page first loads
document.getElementById("loading").style.display = "none"
document.getElementById("bigCont").style.display = "none"
document.getElementById("userCont").style.display = "none"
document.getElementById("oppNameCont").style.display = "none"
document.getElementById("valueCont").style.display = "none"
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
})
