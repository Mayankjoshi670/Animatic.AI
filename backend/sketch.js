let waves = [];
let numWaves = 10;
let waveDetail = 50;
let waveSpeed = 0.01;
let waveAmplitude = 50;
let waveFrequency = 0.02;
let baseColor;
let mouseInfluenceRadius = 100;
let mouseInfluenceStrength = 0.5;

function setup() {
  createCanvas(800, 600);
  baseColor = color(255);
  colorMode(HSB, 360, 100, 100, 1);
  for (let i = 0; i < numWaves; i++) {
    waves.push(new Wave(i * 20, random(360), random(0.005, 0.015)));
  }
}

function draw() {
  background(color(200, 10, 10, 0.05));
  
  for (let wave of waves) {
    wave.update();
    wave.display();
  }

    // Debugging info (optional)
  // fill(255);
  // textSize(12);
  // text(`FPS: ${frameRate().toFixed(1)}`, 10, 20);
}

class Wave {
  constructor(yOffset, hue, speed) {
    this.yOffset = yOffset;
    this.hue = hue;
    this.speed = speed;
    this.segments = [];
    for (let i = 0; i <= waveDetail; i++) {
      this.segments.push(0);
    }
  }

  update() {
    this.hue = (this.hue + this.speed * 2) % 360;

    for (let i = 0; i <= waveDetail; i++) {
      let x = map(i, 0, waveDetail, 0, width);
      let angle = x * waveFrequency + frameCount * this.speed;
      let baseHeight = height / 2 + this.yOffset;
      let waveHeight = sin(angle) * waveAmplitude;

      // Mouse interaction
      let distance = dist(x, baseHeight + waveHeight, mouseX, mouseY);
      if (distance < mouseInfluenceRadius) {
        let influence = map(distance, 0, mouseInfluenceRadius, mouseInfluenceStrength, 0);
        waveHeight += (mouseY - (baseHeight + waveHeight)) * influence;
      }

      this.segments[i] = baseHeight + waveHeight;
    }
  }

  display() {
    noFill();
    strokeWeight(2);
    beginShape();
    for (let i = 0; i <= waveDetail; i++) {
      let x = map(i, 0, waveDetail, 0, width);
      let y = this.segments[i];
      stroke(this.hue, 100, 100, 0.8);
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
    resizeCanvas(800, 600);
  }