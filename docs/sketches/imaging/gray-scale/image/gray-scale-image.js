let img;
let img2;

function setup() {
    createCanvas(800, 800);
    img = loadImage('/vc/docs/sketches/imaging/gray-scale/image/image-test.jpg'); // Load the image
    img2 = loadImage('/vc/docs/sketches/imaging/gray-scale/image/image-test.jpg'); // Load the image
}

function draw() {
    // Displays the image at its actual size at point (0,0)
    img2.loadPixels();
    for (let i = 0; i < img2.width; i++) {
        for (let j = 0; j < img2.height; j++) {
            let colorArr = img2.get(i, j);
            let average = (colorArr[0] + colorArr[1] + colorArr[2]) / 3;
            let index = (i + j * img2.width) * 4;
            img2.pixels[index + 0] = average;
            img2.pixels[index + 1] = average;
            img2.pixels[index + 2] = average;
            img2.pixels[index + 3] = 255;
        }
    }
    img2.updatePixels();
    image(img, 0, 0);
    image(img2, 400, 0);
}