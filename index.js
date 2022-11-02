//Initialize the express 'app' object
let express = require("express");
let app = express();
let io = require("socket.io");

app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
const { emit } = require("process");
let server = http.createServer(app);

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Socket.io Code
io = new io.Server(server);
io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  //by doing it in here, we can track which socket is message
  socket.on("mouseMoved", (data) => {
    //send message to all clients, including the sender
    io.emit("mouseMovedAll", data);
    //socket.broadcast or something tells everyone but the sender
    // socket.emit to send it back to the original sender
  });

  socket.on("mouseClicked", (x, y) => {
    // send the message to all clients
    console.log("emit a mouse click");
    io.emit("mouseClickAll", x, y);
  });

  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});
