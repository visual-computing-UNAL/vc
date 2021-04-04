let img;
let smaller;

let scale = 10;
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
    let w = img.width/scale/reduce;
    let h = img.height/scale/reduce;

    smaller = createImage(w,h,RGB);
    smaller.copy(img,0,0,img.width,img.height,0,0,w,h);

    smaller.loadPixels();
    for(let i=0;i<w;i++){
        for(let j=0;j<h;j++){
            pxcol = smaller.get(i,j);

            fill(pxcol);noStroke();rect(i*scale,j*scale,scale,scale);
        }
    }
    image(smaller,0,0);
    noLoop();
}
