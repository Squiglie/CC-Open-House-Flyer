let font;
let pointsArray = [];
let r = 3;
let angle = 3;

let cols, rows;
let size = 10;
let grid = [];
let c = 0;

const textData = [
  { text: "Creative Coding", x: 0.15, y: 0.15, size: 0.1, pointSize: 0.008 },
  { text: "Open House", x: 0.4, y: 0.2, size: 0.08, pointSize: 0.008 },
  { text: "MARCH 20th 6-8 pm", x: 0.05, y: 0.4, size: 0.06, pointSize: 0.005 },
  { text: "Moriarty Arts Humanities Building", x: 0.05, y: 0.45, size: 0.05, pointSize: 0.005 },
  { text: "Music and Sonic Arts", x: 0.15, y: 0.05, size: 0.05, pointSize: 0.005 },
  { text: "Room 223 @ PCC Cascade", x: 0.05, y: 0.5, size: 0.05, pointSize: 0.005 }
];

function preload() {
  font = loadFont("fonts/AUTHENTICSans-Condensed-150.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  cols = floor(width / size);
  rows = floor(height / size);
  grid = Array.from({ length: cols }, () => Array(rows).fill(color(80)));

  pointsArray = textData.map(data => ({
    points: font.textToPoints(
      data.text, data.x * width, data.y * height, data.size * min(width, height), { sampleFactor: 0.4 }
    ),
    pointSize: data.pointSize * min(width, height)
  }));
}

function draw() {
  background(220);

  if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let x = floor(mouseX / size);
    let y = floor(mouseY / size);
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      grid[x][y] = c;
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(grid[i][j], 100, 100);
      stroke(68, 100, 100);
      rect(i * size, j * size, size, size);
    }
  }

  fill(0, 0, 0);
  strokeWeight(0.35);
  stroke(302, 76, 95);
  
  for (let obj of pointsArray) {
    for (let pt of obj.points) {
      ellipse(pt.x, pt.y, obj.pointSize, obj.pointSize);
    }
  }

  c = (c + 1) % 360;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}