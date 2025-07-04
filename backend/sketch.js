```javascript
let sun;
let clouds = [];
let raindrops = [];
let raining = false;

function setup() {
  createCanvas(600, 400);
  sun = { x: -50, y: 100, size: 80 };
  for (let i = 0; i < 3; i++) {
    clouds.push({
      x: width + random(50,150),
      y: random(50, 150),
      size: random(50, 100),
      speed: random(0.5, 1.5)
    });
  }
}

function draw() {
  background(135, 206, 235); // Sky blue

  // Sun
  sun.x = lerp(sun.x, 100, 0.01);
  fill(255, 255, 0); // Yellow
  ellipse(sun.x, sun.y, sun.size);

  // Clouds
  clouds.forEach(cloud => {
    cloud.x -= cloud.speed;
    if (cloud.x < -cloud.size) {
      cloud.x = width + cloud.size;
    }
    fill(255); // White
    ellipse(cloud.x, cloud.y, cloud.size);
  });

  // Rain
  if (raining) {
    if (raindrops.length < 200) {
      let cloud = clouds[0]; // Rain from the first cloud
      raindrops.push({
        x: cloud.x,
        y: cloud.y + cloud.size / 2,
        length: random(5, 15),
        speed: random(5, 10)
      });
    }

    for (let i = raindrops.length - 1; i >= 0; i--) {
      let raindrop = raindrops[i];
      raindrop.y += raindrop.speed;
      stroke(173, 216, 230); // Light blue
      line(raindrop.x, raindrop.y, raindrop.x, raindrop.y + raindrop.length);

      if (raindrop.y > height) {
        raindrops.splice(i, 1);
      }
    }
  }
}

function mousePressed() {
  raining = !raining;
}
```