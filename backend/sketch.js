let grid;
let cols = 10;
let rows = 10;
let cellWidth, cellHeight;
let player1, player2;
let currentPlayer;
let diceRoll;
let diceRolling = false;
let snakes = {};
let ladders = {};
let font;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('game-container');
  cellWidth = width / cols;
  cellHeight = height / rows;

  grid = createGrid();
  snakes = createSnakes();
  ladders = createLadders();

  player1 = new Player(1, color(255, 0, 0)); // Red
  player2 = new Player(2, color(0, 0, 255)); // Blue
  currentPlayer = player1;
  diceRoll = 1;

  setMessage(`Player ${currentPlayer.id}'s turn. Click to roll dice.`);

  textFont(font);
  textSize(20);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240);

  drawGrid();
  drawSnakes();
  drawLadders();
  player1.draw();
  player2.draw();
  drawDice(diceRoll);

  if (diceRolling) {
    diceRoll = floor(random(1, 7));
  }
}

function mousePressed() {
  if (!diceRolling) {
    rollDice();
  }
}

function rollDice() {
  diceRolling = true;
  setMessage("Rolling...");
  setTimeout(() => {
    diceRolling = false;
    diceRoll = floor(random(1, 7));
    movePlayer(currentPlayer, diceRoll);
  }, 1000); // Simulate rolling time
}

function movePlayer(player, spaces) {
  let newPos = player.position + spaces;

  if (newPos > cols * rows) {
    setMessage(`Player ${player.id} rolled ${spaces}, but cannot move past the end.`);
    switchTurn();
    return;
  }

  // Animate the movement
  let moveDelay = 200; // milliseconds between each step
  let currentPos = player.position;
  let stepsTaken = 0;

  function takeStep() {
    if (stepsTaken < spaces) {
      currentPos++;
      player.setPosition(currentPos);
      stepsTaken++;
      setTimeout(takeStep, moveDelay);
    } else {
      // Check for snake or ladder after move is complete
      if (snakes[player.position]) {
        player.setPosition(snakes[player.position]);
        setMessage(`Player ${player.id} landed on a snake!`);
      } else if (ladders[player.position]) {
        player.setPosition(ladders[player.position]);
        setMessage(`Player ${player.id} found a ladder!`);
      }

      // Check for win condition
      if (player.position === cols * rows) {
        setMessage(`Player ${player.id} wins!`);
      } else {
        switchTurn();
      }
    }
  }

  takeStep();
}

function switchTurn() {
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
  setMessage(`Player ${currentPlayer.id}'s turn. Click to roll dice.`);
}

function createGrid() {
  let grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  let count = 1;
  for (let y = rows - 1; y >= 0; y--) {
    if ((rows - 1 - y) % 2 === 0) {
      for (let x = 0; x < cols; x++) {
        grid[x][y] = count++;
      }
    } else {
      for (let x = cols - 1; x >= 0; x--) {
        grid[x][y] = count++;
      }
    }
  }
  return grid;
}

function drawGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cellNumber = grid[x][y];
      let xPos = x * cellWidth;
      let yPos = y * cellHeight;
      fill(255);
      stroke(0);
      rect(xPos, yPos, cellWidth, cellHeight);
      fill(0);
      text(cellNumber, xPos + cellWidth / 2, yPos + cellHeight / 2);
    }
  }
}

function createSnakes() {
  return {
    17: 7,
    54: 34,
    62: 19,
    98: 79
  };
}

function createLadders() {
  return {
    4: 14,
    9: 31,
    20: 38,
    28: 84,
    40: 59,
    51: 67,
    71: 91,
    80: 100
  };
}

function drawSnakes() {
  strokeWeight(3);
  stroke(50, 100, 50); // Dark green
  noFill();
  for (let start in snakes) {
    let end = snakes[start];
    drawConnector(start, end, color(50, 100, 50), 3, 0.7); // Call with a color and stroke weight
  }
  strokeWeight(1);
}

function drawLadders() {
  strokeWeight(3);
  stroke(100, 50, 50); // Dark red
  noFill();
  for (let start in ladders) {
    let end = ladders[start];
    drawConnector(start, end, color(100, 50, 50), 3, -0.7); // Call with a color and stroke weight
  }
  strokeWeight(1);
}

function drawConnector(start, end, col, weight, offsetMultiplier) {
    stroke(col);
    strokeWeight(weight);
    noFill();

    let startCoords = positionToCoordinates(start);
    let endCoords = positionToCoordinates(end);

    let offsetX = cellWidth * offsetMultiplier;
    let offsetY = cellHeight * offsetMultiplier;


    // Adjust control points for a smoother, more pronounced curve.
    let controlX1 = startCoords.x + offsetX; // Control point X for the start
    let controlY1 = startCoords.y + offsetY; // Control point Y for the start
    let controlX2 = endCoords.x + offsetX;   // Control point X for the end
    let controlY2 = endCoords.y + offsetY;   // Control point Y for the end
  
    beginShape();
    vertex(startCoords.x + cellWidth / 2, startCoords.y + cellHeight / 2); // Start at the center of the start cell
    bezierVertex(controlX1, controlY1, controlX2, controlY2, endCoords.x + cellWidth / 2, endCoords.y + cellHeight / 2); // Curve to the center of the end cell
    endShape();
}

function drawDice(roll) {
  let diceSize = min(cellWidth, cellHeight) * 0.8;
  let diceX = width - diceSize - 20;
  let diceY = 20;

  fill(255);
  stroke(0);
  rect(diceX, diceY, diceSize, diceSize, 10); // Rounded corners

  fill(0);
  drawDicePips(roll, diceX, diceY, diceSize);
}

function drawDicePips(roll, diceX, diceY, diceSize) {
  let pipSize = diceSize / 8; // Relative size of pips
  let center = diceSize / 2;

  switch (roll) {
    case 1:
      ellipse(diceX + center, diceY + center, pipSize, pipSize);
      break;
    case 2:
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.75, pipSize, pipSize);
      break;
    case 3:
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + center, diceY + center, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.75, pipSize, pipSize);
      break;
    case 4:
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.75, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.75, pipSize, pipSize);
      break;
    case 5:
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + center, diceY + center, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.75, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.75, pipSize, pipSize);
      break;
    case 6:
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.25, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.25, diceY + center, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + center, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.25, diceY + diceSize * 0.75, pipSize, pipSize);
      ellipse(diceX + diceSize * 0.75, diceY + diceSize * 0.75, pipSize, pipSize);
      break;
  }
}

function positionToCoordinates(position) {
  let x, y;
  let adjustedPosition = position - 1; // Adjust to zero-based index

  y = rows - 1 - floor(adjustedPosition / cols); // Invert y calculation
  if ((rows - 1 - y) % 2 === 0) {
    x = adjustedPosition % cols;
  } else {
    x = cols - 1 - (adjustedPosition % cols);
  }

  return {
    x: x * cellWidth,
    y: y * cellHeight
  };
}

class Player {
  constructor(id, color) {
    this.id = id;
    this.position = 1;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.updateCoordinates();
  }

  setPosition(position) {
    this.position = position;
    this.updateCoordinates();
  }

  updateCoordinates() {
    let coords = positionToCoordinates(this.position);
    this.x = coords.x + cellWidth / 4;
    this.y = coords.y + cellHeight / 4;
  }


  draw() {
    fill(this.color);
    ellipse(this.x + cellWidth / 4, this.y + cellHeight / 4, cellWidth / 2, cellHeight / 2);
  }
}

function setMessage(message) {
    let messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.innerText = message;
    } else {
        console.log("Message div not found!");
    }
}