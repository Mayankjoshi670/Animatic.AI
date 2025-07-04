```javascript
let character1, character2;
let currentLine = 0;
let font;

let dialogue = [
  "I love pepperoni pizza!",
  "Really? I prefer vegetarian.",
  "Vegetarian? That's so healthy!",
  "Yeah, but it still tastes great!"
];

function preload() {
    font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}


function setup() {
  createCanvas(800, 600);
  textFont(font);
  textSize(20);
  textAlign(CENTER, CENTER);

  character1 = new Character(200, 400, color(252, 231, 125), "Character 1"); // Light Yellow
  character2 = new Character(600, 400, color(144, 238, 144), "Character 2"); // Light Green
}

function draw() {
  background(173, 216, 230); // Light Blue Background

  character1.update();
  character1.display();
  character2.update();
  character2.display();

  // Display Speech Bubble and Dialogue
  if (currentLine < dialogue.length) {
    displaySpeechBubble(width / 2, 150, dialogue[currentLine]);
  }
}

function mousePressed() {
  currentLine++;
  if (currentLine >= dialogue.length) {
    currentLine = 0; // Reset dialogue
  }
}

class Character {
  constructor(x, y, color, name) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.name = name;
    this.blinking = false;
    this.blinkTimer = 0;
    this.eyeOpen = true;
  }

  update() {
    // Blinking Logic
    if (this.blinking) {
      this.blinkTimer++;
      if (this.blinkTimer > 5) {
        this.eyeOpen = true;
        this.blinking = false;
        this.blinkTimer = 0;
      }
    } else {
      if (random(1) < 0.005) { // 0.5% chance to blink
        this.blinking = true;
        this.eyeOpen = false;
      }
    }
  }

  display() {
    // Body
    fill(this.color);
    ellipse(this.x, this.y, 80, 120);

    // Eyes
    fill(255);
    if (this.eyeOpen) {
      ellipse(this.x - 15, this.y - 20, 20, 20);
      ellipse(this.x + 15, this.y - 20, 20, 20);
      fill(0);
      ellipse(this.x - 15, this.y - 20, 5, 5);
      ellipse(this.x + 15, this.y - 20, 5, 5);
    } else {
      // Closed Eyes
      line(this.x - 25, this.y - 20, this.x - 5, this.y - 20);
      line(this.x + 25, this.y - 20, this.x + 5, this.y - 20);
    }
    // Name
    fill(0);
    text(this.name, this.x, this.y + 80);
  }
}

function displaySpeechBubble(x, y, text) {
  push();
  fill(255);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(x, y, 300, 80, 15);

  fill(0);
  noStroke();
  text(text, x, y);
  pop();
}
```