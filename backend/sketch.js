let sun;
let clouds = [];
let raindrops = [];
let isRaining = false;

function setup() {
  createCanvas(800, 600);
  sun = new Sun();
  for (let i = 0; i < 3; i++) {
    clouds.push(new Cloud(random(width, width * 2), random(50, 200)));
  }
}

function draw() {
  // Sky gradient background
  background(135, 206, 235); // Light blue

  sun.update();
  sun.display();

  clouds.forEach(cloud => {
    cloud.update();
    cloud.display();
    if (isRaining && cloud.isNearMouse(mouseX, mouseY)) {
      cloud.rain(); // Start raining only from the clicked cloud
    }
  });
  
  // Update and display raindrops
  for (let i = raindrops.length - 1; i >= 0; i--) {
    raindrops[i].update();
    raindrops[i].display();
    if (raindrops[i].isOffscreen()) {
      raindrops.splice(i, 1); // Remove raindrops that are offscreen
    }
  }
}

function mousePressed() {
  // Toggle rain state globally (can be modified to target specific clouds)
  isRaining = true;
}

function mouseReleased() {
    isRaining = false;
}


class Sun {
  constructor() {
    this.x = -50;
    this.y = 200;
    this.radius = 50;
    this.color = color(255, 255, 0); // Yellow
  }

  update() {
    // Simple sunrise animation from left to center
    this.x = lerp(this.x, width / 2, 0.005); // Ease towards the center
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}


class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.5, 1.5);
    this.cloudColor = color(255, 255, 255, 200); // Semi-transparent white
    this.raindrops = []; // Raindrops specific to this cloud
  }

  update() {
    this.x -= this.speed;
    if (this.x < -100) {
      this.x = width + 100; // Reset position when offscreen
    }
  }

  display() {
    fill(this.cloudColor);
    noStroke();
    ellipse(this.x, this.y, 80, 60);
    ellipse(this.x + 30, this.y + 10, 70, 50);
    ellipse(this.x - 30, this.y + 10, 60, 40);
  }
  
    isNearMouse(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        return d < 50;
    }

  rain() {
    // Create a new raindrop
      if (frameCount % 5 === 0) {
          this.raindrops.push(new Raindrop(this.x + random(-20, 20), this.y + 30));
      }
      
        for (let i = this.raindrops.length - 1; i >= 0; i--) {
            this.raindrops[i].update();
            this.raindrops[i].display();
            if (this.raindrops[i].isOffscreen()) {
                this.raindrops.splice(i, 1); // Remove raindrops that are offscreen
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
    stroke(0, 0, 255); // Blue
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
  }

  isOffscreen() {
    return this.y > height;
  }
}