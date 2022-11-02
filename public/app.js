console.log("Hello!");

let socket = io();

socket.on("connection", (socket) => {
  console.log("socket conncted");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  socket.on("mouseMovedAll", (data) => {
    drawPosition(data);
  });
}

socket.on("mouseClickAll", (x, y) => {
  console.log("mouse click all");
  console.log("data", x, y);
  woo(x, y);
});

function mouseMoved() {
  fill(0);
  ellipse(mouseX, mouseY, 10, 10);

  let mousePos = { x: mouseX, y: mouseY };
  socket.emit("mouseMoved", mousePos);
}

addEventListener("click", (event) => {});

onclick = (event) => {
  woo(mouseX, mouseY);
  socket.emit("mouseClicked", mouseX, mouseY);
};

function drawPosition(positionObj) {
  fill(0);
  ellipse(positionObj.x, positionObj.y, 10, 10);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

woo = (mouseX, mouseY) => {
  x = mouseX / windowWidth;
  y = mouseY / windowHeight;
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { x: x, y: y },
  });
};
