let font;
let pointsArray = []; // Store all text points here
let r = 3;
let angle = 3;

let cols, rows;
let size = 10;
let grid = [];
let c = 0;

const textData = [
  { text: "Creative Coding", x: 15, y: 120, size: 70, pointSize: 8 },
  { text: "Open House", x: 130, y: 185, size: 70, pointSize: 8 },
  { text: "MARCH 20th 6-8 pm", x: 10, y: 500, size: 40, pointSize: 4 },
  { text: "Moriarty Arts Humanities Building", x: 10, y: 540, size: 30, pointSize: 3 },
  { text: "Music and Sonic Arts", x: 118, y: 40, size: 30, pointSize: 3 },
  { text: "Room 223 @ PCC Cascade", x: 10, y: 575, size: 30, pointSize: 3 }
];

function preload() {
  font = loadFont("fonts/AUTHENTICSans-Condensed-150.otf");
}

function setup() {
  createCanvas(480, 600);
  colorMode(HSB);
  angleMode(DEGREES);

  // Generate text points and store them in an array
  for (let i = 0; i < textData.length; i++) {
    pointsArray.push({
      points: font.textToPoints(textData[i].text, textData[i].x, textData[i].y, textData[i].size, { sampleFactor: 0.4 }),
      pointSize: textData[i].pointSize
    });
  }

  // Initialize grid
  cols = width / size;
  rows = height / size;
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = color(255);
    }
  }
}

function draw() {
  background(220);

  // Mouse interaction for grid coloring
  if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let x = floor(mouseX / size);
    let y = floor(mouseY / size);
    grid[x][y] = c;
  }

  // Draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(grid[i][j], 100, 100);
      rect(i * size, j * size, size, size);
    }
  }

  // Draw all text points
  fill(0, 100, 100);
  stroke(120, 100, 100);
  
  for (let obj of pointsArray) {
    for (let pt of obj.points) {
      ellipse(pt.x, pt.y, obj.pointSize, obj.pointSize);
    }
  }

  // Color cycling
  c = (c + 1) % 360;
}
