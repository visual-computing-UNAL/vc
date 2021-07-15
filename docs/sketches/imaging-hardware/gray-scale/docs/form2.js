let img;

function preload() {
    img = loadImage('/vc/docs/sketches/imaging/gray-scale/docs/form2.png');
}

function setup() {
    createCanvas(310, 40);
    noLoop();
}

function draw() {
    image(img, 0, 0);
}