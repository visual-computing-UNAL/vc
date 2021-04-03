let original;

function preload() {
    original = loadImage('/vc/docs/sketches/imaging/gray-scale/image/image-test.jpg');
}

function setup() {
    createCanvas(800, 800);
    noLoop();
}

function draw() {

    average = createImage(original.width, original.height);
    luminance = createImage(original.width, original.height);
    luma = createImage(original.width, original.height);

    original.loadPixels();

    image(original, 0, 0);

    average.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            let averageRGB = (colorArr[0] + colorArr[1] + colorArr[2]) / 3;
            let index = (i + j * original.width) * 4;
            average.pixels[index + 0] = averageRGB;
            average.pixels[index + 1] = averageRGB;
            average.pixels[index + 2] = averageRGB;
            average.pixels[index + 3] = 255;
        }
    }
    average.updatePixels();
    image(average, 400, 0);

    luminance.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            let averageRGB = (0.2126*colorArr[0]) + (0.7152*colorArr[1]) + (0.0722*colorArr[2]);
            let index = (i + j * original.width) * 4;
            luminance.pixels[index + 0] = averageRGB;
            luminance.pixels[index + 1] = averageRGB;
            luminance.pixels[index + 2] = averageRGB;
            luminance.pixels[index + 3] = 255;
        }
    }
    luminance.updatePixels();
    image(luminance, 0, 400);

    luma.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            let averageRGB = (0.2126*colorArr[0]) + (0.7152*colorArr[1]) + (0.0722*colorArr[2]);
            let index = (i + j * original.width) * 4;
            luma.pixels[index + 0] = averageRGB;
            luma.pixels[index + 1] = averageRGB;
            luma.pixels[index + 2] = averageRGB;
            luma.pixels[index + 3] = 255;
        }
    }
    luma.updatePixels();
    image(luma, 400, 400);
}