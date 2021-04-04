let img;

function preload() {
    img = loadImage('/vc/docs/sketches/team/jpbetancourtma/images/kanizsa-square.png');
}

function setup() {
    createCanvas(300, 300);
    noLoop();
}

function draw() {
    image(img, 0, 0);
}