let fingers;

function preload() {
    fingers = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
    fingers.hide();
}

function setup() {
    createCanvas(320, 240);
}

function draw() {
    image(fingers, 0, 0);
    fingers.loadPixels();
    loadPixels();
    for (let i = 1; i < fingers.width; i++) {
        for (let j = 1; j < fingers.height; j++) {
            let index = 4 * (i + fingers.width * j);
            let averageRGB = (fingers.pixels[index] + fingers.pixels[index + 1] + fingers.pixels[index + 2]) / 3;
            pixels[index] = averageRGB;
            pixels[index + 1] = averageRGB;
            pixels[index + 2] = averageRGB;
        }
    }
    updatePixels();
}

function mousePressed() {
    fingers.loop();
}