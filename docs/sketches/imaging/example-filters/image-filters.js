let original;
let grayscale;
let invert;

function preload() {
  original = loadImage('/vc/docs/sketches/lenna.png');
  grayscale = loadImage('/vc/docs/sketches/lenna.png');
  invert = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(500, 1500);
  noLoop();
}

function draw() {
  grayscale.filter(GRAY);
  invert.filter(INVERT);
  image(original, 0, 0);
  image(grayscale, 0, 500);
  image(invert, 0, 1000);
}