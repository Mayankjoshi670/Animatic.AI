let shape1 = [];
let shape2 = [];
let morph = [];
let totalVertices = 50;

function setup() {
  createCanvas(800, 600);
  
  // Initialize shape1 (circle)
  for (let i = 0; i < totalVertices; i++) {
    let angle = map(i, 0, totalVertices, 0, TWO_PI);
    let x = 200 * cos(angle);
    let y = 200 * sin(angle);
    shape1.push(createVector(x, y));
  }

  // Initialize shape2 (star)
  for (let i = 0; i < totalVertices; i++) {
    let angle = map(i, 0, totalVertices, 0, TWO_PI);
    let r = (i % 2 === 0) ? 100 : 200;
    let x = r * cos(angle);
    let y = r * sin(angle);
    shape2.push(createVector(x, y));
  }

  // Initialize morph array
  for (let i = 0; i < totalVertices; i++) {
    morph.push(createVector());
  }
}

function draw() {
  background(34);
  translate(width / 2, height / 2);

  // Calculate the morphing
  let amount = sin(frameCount * 0.02) * 0.5 + 0.5; // Smooth oscillating value between 0 and 1

  for (let i = 0; i < totalVertices; i++) {
    let x = lerp(shape1[i].x, shape2[i].x, amount);
    let y = lerp(shape1[i].y, shape2[i].y, amount);
    morph[i].set(x, y);
  }

  // Draw the shape
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  drawingContext.shadowColor = color(255,255,255,50);
  drawingContext.shadowBlur = 20;
  for (let i = 0; i < totalVertices; i++) {
    vertex(morph[i].x, morph[i].y);
  }
  endShape(CLOSE);

  // Optional: Draw individual vertices for debugging
  /*
  for (let i = 0; i < totalVertices; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(morph[i].x, morph[i].y, 5, 5);
  }
  */
}