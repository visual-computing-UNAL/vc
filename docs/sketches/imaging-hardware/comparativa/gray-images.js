let img
let img2

function preload() {
    img2 = loadImage('/vc/docs/sketches/imaging-hardware/comparativa/shader-fps.png')
    img = loadImage('/vc/docs/sketches/imaging-hardware/comparativa/software-fps.png')
}

function setup() {
    createCanvas(500, 390)
    noLoop()
}

function draw() {
    image(img, 0, 0)
    image(img2, 250, 0)
}