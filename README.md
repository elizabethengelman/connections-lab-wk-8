## Socekt.io - Drawing Example Starter

### Local Setup
- `cd` via the commnad line to the project folder
- Run `npm install` to load dependencies listed in package.json

### Code Steps - Included
- Step 1:	Client-Side Setup - HTML, CSS, & JS
- Step 2:	Server-Side Setup - Express & HTTP Server

### Code Steps - To Do
- Step 3:	Server-Side Socket.io Initialization + Connection
```
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);
```
```
//Listen for individual clients/users to connect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);
  
  //Listen for messages from the client


  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});
```

- Step 4:	Client-Side Socket.io Initialization + Connection
```
//Open and connect socket
let socket = io();
```
```
//Listen for confirmation of connection
socket.on('connect', () => {
  console.log("Connected");
});
```

- Step 5:	Client-Side **‘Emit’** Event - What do you send?
```
function mouseMoved() {
  //Grab mouse position
  let mousePos = { x: mouseX, y: mouseY };
  //Send mouse position object to the server
  socket.emit('data', mousePos);

  //Draw yourself? or Wait for server?
  // fill(0);
  // ellipse(mouseX, mouseY 10, 10);
}
```

- Step 6:	Server-Side **‘On’** Event
```
//Listen for a message named 'data' from this client
socket.on('data', (data) => {
  //Data can be numbers, strings, objects
  console.log("Received 'data' msg");
  console.log(data);

  //Send data back to the clients using .emit()


}
```

- Step 7:	Server-Side **‘Emit’** Event - How to share?
```
//Send data to ALL clients, including this one
io.emit('data', data);

//Send data to ALL other clients, except for the sender
// socket.broadcast.emit('data', data);

//Send the data to just the sender
// socket.emit('data', data);
```

- Step 8:	Client Side **‘On’** Event - What do you need?
```
//Listen for a message named 'data' from the server
socket.on('data', function(obj) {
  console.log(obj);
  drawPos(obj);
});
```
```
//Expects an object with x and y properties
function drawPos(pos) {
  fill(0);
  ellipse(pos.x, pos.y, 10, 10);
}
```