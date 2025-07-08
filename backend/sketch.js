let particleSystem;
let palette;
let bgColor1, bgColor2;
let emissionRate = 2; // Initial number of particles to emit per frame
const MAX_EMISSION_RATE = 20;
const MIN_EMISSION_RATE = 1;



class Particle {
  constructor() {
    this.vector = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
    this.lifespan = 0;
    this.mass = 0;
    this.size = 0;
    this.pColor = null;
    this.noiseOffset = createVector(random(1000), random(1000));
  }

  // Resets a particle from the pool, making it new again.
  // This is the core of object pooling and avoids costly object creation.
  reset(x, y) {
    this.vector.set(x, y);
    this.velocity = p5.Vector.random2D().mult(random(1, 4));
    this.acceleration.set(0, 0);
    this.lifespan = 255; // Start fully alive
    this.mass = random(1, 3);
    this.size = 5 + this.mass * 2;
    this.pColor = color(random(palette));
  }

  // Applies a force vector to the particle's acceleration.
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  // The main update loop for the particle's physics and state.
  update() {
    // Apply Perlin noise for organic, swirling motion
    let noiseX = noise(this.noiseOffset.x + frameCount * 0.01);
    let noiseY = noise(this.noiseOffset.y + frameCount * 0.01);
    let noiseForce = createVector(map(noiseX, 0, 1, -0.2, 0.2), map(noiseY, 0, 1, -0.2, 0.2));
    this.applyForce(noiseForce);

    this.velocity.add(this.acceleration);
    this.vector.add(this.velocity);
    this.acceleration.mult(0); // Clear acceleration each frame
    this.lifespan -= 1.5; // Fade out
    this.velocity.mult(0.98); // Apply friction/drag
  }

  // Renders the particle to the canvas with a glow effect.
  display() {
    // Glow effect using drawingContext
    let glowColor = color(this.pColor);
    glowColor.setAlpha(this.lifespan * 0.5); // Softer alpha for the glow
    drawingContext.shadowColor = glowColor;
    drawingContext.shadowBlur = 15;
    
    // Main particle
    noStroke();
    // The particle's color fades with its lifespan
    fill(red(this.pColor), green(this.pColor), blue(this.pColor), this.lifespan);
    ellipse(this.vector.x, this.vector.y, this.size, this.size);
    
    // Reset shadow for other elements
    drawingContext.shadowBlur = 0;
  }

  // Check if the particle's lifespan is over.
  isDead() {
    return this.lifespan < 0;
  }
}


class ParticleSystem {
  constructor() {
    this.particles = []; // Active particles
    this.pool = [];      // Inactive, reusable particles
    this.emitter = createVector(width / 2, height / 2);
  }

  addParticle() {
    let p;
    if (this.pool.length > 0) {
      p = this.pool.pop(); // Reuse from the pool
    } else {
      p = new Particle(); // Create a new one if pool is empty
    }
    p.reset(this.emitter.x, this.emitter.y);
    this.particles.push(p);
  }
  
  // Creates a burst of particles, used for click/touch events.
  burst(num) {
    for (let i = 0; i < num; i++) {
      this.addParticle();
    }
  }

  run() {
    // Loop backwards to safely remove items while iterating
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();
      if (p.isDead()) {
        this.particles.splice(i, 1); // Remove from active list
        this.pool.push(p);           // Return to the object pool
      }
    }
  }
}


function drawGradientBackground() {
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(bgColor1, bgColor2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('main'); // Attach canvas to the main element
  
  palette = ["#F72585", "#B5179E", "#7209B7", "#560BAD", "#480CA8", "#3A0CA3", "#3F37C9", "#4361EE", "#4895EF", "#4CC9F0"];
  bgColor1 = color(2, 2, 16);
  bgColor2 = color(13, 27, 42); // #0D1B2A
  
  particleSystem = new ParticleSystem();
  noCursor();
}

function draw() {
  drawGradientBackground();

  // The emitter follows the mouse, creating an interactive trail.
  particleSystem.emitter.set(mouseX, mouseY);
  
  // Add new particles continuously based on the emission rate
  for (let i = 0; i < emissionRate; i++) {
    particleSystem.addParticle();
  }
  
  particleSystem.run();
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function handleInteraction() {
  if (particleSystem) {
    particleSystem.emitter.set(mouseX, mouseY);
    particleSystem.burst(50); // Create a satisfying burst on interaction
  }
  return false; // Prevents default browser behavior
}

function mousePressed() {
  handleInteraction();
}

function touchStarted() {
  handleInteraction();
}


function mouseWheel(event) {
  // event.delta is negative for scrolling up, positive for down
  if (event.delta < 0) {
    emissionRate = min(emissionRate + 1, MAX_EMISSION_RATE);
  } else {
    emissionRate = max(emissionRate - 1, MIN_EMISSION_RATE);
  }
  return false; // Prevent page scrolling
}