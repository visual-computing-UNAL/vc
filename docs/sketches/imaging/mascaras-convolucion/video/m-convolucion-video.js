let img;
let img2;

function setup() {
    createCanvas(800, 800);
    img = loadImage('/vc/docs/sketches/imaging/gray-scale/video/image-test.jpg'); // Load the image
}

function draw() {
    // Displays the image at its actual size at point (0,0)
    image(img, 0, 0);
}