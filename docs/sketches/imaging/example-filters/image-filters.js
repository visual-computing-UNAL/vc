let original;
let grayscale;
let blur;

function setup() {
  createCanvas(1500, 500);
  original = loadImage('/vc/docs/sketches/lenna.png');
  grayscale = loadImage('/vc/docs/sketches/lenna.png');
  blur = loadImage('/vc/docs/sketches/lenna.png');
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  grayscale.filter(GRAY);
  blur.filter(BLUR);
  image(original, 0, 0);
  image(grayscale, 500, 0);
  image(blur, 1000, 0);
}