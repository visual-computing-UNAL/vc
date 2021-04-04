let img;

function preload() {
    img = loadImage('/vc/docs/sketches/imaging/gray-scale/docs/form1.png');
}

function setup() {
    createCanvas(140, 45);
    noLoop();
}

function draw() {
    image(img, 0, 0);
}