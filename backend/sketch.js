let circleVertices = [];
let squareVertices = [];
let triangleVertices = [];
let starVertices = [];
let currentShape = [];
let morphProgress = 0;

function setup() {
  createCanvas(800, 600);
  frameRate(30);

  // Define circle vertices
  for (let i = 0; i < 360; i += 30) {
    let angle = radians(i);
    let x = 200 * cos(angle);
    let y = 200 * sin(angle);
    circleVertices.push(createVector(x, y));
  }

  // Define square vertices
  squareVertices.push(createVector(-150, -150));
  squareVertices.push(createVector(150, -150));
  squareVertices.push(createVector(150, 150));
  squareVertices.push(createVector(-150, 150));

  // Define triangle vertices
  triangleVertices.push(createVector(0, -180));
  triangleVertices.push(createVector(160, 140));
  triangleVertices.push(createVector(-160, 140));

  // Define star vertices
  for (let i = 0; i < 5; i++) {
    let angle = i * TWO_PI / 5 - HALF_PI;
    let outerRadius = 200;
    let innerRadius = 100;
    let x = cos(angle) * outerRadius;
    let y = sin(angle) * outerRadius;
    starVertices.push(createVector(x, y));

    angle += TWO_PI / 10;
    x = cos(angle) * innerRadius;
    y = sin(angle) * innerRadius;
    starVertices.push(createVector(x, y));
  }
  
  currentShape = circleVertices;
}

function draw() {
  background(34);
  translate(width / 2, height / 2);

  let nextShape;
  if (morphProgress < 0.25) {
    nextShape = squareVertices;
  } else if (morphProgress < 0.5) {
    nextShape = triangleVertices;
  } else if (morphProgress < 0.75) {
    nextShape = starVertices;
  } else {
    nextShape = circleVertices;
  }

  let interShape = [];
  let subProgress = map(morphProgress % 0.25, 0, 0.25, 0, 1);

  // Ensure both shapes have the same number of vertices
  let vertexCount = max(currentShape.length, nextShape.length);
  
  for (let i = 0; i < vertexCount; i++) {
    let currentVertex = currentShape[i % currentShape.length];
    let nextVertex = nextShape[i % nextShape.length];
    
    let x = lerp(currentVertex.x, nextVertex.x, subProgress);
    let y = lerp(currentVertex.y, nextVertex.y, subProgress);
    interShape.push(createVector(x, y));
  }
  
  // Draw the shape
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (let v of interShape) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);

  morphProgress += map(mouseX, 0, width, 0.001, 0.02);
  morphProgress = morphProgress % 1;
  
  if (subProgress >= 0.99) {
    currentShape = nextShape;
  }
}

function windowResized() {
  resizeCanvas(800, 600);
}