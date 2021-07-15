let original;

function preload() {
    original = loadImage('/vc/docs/sketches/imaging/gray-scale/image/image-test.jpg');
}

function setup() {
    createCanvas(800, 1200);
    noLoop();
}

function draw() {

    average = createImage(original.width, original.height);
    luminance = createImage(original.width, original.height);
    luma1 = createImage(original.width, original.height);
    luma2 = createImage(original.width, original.height);
    luma3 = createImage(original.width, original.height);

    original.loadPixels();

    image(original, 0, 0);
    textSize(32);
    fill(255, 0, 0);
    text("Original", 10, 40);

    luminance.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            let lumin = (0.2126 * colorArr[0]) + (0.7152 * colorArr[1]) + (0.0722 * colorArr[2]);
            let index = (i + j * original.width) * 4;
            luminance.pixels[index] = lumin;
            luminance.pixels[index + 1] = lumin;
            luminance.pixels[index + 2] = lumin;
            luminance.pixels[index + 3] = 255;
        }
    }
    luminance.updatePixels();
    image(luminance, 400, 0);
    textSize(32);
    fill(255, 0, 0);
    text("Luminance", 410, 40);

    average.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            let averageRGB = (colorArr[0] + colorArr[1] + colorArr[2]) / 3;
            let index = (i + j * original.width) * 4;
            average.pixels[index] = averageRGB;
            average.pixels[index + 1] = averageRGB;
            average.pixels[index + 2] = averageRGB;
            average.pixels[index + 3] = 255;
        }
    }
    average.updatePixels();
    image(average, 0, 400);
    textSize(32);
    fill(255, 0, 0);
    text("Average", 10, 440);

    y1 = 1;
    luma1.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            colorArr.forEach((value, index) => { colorArr[index] = Math.pow(value / 255, y1) * 255 });
            let luma = (0.299 * colorArr[0]) + (0.587 * colorArr[1]) + (0.114 * colorArr[2]);
            let index = (i + j * original.width) * 4;
            luma1.pixels[index] = luma;
            luma1.pixels[index + 1] = luma;
            luma1.pixels[index + 2] = luma;
            luma1.pixels[index + 3] = 255;
        }
    }
    luma1.updatePixels();
    image(luma1, 400, 400);
    textSize(32);
    fill(255, 0, 0);
    text("Luma Y=1", 410, 440);

    y2 = 1 / 4;
    luma2.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            colorArr.forEach((value, index) => { colorArr[index] = Math.pow(value / 255, y2) * 255 });
            let luma = (0.299 * colorArr[0]) + (0.587 * colorArr[1]) + (0.114 * colorArr[2]);
            let index = (i + j * original.width) * 4;
            luma2.pixels[index] = luma;
            luma2.pixels[index + 1] = luma;
            luma2.pixels[index + 2] = luma;
            luma2.pixels[index + 3] = 255;
        }
    }
    luma2.updatePixels();
    image(luma2, 0, 800);
    textSize(32);
    fill(255, 0, 0);
    text("Luma Y=1/4 ", 10, 840);

    y3 = 4;
    luma3.loadPixels();
    for (let i = 0; i < original.width; i++) {
        for (let j = 0; j < original.height; j++) {
            let colorArr = original.get(i, j);
            colorArr.forEach((value, index) => { colorArr[index] = Math.pow(value / 255, y3) * 255 });
            let luma = (0.299 * colorArr[0]) + (0.587 * colorArr[1]) + (0.114 * colorArr[2]);
            let index = (i + j * original.width) * 4;
            luma3.pixels[index] = luma;
            luma3.pixels[index + 1] = luma;
            luma3.pixels[index + 2] = luma;
            luma3.pixels[index + 3] = 255;
        }
    }
    luma3.updatePixels();
    image(luma3, 400, 800);
    textSize(32);
    fill(255, 0, 0);
    text("Luma Y=4  ", 410, 840);
}