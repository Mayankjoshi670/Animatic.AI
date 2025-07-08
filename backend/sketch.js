let sun;
let clouds = [];
let rain = [];
let bgColor;

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  sun = new Sun();
  bgColor = color(135, 206, 235); // Light sky blue
  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud(random(width), random(height / 2)));
  }
}

function draw() {
  background(bgColor);
  updateBackground();

  sun.update();
  sun.display();

  for (let cloud of clouds) {
    cloud.update();
    cloud.display();
    if (random(1) < 0.01) { // 1% chance of rain per frame for each cloud
      cloud.startRaining();
    }
    cloud.showRain();
  }
}

function updateBackground() {
  let sunPositionRatio = map(sun.x, 0, width, 0, 1);
  let morningColor = color(255, 248, 220); // Light goldenrod yellow
  let noonColor = color(135, 206, 235);   // Light sky blue
  let eveningColor = color(255, 160, 122); // Light Salmon
  let nightColor = color(40, 40, 80);       // Dark blue-gray

  if (sunPositionRatio < 0.25) {
    // Morning transition
    bgColor = lerpColor(nightColor, morningColor, map(sunPositionRatio, 0, 0.25, 0, 1));
  } else if (sunPositionRatio < 0.5) {
    // Daytime
    bgColor = lerpColor(morningColor, noonColor, map(sunPositionRatio, 0.25, 0.5, 0, 1));
  } else if (sunPositionRatio < 0.75) {
    // Evening
    bgColor = lerpColor(noonColor, eveningColor, map(sunPositionRatio, 0.5, 0.75, 0, 1));
  } else {
    // Night transition
    bgColor = lerpColor(eveningColor, nightColor, map(sunPositionRatio, 0.75, 1, 0, 1));
  }
}


class Sun {
  constructor() {
    this.x = -50;
    this.y = height / 4;
    this.size = 80;
    this.speed = 0.5;
  }

  update() {
    this.x += this.speed;
    if (this.x > width + 50) {
      this.x = -50;
    }
  }

  display() {
    fill(255, 204, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.1, 0.5);
    this.cloudColor = color(255, 255, 255, 200);
    this.rain = [];
    this.isRaining = false;
  }

  update() {
    this.x += this.speed;
    if (this.x > width + 100) {
      this.x = -100;
    }
  }

  display() {
    fill(this.cloudColor);
    noStroke();
    ellipse(this.x, this.y, 80, 60);
    ellipse(this.x + 30, this.y + 10, 70, 50);
    ellipse(this.x + 60, this.y - 10, 60, 40);
  }

  startRaining() {
    this.isRaining = true;
    if (this.rain.length === 0) {
      for (let i = 0; i < 50; i++) {
        this.rain.push(new Raindrop(this.x + random(80), this.y + random(20)));
      }
    }
  }

  showRain() {
    if (this.isRaining) {
      for (let i = this.rain.length - 1; i >= 0; i--) {
        let raindrop = this.rain[i];
        raindrop.update();
        raindrop.display();
        if (raindrop.isOffScreen()) {
          this.rain.splice(i, 1);
          this.rain.push(new Raindrop(this.x + random(80), this.y + random(20)));
        }
      }
    }
  }
}

class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(5, 10);
    this.length = random(10, 20);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    stroke(135, 206, 235, 150);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
  }

  isOffScreen() {
    return this.y > height;
  }
}