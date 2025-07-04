let rotationX = 0;
let rotationY = 0;

function setup() {
  createCanvas(600, 400, WEBGL);
}

function draw() {
  background(34);

  // Enable lights
  ambientLight(50);
  directionalLight(255, 255, 255, 0, 0, 1);

  // Rotate the cube
  rotationX += 0.01;
  rotationY += 0.005;

  rotateX(rotationX);
  rotateY(rotationY);

  // Set cube properties
  normalMaterial(); // Use a material that shows normals for visual clarity
  box(150); // Draw the cube
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}