let gif;

function preload() {
  gif = loadImage("/vc/docs/sketches/ray-tracing/Flip_Book_Movie_v2.gif");
}

function setup() {
  createCanvas(640, 470);
  background(0);
}

function draw() {
  image(gif, 0, 0);
}
