let fingers, masked_video, contador;
const mat = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
const mat_size = 3;
function preload() {
    fingers = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
    fingers.hide();
}

function setup() {
    createCanvas(700, 700);
    masked_video = createImage(320, 240);
    frameRate(1);
}

function draw() {
    fingers.loadPixels();
    masked_video.loadPixels();
    for (let i = 0; i < fingers.width; i++) {
        for (let j = 0; j < fingers.height; j++) {
            setPixels(i, j, mat, mat_size, fingers)
        }
    }
    masked_video.updatePixels();
    image(fingers, 0, 0);
    image(masked_video, 0, fingers.height);
}

function setPixels(i, j, mat, mat_size, fingers) {
    let conv = setConvolution(i, j, mat, mat_size, fingers);
    let position = (i + j * fingers.width) * 4;
    masked_video.pixels[position] = red(conv);
    masked_video.pixels[position + 1] = green(conv);
    masked_video.pixels[position + 2] = blue(conv);
    masked_video.pixels[position + 3] = alpha(conv);
}

function mousePressed() {
    fingers.loop(); // al presionar en el lienzo blanco inicia el video
}
function setPosition(height, width, i, j, out_bounds) {
    const heightPos = (height + i - out_bounds);
    const widthPos = (width + j - out_bounds);
    return ((heightPos + img.width * widthPos) * 4);
}
function calculateTotal(position, mat_pos, img) {
    return (img.pixels[position]) * mat_pos;
}

function setPosition(height, width, out_bounds, i, j, img){
    const heightPos = (height + i - out_bounds);
    const widthPos = (width + j - out_bounds);
    return (heightPos + img.width * widthPos) * 4
}

function setConvolution(height, width, mat, mat_size, img) {
    let r = 0.0, g = 0.0, b = 0.0, out_bounds = Math.floor(mat_size / 2);
    for (let i = 0; i < mat_size; i++) {
        for (let j = 0; j < mat_size; j++) {
            let position = constrain(setPosition(height, width, out_bounds, i, j, img), 0, img.pixels.length - 1);
            r += calculateTotal(position, mat[i][j], img);
            g += calculateTotal(position + 1, mat[i][j], img);
            b += calculateTotal(position + 2, mat[i][j], img);
        }
    }
    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);
    return color(r, g, b);
}