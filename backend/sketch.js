let character;
let sun;
let clouds = [];
let raindrops = [];
let groundLevel;
let backgroundColorTop, backgroundColorBottom;

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  groundLevel = height * 0.8; // Ground at 80% of the canvas height

  // Define background colors for gradient
  backgroundColorTop = color(50, 50, 80);   // Dark blueish
  backgroundColorBottom = color(100, 80, 50); // Muted orange

  character = new Character();
  sun = new Sun();

  // Initialize clouds
  for (let i = 0; i < 3; i++) {
    clouds.push(new Cloud(random(0, width), random(0, height * 0.2)));
  }
}

function draw() {
  // Draw gradient background
  setGradient(0, 0, width, height, backgroundColorTop, backgroundColorBottom);

  sun.update();
  sun.display();

  // Update and display clouds
  for (let cloud of clouds) {
    cloud.update();
    cloud.display();

    // Rain chance
    if (random(1) < 0.005) {
      cloud.startRain();
    }
  }

  // Update and display raindrops
  for (let i = raindrops.length - 1; i >= 0; i--) {
    raindrops[i].update();
    raindrops[i].display();
    if (raindrops[i].isOffScreen()) {
      raindrops.splice(i, 1);
    }
  }

  character.update();
  character.display();
}

function setGradient(x, y, w, h, colorTop, colorBottom) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(colorTop, colorBottom, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
  noStroke(); // Remove stroke to avoid affecting other shapes
}


class Character {
  constructor() {
    this.x = width * 0.1; // Start position
    this.y = groundLevel;
    this.speed = 1.5;
    this.size = 60;
    this.gravity = 0.5;
    this.velocity = 0;
    this.isJumping = false;
    this.runCycle = 0; // Frame count for running animation
  }

  update() {
    this.x += this.speed;

    // Basic "ground"
    if (this.y < groundLevel) {
      this.velocity += this.gravity;
      this.y += this.velocity;
    } else {
      this.y = groundLevel;
      this.velocity = 0;
      this.isJumping = false;
    }

    // Loop character across screen
    if (this.x > width) {
      this.x = 0;
    }

    this.runCycle = (this.runCycle + 0.2) % 8; // Cycle through 8 frames
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255);
    noStroke();

    // Head
    ellipse(0, -this.size * 0.7, this.size * 0.4, this.size * 0.4);

    // Body
    rectMode(CENTER);
    rect(0, -this.size * 0.3, this.size * 0.3, this.size * 0.6);

    // Legs (crude running animation)
    let legAngle = sin(this.runCycle) * PI / 6; // Angle of leg swing
    stroke(255);
    strokeWeight(3);
    line(-this.size * 0.15, -this.size * 0.1, -this.size * 0.15 + cos(legAngle) * this.size * 0.3, -this.size * 0.1 + sin(legAngle) * this.size * 0.3); // Left leg
    line(this.size * 0.15, -this.size * 0.1, this.size * 0.15 - cos(legAngle) * this.size * 0.3, -this.size * 0.1 + sin(legAngle) * this.size * 0.3); // Right leg

    // Arms (crude animation)
    let armAngle = -sin(this.runCycle) * PI / 8;
    line(-this.size * 0.25, -this.size * 0.5, -this.size * 0.25 + cos(armAngle) * this.size * 0.2, -this.size * 0.5 + sin(armAngle) * this.size * 0.2);
    line(this.size * 0.25, -this.size * 0.5, this.size * 0.25 - cos(armAngle) * this.size * 0.2, -this.size * 0.5 + sin(armAngle) * this.size * 0.2);

    pop();
  }
}


class Sun {
  constructor() {
    this.angle = -PI / 2; // Start at sunrise
    this.radius = min(width, height) * 0.3;
    this.centerY = height * 0.3; // Keep sun relatively low
  }

  update() {
    this.angle += 0.001; // Slow movement
    this.y = this.centerY + sin(this.angle) * this.radius;
    this.x = map(cos(this.angle), -1, 1, -this.radius * 0.8, width + this.radius * 0.8);

    // Update background colors based on sun position
    let sunBrightness = map(this.y, 0, height * 0.5, 1, 0); // As sun rises, brightness increases
    backgroundColorTop = color(50 * sunBrightness, 50 * sunBrightness, 80 * sunBrightness);
    backgroundColorBottom = color(100 * sunBrightness, 80 * sunBrightness, 50 * sunBrightness);
  }

  display() {
    noStroke();
    fill(255, 200, 0); // Yellow sun
    ellipse(this.x, this.y, 60, 60);
  }
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.2;
    this.cloudColor = color(255, 255, 255, 150);
    this.rain = []; // Array to hold raindrops
  }

  update() {
    this.x += this.speed;
    if (this.x > width + 50) {
      this.x = -50;
    }

    // Update existing raindrops
    for (let i = this.rain.length - 1; i >= 0; i--) {
      this.rain[i].update();
      if (this.rain[i].isOffScreen()) {
        this.rain.splice(i, 1); // Remove raindrop if off-screen
      }
    }
  }

  display() {
    noStroke();
    fill(this.cloudColor);
    ellipse(this.x, this.y, 80, 50);
    ellipse(this.x + 30, this.y + 10, 70, 40);
    ellipse(this.x + 60, this.y, 80, 50);

    // Display raindrops
    for (let raindrop of this.rain) {
      raindrop.display();
    }
  }

  startRain() {
    // Create new raindrop at cloud position
    this.rain.push(new Raindrop(this.x + random(0, 60), this.y + 30));
  }
}

class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = random(5, 10);
    this.gravity = 0.2;
  }

  update() {
    this.y += this.speedY;
    this.speedY += this.gravity; // Apply gravity
  }

  display() {
    stroke(150, 150, 255);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + 10);
  }

  isOffScreen() {
    return this.y > height;
  }
}