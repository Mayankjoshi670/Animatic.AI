let shape1 = [];
let shape2 = [];
let morph = [];
let numPoints = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noStroke();

  // Initialize shape1 (a square)
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let x = cos(angle) * 100 + width / 2;
    let y = sin(angle) * 100 + height / 2;
    shape1.push(createVector(x, y));
  }

  // Initialize shape2 (a circle)
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let x = cos(angle) * 150 + width / 2;
    let y = sin(angle) * 150 + height / 2;
    shape2.push(createVector(x, y));
  }

  // Initialize morph array
  for (let i = 0; i < numPoints; i++) {
    morph.push(createVector());
  }
}

function draw() {
  background(20,20,30);

  // Calculate the morphing
  let amount = sin(frameCount * 0.02) * 0.5 + 0.5; // Oscillate between 0 and 1

  for (let i = 0; i < numPoints; i++) {
    let x = lerp(shape1[i].x, shape2[i].x, amount);
    let y = lerp(shape1[i].y, shape2[i].y, amount);
    morph[i].set(x, y);
  }

  // Draw the shape
  beginShape();
  fill(130,100,230);
  for (let i = 0; i < numPoints; i++) {
    let v = morph[i];
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //re-center shapes
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    shape1[i].x = cos(angle) * 100 + width / 2;
    shape1[i].y = sin(angle) * 100 + height / 2;
    shape2[i].x = cos(angle) * 150 + width / 2;
    shape2[i].y = sin(angle) * 150 + height / 2;
  }
}