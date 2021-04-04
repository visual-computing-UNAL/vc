let fingers;

function preload() {
    fingers = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
    fingers.hide();
}

function setup() {
    createCanvas(320, 240);
}

function draw() {
    image(fingers,0,0);
}

function mousePressed() {
    fingers.loop();
}