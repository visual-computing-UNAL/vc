let img
let img2

function preload() {
    img =  loadImage('/vc/docs/sketches/imaging-hardware/comparativa/mask_hardware.png')
    img2 = loadImage('/vc/docs/sketches/imaging-hardware/comparativa/fingers_software.png')
    
}

function setup() {
    createCanvas(500, 390)
    noLoop()
}

function draw() {
    image(img2, 0, 0)
    image(img, 250, 0)
    
}