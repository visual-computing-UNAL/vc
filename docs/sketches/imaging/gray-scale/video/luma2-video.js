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
    let y = 1;
    for (let i = 1; i < fingers.width; i++) {
        for (let j = 1; j < fingers.height; j++) {
            let index = 4 * (i + fingers.width * j);
            let colorArr = [fingers.pixels[index], fingers.pixels[index + 1], fingers.pixels[index + 2]];
            colorArr.forEach((value, index) => { colorArr[index] = Math.pow(value / 255, y) * 255 });
            let luma = (0.299 * colorArr[0]) + (0.587 * colorArr[1]) + (0.114 * colorArr[2]);
            pixels[index] = luma;
            pixels[index + 1] = luma;
            pixels[index + 2] = luma;
        }
    }
    updatePixels();
}

function mousePressed() {
    fingers.loop();
}