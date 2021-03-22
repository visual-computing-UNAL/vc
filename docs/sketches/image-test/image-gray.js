let img; // Declare variable 'img'.

function setup() {
    createCanvas(520, 400);
    img = loadImage('/vc/docs/sketches/lenna.png'); // Load the image
}

function draw() {
   // Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  filter(GRAY);
}