let img;

function setup() {
    createCanvas(800, 800);
    img = loadImage('/vc/docs/sketches/imaging/acii-art/image-test.jpg'); // Load the image
}

function draw() {
    // Displays the image at its actual size at point (0,0)
    image(img, 0, 0);
}