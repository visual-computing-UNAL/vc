let images
let scale_img = 4;

function preload() {
  img = loadImage('/vc/docs/sketches/imaging-hardware/foto-mosaico/images.png');
}

function setup() {
  print(img.height*4)
  createCanvas(img.width*scale_img, img.height*scale_img);
}

function draw() {
  // smaller = createImage(10,10,RGB);
  // smaller.copy(img,0,0,10,10,0,0,10,10);
  //img.loadPixels();
  image(img,0,0,img.width*scale_img, img.height*scale_img)
  //image(smaller,0,0,100,100)
}