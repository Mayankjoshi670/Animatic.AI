let character1, character2;
let jokeIndex = 0;
let jokes = [
  {speaker: 1, text: "Why don't scientists trust atoms? Because they make up everything!"},
  {speaker: 2, text: "Parallel lines have so much in common. It’s a shame they’ll never meet."},
  {speaker: 1, text: "Why did the scarecrow win an award? Because he was outstanding in his field!"},
  {speaker: 2, text: "I told my wife she was drawing her eyebrows too high. She seemed surprised."},
];

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  character1 = new Character(200, height - 150, "#3498db", "Alice");
  character2 = new Character(600, height - 150, "#e74c3c", "Bob");
}

function draw() {
  background("#ecf0f1");

  character1.update();
  character2.update();
  character1.display();
  character2.display();

  displayJoke();
}

function mousePressed() {
  nextJoke();
}

function nextJoke() {
  jokeIndex = (jokeIndex + 1) % jokes.length;
  let currentJoke = jokes[jokeIndex];

  if (currentJoke.speaker === 1) {
    character1.speak(currentJoke.text);
    character2.react("listening");
  } else {
    character2.speak(currentJoke.text);
    character1.react("listening");
  }
}

function displayJoke() {
  if (jokes.length > 0 && jokeIndex < jokes.length) {
    let currentJoke = jokes[jokeIndex];
    fill(50);
    textSize(16);
    textAlign(CENTER, CENTER);

    let speaker = currentJoke.speaker === 1 ? character1 : character2;
    let bubbleX = speaker.x;
    let bubbleY = speaker.y - 100;
    let bubbleWidth = textWidth(currentJoke.text) + 40;
    let bubbleHeight = 40;

    // Speech bubble
    fill(255);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
    noStroke();

    fill(50);
    text(currentJoke.text, bubbleX, bubbleY);
  }
}


class Character {
  constructor(x, y, color, name) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.name = name;
    this.state = "idle";
    this.animationTimer = 0;
    this.speech = "";
    this.speechTimer = 0;
  }

  update() {
    if (this.state === "speaking") {
      this.speechTimer++;
      if (this.speechTimer > 120) {
        this.state = "idle";
        this.speech = "";
        this.speechTimer = 0;
      }
    }
    if(this.state === "reacting"){
      this.animationTimer++;
      if(this.animationTimer > 60){
        this.state = "idle";
        this.animationTimer = 0;
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    // Body
    fill(this.color);
    ellipse(0, 0, 60, 80);

    // Head
    fill(255);
    ellipse(0, -50, 50, 50);

    // Eyes
    fill(0);
    if(this.state === "reacting"){
      ellipse(-10, -55, 8, 8);
      ellipse(10, -55, 8, 8);
    }
    else {
      ellipse(-10, -55, 5, 5);
      ellipse(10, -55, 5, 5);
    }

    // Mouth
    if (this.state === "speaking") {
      stroke(0);
      line(-10, -40, 10, -40);
      noStroke();
    } else {
      fill(255, 100);
      arc(0, -40, 20, 10, 0, PI);
    }

    // Feet
    fill(100);
    rectMode(CENTER);
    rect(-15, 40, 20, 10);
    rect(15, 40, 20, 10);

    // Name Tag
    fill(255);
    rectMode(CENTER);
    rect(0, 70, 80, 20, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.name, 0, 70);

    pop();
  }

  speak(text) {
    this.state = "speaking";
    this.speech = text;
    this.speechTimer = 0;
  }

  react(type) {
    this.state = "reacting";
    this.reactionType = type;
    this.animationTimer = 0;
  }
}