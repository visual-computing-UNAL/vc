let img;

function preload() {
    img = loadImage('/vc/docs/sketches/imaging/mascaras-convolucion/image/image-test.jpg');
}

function setup() {
    createCanvas(img.width, img.height);
    noLoop();
}

function draw() {
    image(img, 0, 0);
}