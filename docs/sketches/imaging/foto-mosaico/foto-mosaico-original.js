let img;
let smaller;

let create_img = false;

function preload(){
    img = loadImage('/vc/docs/sketches/imaging/foto-mosaico/images/panda.jpg'); // Load the image
}

function setup() {
    createCanvas(800, 500);
    noLoop();
}

function draw() {
    let reduce = 1.3;
    let w = img.width/reduce;
    let h = img.height/reduce;

    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);
    image(smaller,0,0);
    noLoop();
}
